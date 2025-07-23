import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, Paper, Title, Text
} from '@mantine/core';
import { 
  IconClipboardList, IconHammer, IconLock
} from '@tabler/icons-react';
import IndicatorCards from '../../components/IndicatorCards/IndicatorCards';

const SiteInspection = () => {
  const constructionIndicators = [
    {
      id: 1,
      title: '施工現場',
      primaryValue: '2',
      primaryLabel: '活躍工地',
      secondaryItems: [
        { label: '會勘開始', value: '2025/01/01' },
        { label: '完工預定', value: '2026/12/31' },
        { label: '施工天數', value: '365/d' },
        { label: '總工期', value: '730 d' }
      ],
      bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconBg: '#047857'
    },
    {
      id: 2,
      title: '施工進度',
      primaryValue: '68%',
      primaryLabel: 'actual / plan',
      secondaryItems: [
        { label: '總體比例', value: '68%' },
        { label: '安全比例', value: '95%' }
      ],
      bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      iconBg: '#0284c7'
    },
    {
      id: 3,
      title: '今日工人',
      primaryValue: '24',
      primaryLabel: 'MD (今天總人數)',
      secondaryItems: [
        { label: '總施工人員', value: '24 MD' },
        { label: '專業技工', value: '12 MD' }
      ],
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      iconBg: '#d97706'
    },
    {
      id: 4,
      title: '安全檢查',
      primaryValue: '15/18',
      primaryLabel: 'compl. / total',
      secondaryItems: [
        { label: '完成檢查', value: '15/18 pcs' },
        { label: '待處理項目', value: '3/3 pcs' }
      ],
      bgColor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      iconBg: '#db2777'
    }
  ];

  return (
    <Box p="lg">
      <Title order={3} fw={600} mb="lg">會勘管理</Title>
      <IndicatorCards data={constructionIndicators} />
      <Paper p="lg" ta="center" mih={300}>
        <IconClipboardList size={48} color="#9ca3af" />
        <Title order={4} c="gray.5" mt="md">會勘管理功能開發中</Title>
        <Text c="gray.5">會勘排程、檢查記錄等功能即將推出</Text>
      </Paper>
    </Box>
  );
};

const PreMeeting = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">施工前會議管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconClipboardList size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">施工前會議功能開發中</Title>
      <Text c="gray.5">工具箱會議、安全簡報等功能即將推出</Text>
    </Paper>
  </Box>
);

const ConstructionApplication = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">施工申請管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconHammer size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">施工申請功能開發中</Title>
      <Text c="gray.5">申請審核、進度追蹤等功能即將推出</Text>
    </Paper>
  </Box>
);

const ConstructionRecords = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">施工紀錄管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconClipboardList size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">施工紀錄功能開發中</Title>
      <Text c="gray.5">日報、週報、進度記錄等功能即將推出</Text>
    </Paper>
  </Box>
);

const SafetyInspection = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">施工巡檢管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconLock size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">安全巡檢功能開發中</Title>
      <Text c="gray.5">安全檢查、巡檢記錄等功能即將推出</Text>
    </Paper>
  </Box>
);

const SafetyTracking = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">施工缺失追蹤管理</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconLock size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">缺失追蹤功能開發中</Title>
      <Text c="gray.5">問題追蹤、改善進度等功能即將推出</Text>
    </Paper>
  </Box>
);

const ConstructionManagement = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<SiteInspection />} />
        <Route path="/site-inspection" element={<SiteInspection />} />
        <Route path="/pre-meeting" element={<PreMeeting />} />
        <Route path="/application" element={<ConstructionApplication />} />
        <Route path="/records" element={<ConstructionRecords />} />
        <Route path="/inspection" element={<SafetyInspection />} />
        <Route path="/tracking" element={<SafetyTracking />} />
      </Routes>
    </Box>
  );
};

export default ConstructionManagement;