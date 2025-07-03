import prisma from '../config/prisma';
import { customAlphabet } from 'nanoid';

interface CreateGroupData {
  name: string;
  description?: string;
  creatorId: string;
}

// Define o alfabeto e o tamanho para o nosso código de convite amigável
const generateInviteCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

export const groupService = {
  createGroup: async (data: CreateGroupData) => {
    const { name, description, creatorId } = data;

    if (!name) {
      throw new Error('O nome do grupo é obrigatório.');
    }

    const inviteCode = generateInviteCode();

    const newGroup = await prisma.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          name,
          description,
          creator_id: creatorId,
          invite_code: inviteCode,
        },
      });

      await tx.groupMember.create({
        data: {
          group_id: group.id,
          user_id: creatorId,
        },
      });

      return group;
    });

    return newGroup;
  },

  joinGroup: async (inviteCode: string, userId: string) => {
    const group = await prisma.group.findUnique({
      where: { invite_code: inviteCode },
    });

    if (!group) {
      throw new Error('Grupo não encontrado ou código de convite inválido.');
    }

    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        user_id_group_id: {
          user_id: userId,
          group_id: group.id,
        },
      },
    });

    if (existingMembership) {
      throw new Error('Você já é membro deste grupo.');
    }

    await prisma.groupMember.create({
      data: {
        group_id: group.id,
        user_id: userId,
      },
    });

    return group;
  },

  listGroupsForUser: async (userId: string) => {
    const userGroups = await prisma.groupMember.findMany({
      where: { user_id: userId },
      include: { group: true },
      orderBy: { group: { created_at: 'desc' } },
    });
    return userGroups.map(userGroup => userGroup.group);
  },

  getGroupDetails: async (groupId: string, userId: string) => {
    const membership = await prisma.groupMember.findUnique({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
    });

    if (!membership) {
      throw new Error('Acesso negado. Você não pertence a este grupo.');
    }

    const groupDetails = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: { include: { user: { select: { id: true, username: true } } } },
        expenses: {
          include: {
            payer: { select: { id: true, username: true } },
            participants: { include: { user: { select: { id: true, username: true } } } },
          },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!groupDetails) {
      throw new Error('Grupo não encontrado.');
    }

    return groupDetails;
  },

  getGroupBalance: async (groupId: string, userId: string) => {
    // 1. Autorização: Verifica se o utilizador pertence ao grupo
    const membership = await prisma.groupMember.findUnique({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
    });
    if (!membership) {
      throw new Error('Acesso negado. Você não pertence a este grupo.');
    }

    // 2. Busca o grupo com todas as despesas, pagadores e participantes
    const groupWithExpenses = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        expenses: {
          include: {
            payer: { select: { id: true, username: true } },
            participants: { include: { user: { select: { id: true, username: true } } } },
          },
        },
        members: { include: { user: { select: { id: true, username: true } } } },
      },
    });

    if (!groupWithExpenses) {
      throw new Error('Grupo não encontrado.');
    }

    // 3. Calcula o balanço de cada membro
    const balances = new Map<string, { username: string; balance: number }>();

    // Inicializa o balanço de todos os membros como zero
    groupWithExpenses.members.forEach(member => {
      balances.set(member.user_id, { username: member.user.username, balance: 0 });
    });

    let totalExpenses = 0;
    for (const expense of groupWithExpenses.expenses) {
      totalExpenses += Number(expense.amount);
      const payerId = expense.payer_id;

      // Adiciona o valor pago ao balanço do pagador
      if (balances.has(payerId)) {
        balances.get(payerId)!.balance += Number(expense.amount);
      }

      // Subtrai a quota-parte de cada participante do seu balanço
      for (const participant of expense.participants) {
        const participantId = participant.user_id;
        if (balances.has(participantId)) {
          balances.get(participantId)!.balance -= Number(participant.share_amount);
        }
      }
    }

    // 4. Calcula as transações para acertar as contas
    const debtors = Array.from(balances.values()).filter(b => b.balance < 0).map(d => ({...d, balance: Math.abs(d.balance)}));
    const creditors = Array.from(balances.values()).filter(b => b.balance > 0);
    const settlements: { from: string, to: string, amount: number }[] = [];

    debtors.forEach(debtor => {
      creditors.forEach(creditor => {
        if (debtor.balance === 0 || creditor.balance === 0) return;

        const amountToSettle = Math.min(debtor.balance, creditor.balance);
        
        settlements.push({
          from: debtor.username,
          to: creditor.username,
          amount: amountToSettle,
        });

        debtor.balance -= amountToSettle;
        creditor.balance -= amountToSettle;
      });
    });

    return {
      totalExpenses,
      // Converte o Map para um array de objetos para o JSON
      balances: Array.from(balances.entries()).map(([userId, data]) => ({ userId, ...data })),
      settlements,
    };
  },

};
