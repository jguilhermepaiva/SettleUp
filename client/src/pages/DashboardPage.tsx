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
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// 1. Importe sua imagem local a partir da pasta assets
import friendsImage from '../assets/friends.jpg'; 

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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }}>
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Criar um Novo Grupo
            </Typography>
            <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isCreatingGroup} />
            {groupCreationError && <Alert severity="error" sx={{ mt: 2 }}>{groupCreationError}</Alert>}
            {groupCreationSuccess && <Alert severity="success" sx={{ mt: 2 }}>{groupCreationSuccess}</Alert>}
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '60%' } }}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
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
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            SettleUp
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Olá, {profile?.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{ textTransform: 'none' }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: '600px',
          backgroundImage: `url(${friendsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center',  marginTop:'-10%' }}>
          Bem-vindo ao seu Dashboard!
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, mb: 4, position: 'relative', zIndex: 1, marginTop:'-15%' }}>
        {renderContent()}
      </Container>
    </Box>
  );
};
