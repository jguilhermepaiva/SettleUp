import { Router } from 'express';
import { expenseController } from '../controllers/expenseController';

// mergeParams: true é crucial para que esta rota possa aceder a parâmetros da rota pai (como :groupId)
const router = Router({ mergeParams: true });

// POST /api/groups/:groupId/expenses -> Cria uma nova despesa para um grupo
router.post('/', expenseController.create);

// DELETE /api/groups/:groupId/expenses/:expenseId -> Exclui uma despesa
router.delete('/:expenseId', expenseController.delete);

// PUT /api/groups/:groupId/expenses/:expenseId -> Edita uma despesa
router.put('/:expenseId', expenseController.update);

export default router;