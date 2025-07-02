// /server/src/controllers/groupController.ts

import { Response } from 'express';
import { groupService } from '../services/groupService';

// Importamos nossa interface customizada para requisições autenticadas
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

export const groupController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      // 1. Pega o ID do usuário do token (adicionado pelo authMiddleware)
      const creatorId = req.user?.userId;
      if (!creatorId) {
        res.status(400).json({ message: 'ID do criador não encontrado no token.' });
        return;
      }

      // 2. Pega os dados do corpo da requisição
      const { name, description } = req.body;

      // 3. Chama o serviço para criar o grupo
      const newGroup = await groupService.createGroup({
        name,
        description,
        creatorId,
      });

      // 4. Retorna o grupo recém-criado com um status 201 (Created)
      res.status(201).json(newGroup);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },

  list: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'ID do utilizador não encontrado no token.' });
        return;
      }

      const groups = await groupService.listGroupsForUser(userId);
      res.status(200).json(groups);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },

  getDetails: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'ID do utilizador não encontrado no token.' });
        return;
      }

      // Pega o ID do grupo dos parâmetros da URL (ex: /api/groups/123)
      const { groupId } = req.params;

      const group = await groupService.getGroupDetails(groupId, userId);
      res.status(200).json(group);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for de acesso negado, retorna 403 (Forbidden)
        if (error.message.includes('Acesso negado')) {
          res.status(403).json({ message: error.message });
        } else {
          res.status(404).json({ message: error.message }); // Not Found para outros erros
        }
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },

  join: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'ID do utilizador não encontrado no token.' });
        return;
      }

      // O código de convite vem do corpo da requisição
      const { inviteCode } = req.body;
      if (!inviteCode) {
        res.status(400).json({ message: 'O código de convite é obrigatório.' });
        return;
      }

      const group = await groupService.joinGroup(inviteCode, userId);

      res.status(200).json({ message: `Bem-vindo ao grupo "${group.name}"!`, group });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },
};
