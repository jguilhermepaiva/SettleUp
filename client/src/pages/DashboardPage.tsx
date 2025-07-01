// /client/src/pages/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';
import type { User } from '../context/AuthContext';
import { CreateGroupForm } from '../components/group/CreateGroupForm';
import type { CreateGroupData } from '../services/apiService';
import { GroupList } from '../components/group/GroupList';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  // O Grid foi removido para usarmos uma abordagem mais simples com Box e Flexbox
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(user);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupCreationError, setGroupCreationError] = useState<string | null>(null);
  const [groupCreationSuccess, setGroupCreationSuccess] = useState<string | null>(null);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const profileData = await apiService.getProfile();
        setProfile(profileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCreateGroup = async (data: CreateGroupData) => {
    setIsCreatingGroup(true);
    setGroupCreationError(null);
    setGroupCreationSuccess(null);
    try {
      const newGroup = await apiService.createGroup(data);
      setGroupCreationSuccess(`Grupo "${newGroup.name}" criado com sucesso!`);
      setRefreshTrigger(prev => prev + 1); 
    } catch (err) {
      setGroupCreationError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const renderContent = () => {
    if (isLoadingProfile) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }
    if (error) {
      return <Alert severity="error" sx={{ mt: 4 }}>Erro ao carregar dados: {error}</Alert>;
    }
    return (
      // Correção: Substituímos o <Grid container> por um <Box> com display 'flex'.
      // Isso cria um layout de duas colunas em telas maiores e empilha em telas menores.
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }}>
        
        {/* Coluna da Esquerda: Criar Grupo */}
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Criar um Novo Grupo
            </Typography>
            <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isCreatingGroup} />
            {groupCreationError && <Alert severity="error" sx={{ mt: 2 }}>{groupCreationError}</Alert>}
            {groupCreationSuccess && <Alert severity="success" sx={{ mt: 2 }}>{groupCreationSuccess}</Alert>}
          </Paper>
        </Box>
        
        {/* Coluna da Direita: Meus Grupos */}
        <Box sx={{ width: { xs: '100%', md: '60%' } }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Meus Grupos
            </Typography>
            <GroupList refreshTrigger={refreshTrigger} />
          </Paper>
        </Box>

      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SettleUp
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Olá, {profile?.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<LogoutIcon />}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};
