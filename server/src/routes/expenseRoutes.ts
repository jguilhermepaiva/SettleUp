import { Router } from 'express';
import { expenseController } from '../controllers/expenseController';

// mergeParams: true é crucial para que esta rota possa aceder a parâmetros da rota pai (como :groupId)
const router = Router({ mergeParams: true });

// POST /api/groups/:groupId/expenses -> Cria uma nova despesa para um grupo
router.post('/', expenseController.create);

export default router;