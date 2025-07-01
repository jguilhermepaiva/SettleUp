import React from 'react';
import type { Group } from '../../services/apiService';

interface GroupListItemProps {
  group: Group;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({ group }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
      <h3 style={{ marginTop: 0 }}>{group.name}</h3>
      <p>{group.description || 'Este grupo não tem descrição.'}</p>
      <small>Criado em: {new Date(group.created_at).toLocaleDateString()}</small>
    </div>
  );
};
