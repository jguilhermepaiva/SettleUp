// /client/src/pages/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';
import type { User } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await apiService.getProfile();
        setProfile(profileData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido ao carregar o perfil.");
        }
        // A chamada automática do logout() foi removida daqui.
        // Agora, se houver um erro, a mensagem será exibida na tela.
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez.

  if (isLoading) {
    return <div>Carregando dashboard, {user?.username}...</div>;
  }

  // Se houver um erro, mostramos a mensagem e o botão de logout para o usuário poder sair.
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Erro ao carregar dados</h1>
        <p>{error}</p>
        <button 
          onClick={logout}
          style={{ padding: '10px 15px', cursor: 'pointer' }}
        >
          Sair e tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bem-vindo ao Dashboard, {profile?.username || user?.username}!</h1>
      <p>Seu email registrado é: {profile?.email || user?.email}</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Próximos Passos:</h2>
        <ul>
          <li>Criar um novo grupo</li>
          <li>Ver seus grupos existentes</li>
          <li>Adicionar uma despesa</li>
        </ul>
      </div>

      <button 
        onClick={logout} 
        style={{ marginTop: '40px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Sair (Logout)
      </button>
    </div>
  );
};
