// /server/src/services/userService.ts
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

type CreateUserData = Prisma.UserCreateInput & { confirmPassword?: string };


export const userService = {
  // ... (as funções 'createUser' e 'loginUser' existentes devem permanecer aqui) ...
  createUser: async (data: CreateUserData) => {
    const { email, username, password_hash: password, confirmPassword } = data;
    if (!email || !password || !username || !confirmPassword) {
      throw new Error('Todos os campos são obrigatórios');
    }
    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem');
    }
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      throw new Error('Usuário com este email ou nome de usuário já existe');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password_hash: hashedPassword,
      },
    });
    const { password_hash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  loginUser: async (email, password) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new Error('Email ou senha inválidos');
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  // --- NOVA FUNÇÃO PARA BUSCAR USUÁRIO PELO ID ---
  findUserById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      // Seleciona os campos que queremos retornar (excluindo a senha)
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  },
};
