import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { GroupDetailPage } from './pages/GroupDetailPage';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/AuthLayout';
import { useAuth } from './hooks/useAuth';
import { CssBaseline, ThemeProvider, Box, Button } from '@mui/material';
import { theme } from './theme';
import './App.css';
import friend1 from './assets/friend1.png';

type AuthView = 'login' | 'register';

function AuthRoutes() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const toggleView = () => {
    setCurrentView(currentView === 'register' ? 'login' : 'register');
  };

  return (
    <AuthLayout>
      <Box>
        {currentView === 'register' ? <RegisterPage /> : <LoginPage />}
        
        {/* Botão de navegação atualizado */}
        <Box sx={{ mt: 3, textAlign: 'center', display: 'flex',  alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onClick={toggleView}
            sx={{
              color: 'white',
              textTransform: 'none', // Impede que o texto fique em maiúsculas
              fontWeight: 'normal',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            {currentView === 'login' ? 'Criar sua Conta' : 'Logar na sua conta'}
          </Button>
         
        </Box>

      </Box>
    </AuthLayout>
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
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;