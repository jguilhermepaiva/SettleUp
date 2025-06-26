// /server/src/routes/userRoutes.ts

import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'; 

const router = Router();

// Rota de registro (já existia)
router.post('/register', userController.register);

// Nova rota para login
router.post('/login', userController.login);

// --- Rotas Protegidas (precisam de token) ---
router.get('/me', authMiddleware, userController.getMe);


export default router;
