// /server/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Estende a interface Request do Express para incluir nossa propriedade 'user'
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Correção: Removido o 'return'. Apenas enviamos a resposta.
    res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    return; // Usamos um return vazio para parar a execução da função aqui.
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    req.user = decoded as { userId: string };
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};
