import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Código de Convite"
        variant="outlined"
        placeholder="Ex: A4T-8B2"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isLoading || !inviteCode}
        size="large"
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar no Grupo'}
      </Button>
    </Box>
  );
};