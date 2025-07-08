import React, { useState } from 'react';
import type { CreateGroupData } from '../../services/apiService';
import { Box, Button, CircularProgress, FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DescriptionIcon from '@mui/icons-material/Description';

interface CreateGroupFormProps {
  onSubmit: (data: CreateGroupData) => Promise<void>;
  isLoading: boolean;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, description });
  };

  // Estilo comum para os campos de texto para garantir a consistência
  const inputStyle = {
    backgroundColor: '#ffffff', // Alterado para branco
    color: '#000000', // Alterado para texto preto
    borderRadius: '4px 4px 0 0', // Adiciona bordas arredondadas no topo
    '& .MuiInputBase-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #ffffff inset',
      WebkitTextFillColor: '#000000',
    },
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl variant="filled" fullWidth required>
        <InputLabel htmlFor="create-group-name" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          Nome do Grupo
        </InputLabel>
        <FilledInput
          id="create-group-name"
          type="text"
          placeholder="Ex: Viagem à Praia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disableUnderline
          sx={inputStyle}
          startAdornment={
            <InputAdornment position="start">
              <GroupAddIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="create-group-description" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          Descrição (opcional)
        </InputLabel>
        <FilledInput
          id="create-group-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disableUnderline
          sx={inputStyle}
          multiline
          rows={2}
          startAdornment={
            <InputAdornment position="start">
              <DescriptionIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          }
        />
      </FormControl>
      
      <Button
        type="submit"
        variant="contained"
        color="primary" // Usando a cor primária do nosso tema
        disabled={isLoading || !name}
        size="large"
        sx={{
          mt: 1,
          py: 1.5,
          fontWeight: 'bold',
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Criar Grupo'}
      </Button>
    </Box>
  );
};
