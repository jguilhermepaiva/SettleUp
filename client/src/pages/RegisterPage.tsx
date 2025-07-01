import React, { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { apiService } from '../services/apiService';
import type { RegisterData } from '../services/apiService';
import { Container, Box, Typography, Alert } from '@mui/material';

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newUser = await apiService.registerUser(data);
      setSuccess(`Usuário "${newUser.username}" registrado com sucesso! Por favor, faça o login.`);
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
          Criar conta no SettleUp
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </Box>
      </Box>
    </Container>
  );
};
