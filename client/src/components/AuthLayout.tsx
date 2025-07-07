import React from 'react';
import { Box, Container } from '@mui/material';
import dollarImage from '../assets/dollar.png';

// Este componente cria o fundo escuro e centra o conteúdo
export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #111827 100%)',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={dollarImage}
        alt=""
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 250,
          height: 250,
          opacity: 0.9,
          transform: 'rotate(15deg)',
          pointerEvents: 'none', // Garante que a imagem não interfira com cliques
        }}
      />
      <Box
        component="img"
        src={dollarImage}
        alt=""
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 250,
          height: 250,
          opacity: 0.9,
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }}
      />

      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};
