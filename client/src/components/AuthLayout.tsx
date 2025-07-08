import React from 'react';
import { Box, Container } from '@mui/material';
// Importe as suas imagens
import dollarImage from '../assets/dollar.png';
import friendsImage from '../assets/friend1.png';

// Este componente cria o fundo escuro e o layout de duas colunas
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
        padding: 2,
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
          opacity: { xs: 0.1, md: 0.8 },
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
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
          opacity: { xs: 0.1, md: 0.8 },
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: { xs: 4, md: 8 } 
        }}>
          
          {/* Coluna da Imagem (Vem primeiro no código para aparecer acima no mobile) */}
          <Box
            sx={{
              width: { xs: '80%', sm: '60%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={friendsImage}
              alt="Ilustração de amigos"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: { xs: '250px', md: '400px' }, 
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Coluna do Formulário */}
          <Box sx={{ 
            width: { xs: '100%', sm: '80%', md: '50%' }, 
            maxWidth: '450px' 
          }}>
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
