// /server/src/controllers/expenseController.ts

import { Response } from 'express';
import { expenseService } from '../services/expenseService';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

export const expenseController = {
  create: async (req: AuthenticatedRequest, res: Response) => {

    
    try {
      const payerId = req.user?.userId;
      if (!payerId) {
        res.status(400).json({ message: 'ID do pagador não encontrado no token.' });
        return;
      }

      const { groupId } = req.params;
      const { description, amount, participantIds } = req.body;

      const numericAmount = parseFloat(amount);

      if (isNaN(numericAmount) || numericAmount <= 0) {
        res.status(400).json({ message: 'O valor da despesa deve ser um número positivo.' });
        return;
      }
      
      const newExpense = await expenseService.addExpense({
        groupId,
        payerId,
        description,
        amount: numericAmount,
        participantIds,
      });


      res.status(201).json(newExpense);

    } catch (error) {
      // --- LOG DE DEPURAÇÃO MELHORADO ---
      console.error('[expenseController] Erro capturado no bloco catch:', error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'ID do utilizador não encontrado no token.' });
        return;
      }
      // Pega os IDs dos parâmetros da URL
      const { groupId, expenseId } = req.params;

      await expenseService.deleteExpense(expenseId, groupId, userId);

      // Retorna uma resposta de sucesso sem conteúdo
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(400).json({ message: 'ID do utilizador não encontrado no token.' });
        return;
      }

      const { groupId, expenseId } = req.params;
      const { description, amount, participantIds } = req.body;
      
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        res.status(400).json({ message: 'O valor da despesa deve ser um número positivo.' });
        return;
      }

      const updatedExpense = await expenseService.updateExpense(
        expenseId,
        groupId,
        userId,
        { description, amount: numericAmount, participantIds }
      );

      res.status(200).json(updatedExpense);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
      }
    }
  },
};
