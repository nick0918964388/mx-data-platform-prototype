import React from 'react';
import { Drawer, Title, Paper, Stack, Group, Text, Badge, Grid, ScrollArea, Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { getStatusColor, formatDuration } from './utils';

const ExecutionHistoryDrawer = ({ history, opened, onClose }) => {
  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={`執行詳情 - ${history?.scheduleName}`}
      position="right"
      size="lg"
    >
      {history ? (
        <Stack gap="lg">
          <Paper p="md" withBorder>
            <Title order={5} mb="md">基本資訊</Title>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text fw={500}>執行狀態</Text>
                <Badge color={getStatusColor(history.status)}>{history.status}</Badge>
              </Group>
              <Group justify="space-between">
                <Text fw={500}>開始時間</Text>
                <Text>{new Date(history.startTime).toLocaleString('zh-TW')}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={500}>結束時間</Text>
                <Text>{new Date(history.endTime).toLocaleString('zh-TW')}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={500}>執行時長</Text>
                <Text>{formatDuration(history.duration)}</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={500}>處理記錄</Text>
                <Text>{history.recordsProcessed.toLocaleString()} 筆</Text>
              </Group>
            </Stack>
          </Paper>

          {history.errorMessage && (
            <Alert icon={<IconAlertTriangle size={16} />} color="red">
              {history.errorMessage}
            </Alert>
          )}

          <Paper p="md" withBorder>
            <Title order={5} mb="md">執行日誌</Title>
            <ScrollArea h={300}>
              <Stack gap="xs">
                {history.logs.map((log, index) => (
                  <Group key={index} gap="sm" align="flex-start">
                    <Text size="xs" c="dimmed" style={{ minWidth: 80 }}>
                      {new Date(log.timestamp).toLocaleTimeString('zh-TW')}
                    </Text>
                    <Badge size="xs" color={getLogLevelColor(log.level)}>
                      {log.level.toUpperCase()}
                    </Badge>
                    <Text size="xs" style={{ flex: 1 }}>{log.message}</Text>
                  </Group>
                ))}
              </Stack>
            </ScrollArea>
          </Paper>
        </Stack>
      ) : (
        <Text>沒有選擇執行記錄</Text>
      )}
    </Drawer>
  );
};

export default ExecutionHistoryDrawer; 