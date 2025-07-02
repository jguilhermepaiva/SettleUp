import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { AddExpenseData } from '../services/apiService';
import { Container, Typography, Box, CircularProgress, Alert, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AddExpenseForm } from '../components/expense/AddExpenseForm';
import { ExpenseList } from '../components/expense/ExpenseList';

// Define um tipo para os detalhes do grupo, incluindo os membros
interface GroupDetails {
  id: string;
  name: string;
  description: string | null;
  members: {
    user: {
      id: string;
      username: string;
    };
  }[];
  expenses: {
    id: string;
    description: string;
    amount: number;
    date: string;
    payer: {
      username: string;
    };
    participants: {
      user: {
        username: string;
      };
      share_amount: number;
    }[];
  }[];
}

export const GroupDetailPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [addExpenseError, setAddExpenseError] = useState<string | null>(null);

  const fetchGroupDetails = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getGroupDetails(groupId);
      setGroup(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao buscar detalhes do grupo.');
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchGroupDetails();
  }, [fetchGroupDetails]);

  const handleAddExpense = async (data: AddExpenseData) => {
    if (!groupId) return;
    setIsAddingExpense(true);
    setAddExpenseError(null);
    try {
      await apiService.addExpense(groupId, data);
      // Após adicionar a despesa, recarrega os detalhes do grupo para atualizar a lista
      await fetchGroupDetails();
    } catch (err) {
      setAddExpenseError(err instanceof Error ? err.message : 'Falha ao adicionar despesa.');
    } finally {
      setIsAddingExpense(false);
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  if (!group) {
    return <Container sx={{ mt: 4 }}><Alert severity="info">Grupo não encontrado.</Alert></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2, width: '100%', justifyContent: 'flex-start' }}
      >
        Voltar para Meus Grupos
      </Button>

      <Typography variant="h4" gutterBottom>
        {group.name}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {group.description || 'Este grupo não tem descrição.'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">Adicionar Nova Despesa</Typography>
            <AddExpenseForm
              members={group.members}
              onSubmit={handleAddExpense}
              isLoading={isAddingExpense}
            />
            {addExpenseError && <Alert severity="error" sx={{ mt: 2 }}>{addExpenseError}</Alert>}
          </Paper>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Despesas</Typography>
            <ExpenseList expenses={group.expenses} />
          </Paper>
        </Box>

        {/* Coluna de Membros */}
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Membros</Typography>
            <List>
              {group.members.map((member, index) => (
                <React.Fragment key={member.user.id}>
                  <ListItem>
                    <ListItemText primary={member.user.username} />
                  </ListItem>
                  {index < group.members.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};
