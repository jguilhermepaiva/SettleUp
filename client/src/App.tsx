// /client/src/App.tsx

import React, { useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import { CssBaseline, ThemeProvider, Box, Typography, Link } from '@mui/material';
import { theme } from './theme';
import './App.css';

type AuthView = 'login' | 'register';

function AuthRoutes() {
  const [currentView, setCurrentView] = useState<AuthView>('register');
  const toggleView = () => {
    setCurrentView(currentView === 'register' ? 'login' : 'register');
  };

  return (
    // O Container foi removido daqui e movido para dentro da LoginPage/RegisterPage
    <Box>
      {currentView === 'register' ? <RegisterPage /> : <LoginPage />}
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
        {currentView === 'register' ? 'Já tem uma conta? ' : 'Não tem uma conta? '}
        <Link component="button" variant="body2" onClick={toggleView}>
          {currentView === 'register' ? 'Faça login' : 'Registre-se'}
        </Link>
      </Typography>
    </Box>
  );
}

function App() {
  const { user } = useAuth(); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* O Container foi removido daqui para permitir que o DashboardPage
            controle o seu próprio layout de tela cheia. */}
        {user ? <DashboardPage /> : <AuthRoutes />}
      </div>
    </ThemeProvider>
  );
}

export default App;
