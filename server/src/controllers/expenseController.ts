// /server/src/controllers/expenseController.ts

import { Response } from 'express';
import { expenseService } from '../services/expenseService';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

export const expenseController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.log('[expenseController] Recebida requisição para criar despesa.');
    console.log('[expenseController] Parâmetros da URL (req.params):', req.params);
    console.log('[expenseController] Corpo da Requisição (req.body):', req.body);
    console.log('[expenseController] Utilizador do Token (req.user):', req.user);
    
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

      console.log('[expenseController] Despesa criada com sucesso.');
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
};
