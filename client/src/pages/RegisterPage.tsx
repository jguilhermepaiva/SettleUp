import React, { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { apiService } from '../services/apiService';
import type { RegisterData } from '../services/apiService';
import { Box, Typography, Alert } from '@mui/material';

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
      setSuccess(`Utilizador "${newUser.username}" registado com sucesso! Por favor, faça o login.`);
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
    // A estrutura agora é muito mais simples e alinhada com a LoginPage
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
        Crie sua conta
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </Box>
  );
};
