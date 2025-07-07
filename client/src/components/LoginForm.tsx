import React, { useState } from 'react';
import type { LoginData } from '../services/apiService';
import { Box, TextField, Button, CircularProgress, InputAdornment, FormControl, InputLabel, FilledInput } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  // Estilo comum para os campos de texto para evitar repetição
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
      {/* Refatorado para usar FormControl e FilledInput diretamente, evitando as props depreciadas */}
      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="login-email" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Email</InputLabel>
        <FilledInput
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <InputLabel htmlFor="login-password" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Senha</InputLabel>
        <FilledInput
          id="login-password"
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continuar'}
      </Button>
    </Box>
  );
};
