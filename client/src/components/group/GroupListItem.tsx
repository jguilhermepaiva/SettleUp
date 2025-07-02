import React from 'react';
import type { Group } from '../../services/apiService';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

interface GroupListItemProps {
  group: Group;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({ group }) => {
  return (
    // O Card do MUI dá uma aparência de "cartão" elevado
    <Card sx={{ mb: 2 }} elevation={2}>
      {/* O CardActionArea faz com que toda a área do card seja clicável e tenha um efeito visual */}
      <CardActionArea component={RouterLink} to={`/group/${group.id}`}>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {group.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {group.description || 'Este grupo não tem descrição.'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Criado em: {new Date(group.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};