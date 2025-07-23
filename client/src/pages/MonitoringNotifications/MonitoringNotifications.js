import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, Paper, Title, Text
} from '@mantine/core';
import { 
  IconBell
} from '@tabler/icons-react';
import MonitoringManagement from './MonitoringManagement';

const NotificationManagement = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">通知管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconBell size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">通知管理功能開發中</Title>
      <Text c="gray.5">告警通知、消息推送等功能即將推出</Text>
    </Paper>
  </Box>
);

const MonitoringNotifications = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<MonitoringManagement />} />
        <Route path="/management" element={<MonitoringManagement />} />
        <Route path="/notifications" element={<NotificationManagement />} />
      </Routes>
    </Box>
  );
};

export default MonitoringNotifications;