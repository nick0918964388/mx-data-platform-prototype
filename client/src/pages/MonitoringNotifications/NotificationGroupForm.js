import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { 
  TextInput, 
  Textarea, 
  Button, 
  Group, 
  Box, 
  Switch,
  Stack,
  Divider,
  Text
} from '@mantine/core';
import UserSelector from './UserSelector';
import { mockUsers } from './mockData';

const NotificationGroupForm = ({ group, onSave, onCancel }) => {
  const [selectedUsers, setSelectedUsers] = useState(group?.members || []);

  const form = useForm({
    initialValues: {
      id: group?.id || null,
      name: group?.name || '',
      description: group?.description || '',
      enabled: group?.enabled !== undefined ? group.enabled : true,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : '群組名稱不可為空'),
      description: (value) => (value.trim().length > 0 ? null : '群組描述不可為空'),
    },
  });

  const handleSubmit = (values) => {
    if (selectedUsers.length === 0) {
      form.setFieldError('members', '至少需要選擇一位成員');
      return;
    }

    const groupData = {
      ...values,
      members: selectedUsers,
      createdAt: group?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(groupData);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="群組名稱"
          placeholder="例如：專案管理團隊"
          {...form.getInputProps('name')}
          required
        />

        <Textarea
          label="群組描述"
          placeholder="描述此通知群組的用途與職責"
          minRows={3}
          {...form.getInputProps('description')}
          required
        />

        <Switch
          label="啟用群組"
          description="停用的群組不會收到通知"
          {...form.getInputProps('enabled', { type: 'checkbox' })}
        />

        <Divider my="sm" />

        <UserSelector
          availableUsers={mockUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          title="選擇群組成員"
        />

        {selectedUsers.length === 0 && (
          <Text size="sm" c="red">
            請至少選擇一位群組成員
          </Text>
        )}

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onCancel}>
            取消
          </Button>
          <Button type="submit">
            {group ? '更新群組' : '建立群組'}
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default NotificationGroupForm;