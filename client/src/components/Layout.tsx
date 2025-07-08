import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    // Adicionamos o fundo gradiente aqui
    <Box 
      sx={{ 
        flexGrow: 1, 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #111827 100%)',
      }}
    >
      <AppBar 
        position="static" 
        elevation={1}
        sx={{ backgroundColor: 'rgba(22, 22, 28, 0.8)', backdropFilter: 'blur(10px)' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            SettleUp
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Olá, {user?.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{ textTransform: 'none' }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* O Outlet é um placeholder onde o react-router-dom irá renderizar a página da rota atual */}
      <main>
        <Outlet />
      </main>
    </Box>
  );
};
