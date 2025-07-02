// /client/src/components/expense/ExpenseList.tsx

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

// Definimos os tipos para os dados que esperamos receber
interface Payer {
  username: string;
}
interface Participant {
  user: { username: string };
  share_amount: number;
}
interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  payer: Payer;
  participants: Participant[];
}

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return <Typography>Nenhuma despesa adicionada ainda.</Typography>;
  }

  return (
    <List>
      {expenses.map((expense, index) => (
        <React.Fragment key={expense.id}>
          <ListItem alignItems="flex-start">
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
            />
          </ListItem>
          {index < expenses.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};
