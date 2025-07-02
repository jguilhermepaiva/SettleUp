import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';
import type { User } from '../context/AuthContext';
import { CreateGroupForm } from '../components/group/CreateGroupForm';
import { JoinGroupForm } from '../components/group/JoinGroupForm';
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
import friendsImage from '../assets/friends.jpg'; 

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(user);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupCreationError, setGroupCreationError] = useState<string | null>(null);
  const [groupCreationSuccess, setGroupCreationSuccess] = useState<string | null>(null);
  
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const [joinGroupError, setJoinGroupError] = useState<string | null>(null);
  const [joinGroupSuccess, setJoinGroupSuccess] = useState<string | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchProfile = useCallback(async () => {
    setIsLoadingProfile(true);
    try {
      const profileData = await apiService.getProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  const handleJoinGroup = async (inviteCode: string) => {
    setIsJoiningGroup(true);
    setJoinGroupError(null);
    setJoinGroupSuccess(null);
    try {
      const result = await apiService.joinGroup(inviteCode);
      setJoinGroupSuccess(result.message);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      setJoinGroupError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
    } finally {
      setIsJoiningGroup(false);
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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
        
        {/* Coluna da Esquerda: Ações */}
        <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Criar um Novo Grupo
            </Typography>
            <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isCreatingGroup} />
            {groupCreationError && <Alert severity="error" sx={{ mt: 2 }}>{groupCreationError}</Alert>}
            {groupCreationSuccess && <Alert severity="success" sx={{ mt: 2 }}>{groupCreationSuccess}</Alert>}
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Entrar num Grupo Existente
            </Typography>
            <JoinGroupForm onSubmit={handleJoinGroup} isLoading={isJoiningGroup} />
            {joinGroupError && <Alert severity="error" sx={{ mt: 2 }}>{joinGroupError}</Alert>}
            {joinGroupSuccess && <Alert severity="success" sx={{ mt: 2 }}>{joinGroupSuccess}</Alert>}
          </Paper>
        </Box>
        
        {/* Coluna da Direita: Meus Grupos */}
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
      
      <Box
        sx={{
          height: { xs: 200, md: 300 }, // Altura responsiva
          backgroundImage: `url(${friendsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%', // Ajusta a posição da imagem
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Organize seus grupos
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -10, mb: 4, position: 'relative', zIndex: 1 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};
