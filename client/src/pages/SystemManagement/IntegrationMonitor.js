import React, { useState, useMemo } from 'react';
import { Box, Grid, Paper, Title, Text, Group, ThemeIcon } from '@mantine/core';
import { IconDatabase, IconCheck, IconX, IconClock } from '@tabler/icons-react';
import { mockScheduleTasks, mockExecutionHistory } from '../../components/Scheduling/data';
import TaskList from '../../components/Scheduling/TaskList';
import ExecutionHistoryDrawer from '../../components/Scheduling/ExecutionHistoryDrawer';

const StatCard = ({ title, value, icon, color }) => (
  <Paper withBorder p="md" radius="md">
    <Group justify="space-between">
      <Text size="sm" c="dimmed">{title}</Text>
      <ThemeIcon color={color} variant="light" size={36} radius="md">
        {icon}
      </ThemeIcon>
    </Group>
    <Text size="xl" fw={700} mt="sm">{value}</Text>
  </Paper>
);

const IntegrationMonitor = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const stats = useMemo(() => {
    const totalTasks = mockScheduleTasks.length;
    const successfulTasks = mockScheduleTasks.filter(task => task.lastRunStatus === 'success').length;
    const failedTasks = mockScheduleTasks.filter(task => task.lastRunStatus === 'failed').length;
    
    const latestSync = mockScheduleTasks
      .filter(task => task.lastRunStatus === 'success' && task.lastRunTime)
      .map(task => new Date(task.lastRunTime))
      .sort((a, b) => b - a)[0];

    return {
      totalTasks,
      successfulTasks,
      failedTasks,
      latestSync: latestSync ? latestSync.toLocaleString('zh-TW') : '無成功記錄',
    };
  }, []);

  const handleShowHistory = (scheduleId) => {
    const history = mockExecutionHistory
      .filter(h => h.scheduleId === scheduleId)
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0];
    
    if (history) {
      setSelectedHistory(history);
      setDrawerOpened(true);
    } else {
      // 可以加入提示，告知使用者沒有歷史記錄
      console.log("No history found for this task");
    }
  };
  
  return (
    <Box p="lg">
      <Title order={3} fw={600} mb="lg">系統整合監視</Title>
      
      <Grid mb="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <StatCard 
            title="整合任務總數" 
            value={stats.totalTasks} 
            icon={<IconDatabase size={22} />} 
            color="blue" 
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <StatCard 
            title="執行成功" 
            value={stats.successfulTasks} 
            icon={<IconCheck size={22} />} 
            color="green" 
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <StatCard 
            title="執行失敗" 
            value={stats.failedTasks} 
            icon={<IconX size={22} />} 
            color="red" 
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <StatCard 
            title="最新同步時間" 
            value={stats.latestSync} 
            icon={<IconClock size={22} />} 
            color="orange" 
          />
        </Grid.Col>
      </Grid>
      
      <Paper withBorder p="md" radius="md">
        <Title order={4} mb="md">整合任務列表</Title>
        <TaskList tasks={mockScheduleTasks} onShowHistory={handleShowHistory} />
      </Paper>

      <ExecutionHistoryDrawer 
        history={selectedHistory}
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      />
    </Box>
  );
};

export default IntegrationMonitor; 