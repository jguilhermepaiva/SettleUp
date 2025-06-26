// /client/src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
// A correção está aqui: separamos a importação do valor 'apiService'
// da importação do tipo 'RegisterData'.
import { apiService } from '../services/apiService';
import type { RegisterData } from '../services/apiService';

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // O parâmetro 'data' agora tem o tipo RegisterData, resolvendo o erro do linter.
  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newUser = await apiService.registerUser(data);
      setSuccess(`Usuário "${newUser.username}" registrado com sucesso!`);
      console.log('Usuário registrado:', newUser);
      // Aqui, no futuro, você redirecionaria o usuário para a página de login ou dashboard
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
      <h1>Registrar no SettleUp</h1>
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Erro: {error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
};
