import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Chip, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Definimos os tipos para os dados que esperamos receber
interface Payer {
  username: string;
}
interface Participant {
  user: {
      id: any; username: string 
};
  share_amount: number;
}
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  payer: Payer;
  participants: Participant[];
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (expenseId: string) => void;
  onEdit: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return <Typography>Nenhuma despesa adicionada ainda.</Typography>;
  }

  return (
    <List>
      {expenses.map((expense, index) => (
        <React.Fragment key={expense.id}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <Box>
                <Tooltip title="Editar Despesa">
                  <IconButton edge="end" aria-label="edit" onClick={() => onEdit(expense)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir Despesa">
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(expense.id)} sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <ListItemText
              primary={
                <Typography variant="h6">
                  {expense.description}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    Total: R$ {Number(expense.amount).toFixed(2)} | Pago por: {expense.payer.username}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {expense.participants.map(p => (
                      <Chip key={p.user.username} label={`${p.user.username} (R$ ${Number(p.share_amount).toFixed(2)})`} sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                </React.Fragment>
              }
              slotProps={{ secondary: { component: 'div' } }}
            />
          </ListItem>
          {index < expenses.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};
