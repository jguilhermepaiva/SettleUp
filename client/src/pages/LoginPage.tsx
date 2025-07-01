import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { apiService } from '../services/apiService';
import type { LoginData } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import { Container, Box, Typography, Alert } from '@mui/material';

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Entrar no SettleUp
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </Box>
      </Box>
    </Container>
  );
};
