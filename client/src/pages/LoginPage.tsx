import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { apiService } from '../services/apiService';
import type { LoginData } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography, Alert } from '@mui/material';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiService.loginUser(data);
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold' }}>
        SettleUp
      </Typography>
      <Typography component="p" variant="h6" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
        Faça seu login
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </Box>
  );
};
