import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, Paper, Title, Text
} from '@mantine/core';
import { 
  IconSettings, IconUserCheck, IconBook
} from '@tabler/icons-react';
import IntegrationMonitor from './IntegrationMonitor';

const Integration = () => <IntegrationMonitor />;

const Parameters = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">系統參數管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconSettings size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">參數管理功能開發中</Title>
      <Text c="gray.5">系統配置、環境變數等功能即將推出</Text>
    </Paper>
  </Box>
);

const Permissions = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">權限管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconUserCheck size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">權限管理功能開發中</Title>
      <Text c="gray.5">用戶權限、角色管理等功能即將推出</Text>
    </Paper>
  </Box>
);

const Training = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">教育訓練手冊</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconBook size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">訓練手冊功能開發中</Title>
      <Text c="gray.5">教學文檔、操作指南等功能即將推出</Text>
    </Paper>
  </Box>
);

const SystemManagement = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Integration />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="/parameters" element={<Parameters />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Box>
  );
};

export default SystemManagement;