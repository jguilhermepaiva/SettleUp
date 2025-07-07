import React, { useState } from 'react';
import type { RegisterData } from '../services/apiService';
import { Box, Button, CircularProgress, FormControl, InputLabel, FilledInput, InputAdornment, Alert } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    '& .MuiInputBase-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px rgb(14, 25, 56) inset',
      WebkitTextFillColor: '#fff',
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: { xs: 3, sm: 4 },
        borderRadius: 2,
      }}
    >
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
      
      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="register-username" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Nome de utilizador</InputLabel>
        <FilledInput
          id="register-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="register-email" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Email</InputLabel>
        <FilledInput
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <EmailOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="register-password" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Senha</InputLabel>
        <FilledInput
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="register-confirm-password" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Confirmar Senha</InputLabel>
        <FilledInput
          id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        size="large"
        sx={{
          mt: 2,
          py: 1.5,
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #14b8a6, #6366f1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 0px 15px rgba(20, 184, 166, 0.5)',
          }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'CRIAR CONTA'}
      </Button>
    </Box>
  );
};
