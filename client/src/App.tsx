import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import { CssBaseline, ThemeProvider, Box, Typography, Link } from '@mui/material';
import { theme } from './theme';
import './App.css';
import { Layout } from './components/Layout';
import { GroupDetailPage } from './pages/GroupDetailPage';

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
        <Routes>
          {user ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="group/:groupId" element={<GroupDetailPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          ) : (
            <>
              <Route path="/auth" element={<AuthRoutes />} />
              {/* Redireciona qualquer outra rota para a página de autenticação */}
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
