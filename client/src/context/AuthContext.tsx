// /client/src/context/AuthContext.ts

import { createContext } from 'react';
// Importamos o tipo 'ReactNode' aqui, pois não será mais necessário no outro arquivo.

// Define a estrutura dos dados do usuário e do contexto
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// Cria e exporta o contexto para ser usado pelo Provedor e pelo hook useAuth
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
