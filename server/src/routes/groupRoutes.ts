import { Router } from 'express';
import { groupController } from '../controllers/groupController';
import { authMiddleware } from '../middleware/authMiddleware';
import expenseRoutes from './expenseRoutes'; 

const router = Router();


router.post('/join', authMiddleware, groupController.join);

// Todas as rotas neste ficheiro serão protegidas pelo middleware de autenticação

router.use(authMiddleware);

// POST /api/groups/ -> Cria um novo grupo
router.post('/', groupController.create);

router.delete('/:groupId', groupController.delete);

// GET /api/groups/ -> Lista os grupos do utilizador logado
router.get('/', groupController.list);

// GET /api/groups/:groupId -> Obtém os detalhes de um grupo específico
router.get('/:groupId', groupController.getDetails);

router.use('/:groupId/expenses', expenseRoutes);

router.get('/:groupId/balance', groupController.getBalance);




export default router;
