import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface BalanceSummaryProps {
  groupId: string;
}

interface BalanceData {
  totalExpenses: number;
  balances: {
    username: string;
    balance: number;
  }[];
  settlements: {
    from: string;
    to: string;
    amount: number;
  }[];
}

export const BalanceSummary: React.FC<BalanceSummaryProps> = ({ groupId }) => {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getGroupBalance(groupId);
        setBalanceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao calcular o balanço.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBalance();
  }, [groupId]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!balanceData) return null;

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Resumo Financeiro</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AccountBalanceWalletIcon color="action" />
        <Typography variant="body1">
          <strong>Total de Despesas:</strong> R$ {Number(balanceData.totalExpenses).toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SwapHorizIcon color="action" />
        <Typography variant="subtitle1"><strong>Como acertar as contas:</strong></Typography>
      </Box>
      
      {balanceData.settlements.length > 0 ? (
        <List dense>
          {balanceData.settlements.map((settlement, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${settlement.from} paga R$ ${Number(settlement.amount).toFixed(2)} para ${settlement.to}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">Tudo certo! Ninguém deve nada a ninguém.</Typography>
      )}
    </Paper>
  );
};
