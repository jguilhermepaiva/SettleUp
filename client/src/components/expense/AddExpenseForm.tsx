import React, { useState } from 'react';
import type { AddExpenseData } from '../../services/apiService';
import { Box, TextField, Button, CircularProgress, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

// O formulário precisa saber quem são os membros do grupo para listá-los
interface Member {
  user: {
    id: string;
    username: string;
  };
}

interface AddExpenseFormProps {
  members: Member[];
  onSubmit: (data: AddExpenseData) => Promise<void>;
  isLoading: boolean;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ members, onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const handleParticipantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setParticipantIds(prev => [...prev, value]);
    } else {
      setParticipantIds(prev => prev.filter(id => id !== value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      amount: parseFloat(amount),
      participantIds,
    });
    // Limpa o formulário após o envio
    setDescription('');
    setAmount('');
    setParticipantIds([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Descrição da Despesa"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Valor (ex: 50.00)"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        fullWidth
        inputProps={{ step: "0.01", min: "0.01" }}
      />
      <Box>
        <Typography variant="subtitle1" gutterBottom>Dividir com:</Typography>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
          {members.map(member => (
            <FormControlLabel
              key={member.user.id}
              control={
                <Checkbox
                  value={member.user.id}
                  checked={participantIds.includes(member.user.id)}
                  onChange={handleParticipantChange}
                />
              }
              label={member.user.username}
            />
          ))}
        </FormGroup>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || participantIds.length === 0}
        size="large"
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Adicionar Despesa'}
      </Button>
    </Box>
  );
};
