import React from 'react';
import { Card, Group, Badge, Text, ActionIcon, Tooltip, Stack, ThemeIcon } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import { mockSupportedSystems } from './data';
import { getStatusColor, getStatusIcon, getSystemIcon } from './utils';

const TaskList = ({ tasks, onShowHistory }) => {
  return (
    <Stack>
      {tasks.map((task) => {
        const StatusIcon = getStatusIcon(task.status);
        const systemInfo = mockSupportedSystems.find(s => s.id === task.systemType);
        const SystemIcon = getSystemIcon(systemInfo?.icon);

        return (
          <Card key={task.id} withBorder p="md">
            <Group justify="space-between">
              <Group>
                <ThemeIcon color={systemInfo?.color || 'gray'} variant="light" size="lg">
                  <SystemIcon size={20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text fw={500}>{task.name}</Text>
                  <Text size="sm" c="dimmed">
                    上次執行: {task.lastRunTime ? new Date(task.lastRunTime).toLocaleString('zh-TW') : 'N/A'}
                  </Text>
                </Stack>
              </Group>
              <Group>
                <Badge
                  color={getStatusColor(task.lastRunStatus)}
                  leftSection={<StatusIcon size={12} />}
                >
                  {task.lastRunStatus}
                </Badge>
                <Tooltip label="查看執行歷程">
                  <ActionIcon variant="light" onClick={() => onShowHistory(task.id)}>
                    <IconHistory size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Card>
        );
      })}
    </Stack>
  );
};

export default TaskList; 