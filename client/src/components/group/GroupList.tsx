import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import type { Group } from '../../services/apiService';
import { GroupListItem } from './GroupListItem';

interface GroupListProps {
  // Recebe um 'gatilho' para saber quando deve recarregar a lista (ex: após criar um novo grupo)
  refreshTrigger: number;
  onDelete: (groupId: string) => void;
}

export const GroupList: React.FC<GroupListProps> = ({ refreshTrigger, onDelete }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedGroups = await apiService.getGroups();
        setGroups(fetchedGroups);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao buscar grupos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [refreshTrigger]); // O useEffect será executado novamente sempre que 'refreshTrigger' mudar

  if (isLoading) return <p>A carregar grupos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {groups.length === 0 ? (
        <p>Ainda não pertence a nenhum grupo. Crie um acima!</p>
      ) : (
        groups.map(group => <GroupListItem 
            key={group.id} 
            group={group} 
            onDelete={onDelete} // 2. Passamos a função onDelete para cada item da lista
          />)
      )}
    </div>
  );
};
