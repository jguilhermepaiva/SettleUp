import React, { useState } from 'react';
import type { Group } from '../../services/apiService';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Box, IconButton, Tooltip, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAuth } from '../../hooks/useAuth';

interface GroupListItemProps {
  group: Group;
  onDelete: (groupId: string) => void;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({ group, onDelete }) => {
  const { user } = useAuth(); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Verifica se o utilizador logado é o criador do grupo
  const isCreator = user?.id === group.creator_id;

  const handleCopyToClipboard = (event: React.MouseEvent) => {
    event.preventDefault(); // Impede a navegação ao clicar no botão de cópia
    event.stopPropagation();
    navigator.clipboard.writeText(group.invite_code);
    setOpenSnackbar(true);
  };
  
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm(`Tem a certeza de que deseja excluir o grupo "${group.name}"? Esta ação não pode ser desfeita e apagará todas as despesas associadas.`)) {
      onDelete(group.id);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2 }} elevation={2}>
        <CardActionArea component={RouterLink} to={`/group/${group.id}`}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h3">
                {group.name}
              </Typography>
              {isCreator && (
                <Tooltip title="Excluir Grupo">
                  <IconButton onClick={handleDeleteClick} size="small" color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 1 }}>
              {group.description || 'Este grupo não tem descrição.'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Código de Convite:
              </Typography>
              <Typography fontFamily="monospace" fontWeight="bold">
                {group.invite_code}
              </Typography>
              <Tooltip title="Copiar Código">
                <IconButton onClick={handleCopyToClipboard} size="small">
                  <ContentCopyIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Código copiado para a área de transferência!"
      />
    </>
  );
};