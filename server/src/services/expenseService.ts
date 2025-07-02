// /server/src/services/expenseService.ts

import prisma from '../config/prisma';

interface AddExpenseData {
  groupId: string;
  payerId: string;
  description: string;
  amount: number;
  participantIds: string[];
}

export const expenseService = {
  addExpense: async (data: AddExpenseData) => {
    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.log('[expenseService] Recebidos dados para adicionar despesa:', data);

    const { groupId, payerId, description, amount, participantIds } = data;

    if (!description || !amount || amount <= 0) {
      throw new Error('Descrição e um valor positivo são obrigatórios.');
    }
    if (!participantIds || participantIds.length === 0) {
      throw new Error('A despesa deve ter pelo menos um participante.');
    }

    const shareAmount = amount / participantIds.length;

    console.log('[expenseService] A iniciar transação no Prisma...');
    return prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          description,
          amount,
          group_id: groupId,
          payer_id: payerId,
        },
      });
      console.log('[expenseService] Despesa principal criada na transação, ID:', expense.id);

      await tx.expenseParticipant.createMany({
        data: participantIds.map(userId => ({
          expense_id: expense.id,
          user_id: userId,
          share_amount: shareAmount,
        })),
      });
      console.log('[expenseService] Participantes da despesa criados na transação.');

      return expense;
    });
  },
};
