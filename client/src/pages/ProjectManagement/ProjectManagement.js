import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, Paper, Title, Grid, Card, Text,
  Table, Button, ActionIcon, Badge, Progress, Group, Stack
} from '@mantine/core';
import { 
  IconPlus, IconEdit, IconTrash, IconEye, IconFolder, IconUsers, 
  IconCalendar, IconCurrency, IconShield, IconAlertTriangle 
} from '@tabler/icons-react';
import IndicatorCards from '../../components/IndicatorCards/IndicatorCards';

// Project Management Sub-modules
const ProjectScope = () => {
  const [projects] = useState([
    { id: 'P001', name: '台北捷運延伸工程', scope: '土木建設', budget: '50億', status: '進行中', manager: '王工程師' },
    { id: 'P002', name: '高雄港區開發案', scope: '港口建設', budget: '30億', status: '規劃中', manager: '李工程師' },
    { id: 'P003', name: '桃園機場第三航廈', scope: '航廈建設', budget: '80億', status: '即將完工', manager: '陳工程師' },
  ]);

  const projectIndicators = [
    {
      id: 1,
      title: '專案配置',
      primaryValue: '3',
      primaryLabel: '總專案數',
      secondaryItems: [
        { label: '進行中', value: '1 項' },
        { label: '規劃中', value: '1 項' },
        { label: '即將完工', value: '1 項' },
        { label: '總預算', value: '160 億' }
      ],
      bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconBg: '#047857'
    },
    {
      id: 2,
      title: '專案進度',
      primaryValue: '75%',
      primaryLabel: '平均完成度',
      secondaryItems: [
        { label: '按時進行', value: '2 項' },
        { label: '需要關注', value: '1 項' }
      ],
      bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      iconBg: '#0284c7'
    },
    {
      id: 3,
      title: '人力配置',
      primaryValue: '3',
      primaryLabel: '專案經理',
      secondaryItems: [
        { label: '工程部', value: '2 人' },
        { label: '設計部', value: '1 人' }
      ],
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      iconBg: '#d97706'
    },
    {
      id: 4,
      title: '預算執行',
      primaryValue: '45%',
      primaryLabel: '執行率',
      secondaryItems: [
        { label: '已執行', value: '72 億' },
        { label: '剩餘預算', value: '88 億' }
      ],
      bgColor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      iconBg: '#db2777'
    }
  ];

  const tableData = projects.map((project) => (
    <Table.Tr key={project.id}>
      <Table.Td>{project.id}</Table.Td>
      <Table.Td>{project.name}</Table.Td>
      <Table.Td>{project.scope}</Table.Td>
      <Table.Td>{project.budget}</Table.Td>
      <Table.Td>
        <Badge 
          color={project.status === '進行中' ? 'blue' : project.status === '即將完工' ? 'green' : 'gray'}
          variant="light"
        >
          {project.status}
        </Badge>
      </Table.Td>
      <Table.Td>{project.manager}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon size="sm" color="blue"><IconEye size={16} /></ActionIcon>
          <ActionIcon size="sm" color="orange"><IconEdit size={16} /></ActionIcon>
          <ActionIcon size="sm" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="lg">
      <Group justify="space-between" mb="lg">
        <Title order={3} fw={600}>專案範疇管理</Title>
        <Button leftSection={<IconPlus size={16} />}>新增專案</Button>
      </Group>
      
      <IndicatorCards data={projectIndicators} />
      
      <Paper shadow="sm" p="lg" radius="md">
        <Table>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
              <Table.Th><Text fw={600}>專案編號</Text></Table.Th>
              <Table.Th><Text fw={600}>專案名稱</Text></Table.Th>
              <Table.Th><Text fw={600}>範疇</Text></Table.Th>
              <Table.Th><Text fw={600}>預算</Text></Table.Th>
              <Table.Th><Text fw={600}>狀態</Text></Table.Th>
              <Table.Th><Text fw={600}>專案經理</Text></Table.Th>
              <Table.Th ta="center"><Text fw={600}>操作</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{tableData}</Table.Tbody>
        </Table>
      </Paper>
    </Box>
  );
};

const HumanResources = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">人力資源管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconUsers size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">人力資源管理功能開發中</Title>
      <Text c="gray.5">人員配置、資源利用率等功能即將推出</Text>
    </Paper>
  </Box>
);

const ScheduleManagement = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">時程管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconCalendar size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">時程管理功能開發中</Title>
      <Text c="gray.5">甘特圖、里程碑追蹤等功能即將推出</Text>
    </Paper>
  </Box>
);

const CostManagement = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">成本管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconCurrency size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">成本管理功能開發中</Title>
      <Text c="gray.5">預算追蹤、成本分析等功能即將推出</Text>
    </Paper>
  </Box>
);

const QualityManagement = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">品質管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconShield size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">品質管理功能開發中</Title>
      <Text c="gray.5">品質檢查、標準管理等功能即將推出</Text>
    </Paper>
  </Box>
);

const RiskManagement = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">風險與工單環保</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconAlertTriangle size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">風險管理功能開發中</Title>
      <Text c="gray.5">風險評估、環保管理等功能即將推出</Text>
    </Paper>
  </Box>
);

const ProjectManagement = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<ProjectScope />} />
        <Route path="/scope" element={<ProjectScope />} />
        <Route path="/resources" element={<HumanResources />} />
        <Route path="/schedule" element={<ScheduleManagement />} />
        <Route path="/cost" element={<CostManagement />} />
        <Route path="/quality" element={<QualityManagement />} />
        <Route path="/risk" element={<RiskManagement />} />
      </Routes>
    </Box>
  );
};

export default ProjectManagement;