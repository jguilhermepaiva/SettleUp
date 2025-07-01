import { Router } from 'express';
import { groupController } from '../controllers/groupController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Todas as rotas neste ficheiro serão protegidas pelo middleware de autenticação
router.use(authMiddleware);

// POST /api/groups/ -> Cria um novo grupo
router.post('/', groupController.create);

// GET /api/groups/ -> Lista os grupos do utilizador logado
router.get('/', groupController.list);

export default router;
