import { Request, Response } from 'express';
import { userService } from '../services/userService';

// Estende a interface Request para reconhecer a propriedade 'user' adicionada pelo middleware
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, username, password, confirmPassword } = req.body;
      const newUser = await userService.createUser({
        email,
        username,
        password_hash: password,
        confirmPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  // --- NOVA FUNÇÃO PARA ROTA PROTEGIDA ---
  getMe: async (req: AuthenticatedRequest, res: Response) => {
    try {
      // O ID do usuário foi adicionado à requisição pelo nosso authMiddleware
      const userId = req.user?.userId;

      if (!userId) {
        res.status(400).json({ message: 'ID do usuário não encontrado no token.' });
        return;
      }
      
      const user = await userService.findUserById(userId);

      res.status(200).json(user);

    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },
};
