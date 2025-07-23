import React, { useState } from 'react';
import { Box, Title, Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import MonitoringRuleList from './MonitoringRuleList';
import MonitoringRuleForm from './MonitoringRuleForm';
import { mockRules } from './mockData';
import { v4 as uuidv4 } from 'uuid';

const MonitoringManagement = () => {
  const [rules, setRules] = useState(mockRules);
  const [selectedRule, setSelectedRule] = useState(null);
  const [ruleToDelete, setRuleToDelete] = useState(null);
  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);


  const handleToggleRule = (id, enabled) => {
    setRules(currentRules =>
      currentRules.map(rule => (rule.id === id ? { ...rule, enabled } : rule))
    );
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    openFormModal();
  };

  const handleDeleteRequest = (rule) => {
    setRuleToDelete(rule);
    openDeleteModal();
  };
  
  const confirmDeleteRule = () => {
    if (ruleToDelete) {
      setRules(currentRules => currentRules.filter(rule => rule.id !== ruleToDelete.id));
    }
    closeDeleteModal();
    setRuleToDelete(null);
  };

  const handleAddRule = () => {
    setSelectedRule(null);
    openFormModal();
  };

  const handleSaveRule = (formValues) => {
    if (formValues.id) {
      // Update existing rule
      setRules(currentRules =>
        currentRules.map(rule => (rule.id === formValues.id ? { ...rule, ...formValues } : rule))
      );
    } else {
      // Add new rule
      setRules(currentRules => [
        ...currentRules,
        { ...formValues, id: uuidv4(), enabled: true },
      ]);
    }
    closeFormModal();
  };


  return (
    <Box p="lg">
      <Modal opened={formModalOpened} onClose={closeFormModal} title={selectedRule ? '編輯規則' : '新增規則'} centered>
        <MonitoringRuleForm
            rule={selectedRule}
            onSave={handleSaveRule}
            onCancel={closeFormModal}
        />
      </Modal>

       <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="確認刪除" centered size="sm">
        <Text>您確定要刪除規則 "{ruleToDelete?.name}" 嗎？此操作無法復原。</Text>
        <Group justify="flex-end" mt="lg">
            <Button variant="default" onClick={closeDeleteModal}>
                取消
            </Button>
            <Button color="red" onClick={confirmDeleteRule}>
                確認刪除
            </Button>
        </Group>
      </Modal>

      <Group justify="space-between" mb="lg">
        <Title order={3} fw={600}>監控管理</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={handleAddRule}>
            新增規則
        </Button>
      </Group>

      <MonitoringRuleList
        rules={rules}
        onToggle={handleToggleRule}
        onEdit={handleEditRule}
        onDelete={handleDeleteRequest}
      />
    </Box>
  );
};

export default MonitoringManagement; 