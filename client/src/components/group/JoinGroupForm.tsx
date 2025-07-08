import React, { useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface JoinGroupFormProps {
  onSubmit: (inviteCode: string) => Promise<void>;
  isLoading: boolean;
}

export const JoinGroupForm: React.FC<JoinGroupFormProps> = ({ onSubmit, isLoading }) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inviteCode);
  };

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    '& .MuiInputBase-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #1e293b inset',
      WebkitTextFillColor: '#fff',
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="join-group-code" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Código de Convite
        </InputLabel>
        <FilledInput
          id="join-group-code"
          type="text"
          placeholder="Ex: A4T8B2"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </InputAdornment>
          }
        />
      </FormControl>
      
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isLoading || !inviteCode}
        size="large"
        sx={{
          mt: 1,
          py: 1.5,
          fontWeight: 'bold',
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar no Grupo'}
      </Button>
    </Box>
  );
};
