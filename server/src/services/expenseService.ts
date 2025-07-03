import prisma from '../config/prisma';

interface AddExpenseData {
  groupId: string;
  payerId: string;
  description: string;
  amount: number;
  participantIds: string[];
}

interface UpdateExpenseData {
  description: string;
  amount: number;
  participantIds: string[];
}

export const expenseService = {
  addExpense: async (data: AddExpenseData) => {
    // --- LOG DE DEPURAÇÃO ADICIONADO ---

    const { groupId, payerId, description, amount, participantIds } = data;

    if (!description || !amount || amount <= 0) {
      throw new Error('Descrição e um valor positivo são obrigatórios.');
    }
    if (!participantIds || participantIds.length === 0) {
      throw new Error('A despesa deve ter pelo menos um participante.');
    }

    const shareAmount = amount / participantIds.length;

    return prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          description,
          amount,
          group_id: groupId,
          payer_id: payerId,
        },
      });

      await tx.expenseParticipant.createMany({
        data: participantIds.map(userId => ({
          expense_id: expense.id,
          user_id: userId,
          share_amount: shareAmount,
        })),
      });

      return expense;
    });
  },
  deleteExpense: async (expenseId: string, groupId: string, userId: string) => {
   
    const membership = await prisma.groupMember.findUnique({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
    });
    if (!membership) {
      throw new Error('Acesso negado. Você não pertence a este grupo.');
    }
    // Usamos uma transação para apagar a despesa e as suas participações de forma atómica.
    return prisma.$transaction(async (tx) => {
      // 2. Apaga primeiro os registos de participantes ligados a esta despesa
      await tx.expenseParticipant.deleteMany({
        where: { expense_id: expenseId },
      });

      // 3. Depois, apaga a despesa principal
      const deletedExpense = await tx.expense.delete({
        where: { id: expenseId },
      });

      return deletedExpense;
    });
  },
  updateExpense: async (
    expenseId: string,
    groupId: string,
    userId: string,
    data: UpdateExpenseData
  ) => {
    const { description, amount, participantIds } = data;

    // Validação
    if (!description || !amount || amount <= 0) {
      throw new Error('Descrição e um valor positivo são obrigatórios.');
    }
    if (!participantIds || participantIds.length === 0) {
      throw new Error('A despesa deve ter pelo menos um participante.');
    }

    // 1. Autorização: Verifica se o utilizador é membro do grupo
    const membership = await prisma.groupMember.findUnique({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
    });
    if (!membership) {
      throw new Error('Acesso negado. Você não pertence a este grupo.');
    }

    // Lógica de divisão
    const shareAmount = amount / participantIds.length;

    // Usamos uma transação para garantir que todas as atualizações sejam bem-sucedidas.
    return prisma.$transaction(async (tx) => {
      // 2. Apaga primeiro os participantes antigos desta despesa
      await tx.expenseParticipant.deleteMany({
        where: { expense_id: expenseId },
      });

      // 3. Atualiza a despesa principal com os novos dados
      const updatedExpense = await tx.expense.update({
        where: { id: expenseId },
        data: {
          description,
          amount,
        },
      });

      // 4. Cria os novos registos de participantes
      await tx.expenseParticipant.createMany({
        data: participantIds.map(id => ({
          expense_id: expenseId,
          user_id: id,
          share_amount: shareAmount,
        })),
      });

      return updatedExpense;
    });
  },
};
