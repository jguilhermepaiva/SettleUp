// /client/src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { apiService } from '../services/apiService';
import type { LoginData } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiService.loginUser(data);
      console.log('Login bem-sucedido, token recebido:', result.token);
      
      // Ao chamar login, o AuthContext será atualizado,
      // e o App.tsx irá re-renderizar, mostrando o Dashboard.
      login(result.user, result.token);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Entrar no SettleUp</h1>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      {/* A mensagem de sucesso foi removida. Se houver um erro, ele será mostrado.
          Se houver sucesso, o usuário será redirecionado. */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Erro: {error}</p>}
    </div>
  );
};
