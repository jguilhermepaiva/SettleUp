import React, { useState } from 'react';
import type { Group } from '../../services/apiService';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Box, IconButton, Tooltip, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface GroupListItemProps {
  group: Group;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({ group }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopyToClipboard = (event: React.MouseEvent) => {
    event.preventDefault(); // Impede a navegação ao clicar no botão de cópia
    event.stopPropagation();
    navigator.clipboard.writeText(group.invite_code);
    setOpenSnackbar(true);
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