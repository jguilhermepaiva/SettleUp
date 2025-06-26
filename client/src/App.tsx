// /client/src/App.tsx

import React, { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import './App.css';

// Usamos um tipo para definir as possíveis visualizações de autenticação
type AuthView = 'login' | 'register';

/**
 * Componente que lida com a exibição das telas de Login e Registro.
 */
function AuthRoutes() {
  // Estado para controlar qual formulário está sendo exibido
  const [currentView, setCurrentView] = useState<AuthView>('register');

  // Função para alternar entre as visualizações de login e registro
  const toggleView = () => {
    setCurrentView(currentView === 'register' ? 'login' : 'register');
  };

  return (
    <div>
      {/* Renderiza a página correta com base no estado atual */}
      {currentView === 'register' ? <RegisterPage /> : <LoginPage />}

      <nav style={{ padding: '20px', textAlign: 'center' }}>
        {currentView === 'register' ? (
          <p>
            Já tem uma conta?{' '}
            <button onClick={toggleView} style={{ all: 'unset', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
              Faça login
            </button>
          </p>
        ) : (
          <p>
            Não tem uma conta?{' '}
            <button onClick={toggleView} style={{ all: 'unset', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
              Registre-se
            </button>
          </p>
        )}
      </nav>
    </div>
  );
}


function App() {
  // Pega o estado do usuário do nosso contexto de autenticação global.
  const { user } = useAuth(); 

  return (
    <div className="App">

      {user ? <DashboardPage /> : <AuthRoutes />}
    </div>
  );
}

export default App;
