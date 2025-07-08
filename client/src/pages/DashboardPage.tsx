import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';
import { CreateGroupForm } from '../components/group/CreateGroupForm';
import { JoinGroupForm } from '../components/group/JoinGroupForm';
import type { CreateGroupData } from '../services/apiService';
import { GroupList } from '../components/group/GroupList';
import { 
  Container, 
  Box, 
  Alert,
  Paper,
  Typography
} from '@mui/material';
import friendsImage from '../assets/friends.jpg'; 

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Estados relacionados à criação e entrada em grupos
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupCreationError, setGroupCreationError] = useState<string | null>(null);
  const [groupCreationSuccess, setGroupCreationSuccess] = useState<string | null>(null);
  
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const [joinGroupError, setJoinGroupError] = useState<string | null>(null);
  const [joinGroupSuccess, setJoinGroupSuccess] = useState<string | null>(null);

  // Estados relacionados à lista de grupos
  const [deleteGroupError, setDeleteGroupError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
  
  const handleDeleteGroup = async (groupId: string) => {
    setDeleteGroupError(null);
    try {
      await apiService.deleteGroup(groupId);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      setDeleteGroupError(err instanceof Error ? err.message : 'Falha ao excluir o grupo.');
    }
  };

  return (
    <>
      <Box
        sx={{
          height: { xs: 200, md: 300 },
          backgroundImage: `url(${friendsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Bem-vindo, {user?.username}!
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ mt: -10, mb: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
          
          {/* Coluna da Esquerda: Ações */}
          <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1c2541', color: 'white' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Criar um Novo Grupo
              </Typography>
              <CreateGroupForm onSubmit={handleCreateGroup} isLoading={isCreatingGroup} />
              {groupCreationError && <Alert severity="error" sx={{ mt: 2 }}>{groupCreationError}</Alert>}
              {groupCreationSuccess && <Alert severity="success" sx={{ mt: 2 }}>{groupCreationSuccess}</Alert>}
            </Paper>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1c2541', color: 'white' }}>
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
            <Paper elevation={3} sx={{ p: 3, height: '100%', backgroundColor: '#1c2541', color: 'white' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Meus Grupos
              </Typography>
              {deleteGroupError && <Alert severity="error" sx={{ mb: 2 }}>{deleteGroupError}</Alert>}
              <GroupList refreshTrigger={refreshTrigger} onDelete={handleDeleteGroup} />
            </Paper>
          </Box>

        </Box>
      </Container>
    </>
  );
};
