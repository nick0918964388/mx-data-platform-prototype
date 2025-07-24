import React, { useState } from 'react';
import { Box, Title, Button, Group, Modal, Text, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconUsers } from '@tabler/icons-react';
import NotificationGroupList from './NotificationGroupList';
import NotificationGroupForm from './NotificationGroupForm';
import { mockNotificationGroups } from './mockData';
import { v4 as uuidv4 } from 'uuid';

const NotificationManagement = () => {
  const [groups, setGroups] = useState(mockNotificationGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const handleToggleGroup = (id, enabled) => {
    setGroups(currentGroups =>
      currentGroups.map(group => (group.id === id ? { ...group, enabled } : group))
    );
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    openFormModal();
  };

  const handleDeleteRequest = (group) => {
    setGroupToDelete(group);
    openDeleteModal();
  };
  
  const confirmDeleteGroup = () => {
    if (groupToDelete) {
      setGroups(currentGroups => currentGroups.filter(group => group.id !== groupToDelete.id));
    }
    closeDeleteModal();
    setGroupToDelete(null);
  };

  const handleAddGroup = () => {
    setSelectedGroup(null);
    openFormModal();
  };

  const handleSaveGroup = (formValues) => {
    if (formValues.id) {
      // 更新現有群組
      setGroups(currentGroups =>
        currentGroups.map(group => (group.id === formValues.id ? { ...group, ...formValues } : group))
      );
    } else {
      // 新增群組
      setGroups(currentGroups => [
        ...currentGroups,
        { ...formValues, id: uuidv4() },
      ]);
    }
    closeFormModal();
  };

  const enabledGroupsCount = groups.filter(group => group.enabled).length;
  const totalMembersCount = groups.reduce((sum, group) => sum + group.members.length, 0);

  return (
    <Box p="lg">
      {/* 表單 Modal */}
      <Modal 
        opened={formModalOpened} 
        onClose={closeFormModal} 
        title={selectedGroup ? '編輯通知群組' : '新增通知群組'} 
        centered
        size="lg"
      >
        <NotificationGroupForm
          group={selectedGroup}
          onSave={handleSaveGroup}
          onCancel={closeFormModal}
        />
      </Modal>

      {/* 刪除確認 Modal */}
      <Modal 
        opened={deleteModalOpened} 
        onClose={closeDeleteModal} 
        title="確認刪除" 
        centered 
        size="sm"
      >
        <Text>您確定要刪除通知群組 "{groupToDelete?.name}" 嗎？此操作無法復原。</Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteModal}>
            取消
          </Button>
          <Button color="red" onClick={confirmDeleteGroup}>
            確認刪除
          </Button>
        </Group>
      </Modal>

      {/* 頁面標題與操作按鈕 */}
      <Group justify="space-between" mb="lg">
        <Title order={3} fw={600}>通知管理</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddGroup}>
          新增群組
        </Button>
      </Group>

      {/* 統計資訊 */}
      <Group mb="lg">
        <Paper p="md" withBorder>
          <Group gap="xs">
            <IconUsers size={18} color="blue" />
            <Text size="sm" c="dimmed">啟用群組</Text>
            <Text fw={600} c="blue">{enabledGroupsCount}</Text>
          </Group>
        </Paper>
        <Paper p="md" withBorder>
          <Group gap="xs">
            <IconUsers size={18} color="green" />
            <Text size="sm" c="dimmed">總成員數</Text>
            <Text fw={600} c="green">{totalMembersCount}</Text>
          </Group>
        </Paper>
      </Group>

      {/* 群組列表 */}
      <Paper withBorder>
        <NotificationGroupList
          groups={groups}
          onToggle={handleToggleGroup}
          onEdit={handleEditGroup}
          onDelete={handleDeleteRequest}
        />
      </Paper>
    </Box>
  );
};

export default NotificationManagement;