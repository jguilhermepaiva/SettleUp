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
};
