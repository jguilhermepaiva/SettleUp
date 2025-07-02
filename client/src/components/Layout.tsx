import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa o Outlet
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'start' }}>
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
