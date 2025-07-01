import React, { useState } from 'react';
import type { RegisterData } from '../services/apiService';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }
    setError('');
    onSubmit({ username, email, password, confirmPassword });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
      <TextField
        label="Nome de usuário"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Senha"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        inputProps={{ minLength: 6 }}
      />
      <TextField
        label="Confirmar senha"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        inputProps={{ minLength: 6 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        size="large"
        sx={{ mt: 1 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Registrar'}
      </Button>
    </Box>
  );
};
