import prisma from '../config/prisma';

// Define o tipo de dado para a criação de um grupo
interface CreateGroupData {
  name: string;
  description?: string;
  creatorId: string; // O ID do usuário logado que está criando o grupo
}

export const groupService = {
  createGroup: async (data: CreateGroupData) => {
    const { name, description, creatorId } = data;

    // Validação básica
    if (!name) {
      throw new Error('O nome do grupo é obrigatório.');
    }

    // Usamos uma transação para garantir a consistência dos dados.
    // Se a criação do membro falhar, a criação do grupo também será revertida.
    const newGroup = await prisma.$transaction(async (tx) => {
      // 1. Cria o grupo
      const group = await tx.group.create({
        data: {
          name,
          description,
          creator_id: creatorId,
        },
      });

      // 2. Adiciona o criador como o primeiro membro do grupo
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

  listGroupsForUser: async (userId: string) => {
    // Busca todos os registros em 'group_members' que correspondem ao ID do usuário
    // e inclui os dados completos do grupo relacionado a cada registro.
    const userGroups = await prisma.groupMember.findMany({
      where: {
        user_id: userId,
      },
      include: {
        // Para cada 'groupMember' encontrado, também traz o objeto 'group' correspondente
        group: true,
      },
      orderBy: {
        // Ordena os grupos pela data de criação, do mais novo para o mais antigo
        group: {
          created_at: 'desc',
        },
      },
    });

    // A consulta retorna uma lista de objetos 'groupMember'.
    // Usamos .map() para extrair apenas os dados do grupo de cada objeto.
    return userGroups.map(userGroup => userGroup.group);
  },
  
  getGroupDetails: async (groupId: string, userId: string) => {
    // 1. Verifica se o utilizador é membro do grupo para autorização
    const membership = await prisma.groupMember.findUnique({
      where: {
        user_id_group_id: {
          user_id: userId,
          group_id: groupId,
        },
      },
    });

    if (!membership) {
      throw new Error('Acesso negado. O utilizador não pertence a este grupo.');
    }

    // 2. Se for membro, busca os detalhes completos do grupo
    const groupDetails = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
        expenses: {
          include: {
            payer: { select: { id: true, username: true } },
            participants: {
              include: {
                user: { select: { id: true, username: true } },
              },
            },
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!groupDetails) {
      throw new Error('Grupo não encontrado.');
    }

    return groupDetails;
  },

};

