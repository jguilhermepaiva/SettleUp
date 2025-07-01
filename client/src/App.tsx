import React, { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import { CssBaseline, Container } from '@mui/material'; // Importa o CssBaseline
import './App.css';

type AuthView = 'login' | 'register';

function AuthRoutes() {
  const [currentView, setCurrentView] = useState<AuthView>('register');
  const toggleView = () => {
    setCurrentView(currentView === 'register' ? 'login' : 'register');
  };

  return (
    <div>
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
  const { user } = useAuth(); 

  return (
    <>
      <CssBaseline /> {/* Adiciona o CssBaseline para normalizar estilos */}
      <Container component="main" sx={{ pt: 2, pb: 2 }}>
        {user ? <DashboardPage /> : <AuthRoutes />}
      </Container>
    </>
  );
}

export default App;
