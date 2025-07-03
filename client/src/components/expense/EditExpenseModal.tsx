import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, FormGroup, FormControlLabel, Checkbox, Typography, CircularProgress } from '@mui/material';
import type { UpdateExpenseData } from '../../services/apiService';
import type { Expense } from './ExpenseList';

interface Member {
  user: { id: string; username: string; };
}

interface EditExpenseModalProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  members: Member[];
  onSubmit: (expenseId: string, data: UpdateExpenseData) => Promise<void>;
  isLoading: boolean;
}

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ open, onClose, expense, members, onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  // Efeito para preencher o formulário quando uma despesa é selecionada
  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(String(expense.amount));
      setParticipantIds(expense.participants.map(p => p.user.id));
    }
  }, [expense]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!expense) return;

    onSubmit(expense.id, {
      description,
      amount: parseFloat(amount),
      participantIds,
    });
  }; 

  if (!expense) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Despesa</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Descrição da Despesa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Valor"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              fullWidth
              inputProps={{ step: "0.01", min: "0.01" }}
            />
            <Box>
              <Typography variant="subtitle1" gutterBottom>Dividir com:</Typography>
              <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {members.map(member => (
                  <FormControlLabel
                    key={member.user.id}
                    control={
                      <Checkbox
                        value={member.user.id}
                        checked={participantIds.includes(member.user.id)}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setParticipantIds(prev => checked ? [...prev, value] : prev.filter(id => id !== value));
                        }}
                      />
                    }
                    label={member.user.username}
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Salvar Alterações'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
