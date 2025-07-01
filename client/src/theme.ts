import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light', // Pode ser 'light' ou 'dark'
    primary: {
      main: '#6200ea', // Um roxo vibrante e amigável
    },
    secondary: {
      main: '#03dac6', // Um verde-azulado para contraste
    },
    background: {
      default: '#f4f5f7', // Um cinza bem claro para o fundo da página
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Bordas mais arredondadas para um visual moderno
  },
});
