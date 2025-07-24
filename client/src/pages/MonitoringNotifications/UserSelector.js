import React, { useState } from 'react';
import { 
  Text, 
  Group, 
  Avatar, 
  Stack,
  Badge,
  TextInput,
  Box,
  Paper,
  ScrollArea,
  Button,
  ActionIcon,
  Grid
} from '@mantine/core';
import { IconSearch, IconPlus, IconX } from '@tabler/icons-react';

const UserSelector = ({ 
  availableUsers, 
  selectedUsers, 
  onSelectionChange,
  title = "選擇群組成員"
}) => {
  const [availableSearch, setAvailableSearch] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');

  // 過濾可選擇的使用者
  const filteredAvailableUsers = availableUsers
    .filter(user => !selectedUsers.some(selected => selected.id === user.id))
    .filter(user => 
      availableSearch === '' || 
      user.name.toLowerCase().includes(availableSearch.toLowerCase()) ||
      user.department.toLowerCase().includes(availableSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(availableSearch.toLowerCase())
    );

  // 過濾已選擇的使用者
  const filteredSelectedUsers = selectedUsers
    .filter(user => 
      selectedSearch === '' || 
      user.name.toLowerCase().includes(selectedSearch.toLowerCase()) ||
      user.department.toLowerCase().includes(selectedSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(selectedSearch.toLowerCase())
    );

  const handleAddUser = (user) => {
    onSelectionChange([...selectedUsers, user]);
  };

  const handleRemoveUser = (userId) => {
    onSelectionChange(selectedUsers.filter(user => user.id !== userId));
  };

  const UserCard = ({ user, isSelected, onAction }) => (
    <Paper p="sm" withBorder mb="xs">
      <Group justify="space-between">
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color="blue">
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Text size="md" fw={500}>{user.name}</Text>
            <Group gap="xs" mt={2}>
              <Badge size="sm" variant="light" color="gray">{user.department}</Badge>
              <Badge size="sm" variant="light" color="blue">{user.role}</Badge>
            </Group>
            <Text size="sm" c="dimmed" mt={2}>{user.email}</Text>
          </Box>
        </Group>
        <ActionIcon
          size="sm"
          color={isSelected ? 'red' : 'blue'}
          variant="light"
          onClick={() => onAction(isSelected ? user.id : user)}
        >
          {isSelected ? <IconX size={14} /> : <IconPlus size={14} />}
        </ActionIcon>
      </Group>
    </Paper>
  );

  return (
    <Stack gap="md">
      <Text size="sm" fw={500}>{title}</Text>
      
      <Grid>
        <Grid.Col span={6}>
          <Stack gap="sm">
            <Text size="md" fw={600}>可選擇的使用者</Text>
            <TextInput
              placeholder="搜尋使用者..."
              leftSection={<IconSearch size={16} />}
              value={availableSearch}
              onChange={(e) => setAvailableSearch(e.currentTarget.value)}
            />
            <ScrollArea h={300} style={{ border: '1px solid #e9ecef', borderRadius: 4 }}>
              <Box p="sm">
                {filteredAvailableUsers.length === 0 ? (
                  <Text size="md" c="dimmed" ta="center" py="lg">
                    沒有可選擇的使用者
                  </Text>
                ) : (
                  filteredAvailableUsers.map(user => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isSelected={false}
                      onAction={handleAddUser}
                    />
                  ))
                )}
              </Box>
            </ScrollArea>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack gap="sm">
            <Text size="md" fw={600}>群組成員</Text>
            <TextInput
              placeholder="搜尋成員..."
              leftSection={<IconSearch size={16} />}
              value={selectedSearch}
              onChange={(e) => setSelectedSearch(e.currentTarget.value)}
            />
            <ScrollArea h={300} style={{ border: '1px solid #e9ecef', borderRadius: 4 }}>
              <Box p="sm">
                {filteredSelectedUsers.length === 0 ? (
                  <Text size="md" c="dimmed" ta="center" py="lg">
                    尚未選擇成員
                  </Text>
                ) : (
                  filteredSelectedUsers.map(user => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isSelected={true}
                      onAction={handleRemoveUser}
                    />
                  ))
                )}
              </Box>
            </ScrollArea>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default UserSelector;