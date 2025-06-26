// /client/src/hooks/useAuth.ts

import { useContext } from 'react';
// Importa o AuthContext do arquivo de definição
import { AuthContext } from '../context/AuthContext';

// Hook customizado para facilitar o uso do contexto de autenticação
export const useAuth = () => {
  // Consome o AuthContext
  const context = useContext(AuthContext);

  // Garante que o hook está sendo usado dentro de um AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
