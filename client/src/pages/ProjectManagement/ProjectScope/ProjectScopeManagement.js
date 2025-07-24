import React, { useState } from 'react';
import { 
  Box, Title, Button, Group, Modal, Text, Stack,
  Card, Grid, Badge, Paper, Divider
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconPlus, IconBuilding, IconUsers, IconCalendar, 
  IconCurrency, IconTrendingUp, IconAlertTriangle, IconEye, IconEyeOff 
} from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import ProjectScopeList from './ProjectScopeList';
import ProjectScopeForm from './ProjectScopeForm';
import MilestoneManagement from './MilestoneManagement';
import { mockProjects, mockMilestones } from './mockData';
import IndicatorCards from '../../../components/IndicatorCards/IndicatorCards';

const ProjectScopeManagement = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [milestones, setMilestones] = useState(mockMilestones);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create', 'edit', 'view'
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [budgetVisible, setBudgetVisible] = useState(false);
  
  const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [milestoneModalOpened, { open: openMilestoneModal, close: closeMilestoneModal }] = useDisclosure(false);

  // 計算統計數據
  const calculateStats = () => {
    const totalProjects = projects.length;
    const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const plannedProjects = projects.filter(p => p.status === 'planned').length;
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
    const spentBudget = projects.reduce((sum, p) => sum + p.budget.spent, 0);
    const budgetUtilization = totalBudget > 0 ? Math.round((spentBudget / totalBudget) * 100) : 0;
    
    const totalJobCount = projects.reduce((sum, p) => 
      sum + p.requiredJobTypes.reduce((jobSum, job) => jobSum + job.quantity, 0), 0
    );
    
    const avgProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) 
      : 0;

    return {
      totalProjects,
      inProgressProjects,
      completedProjects,
      plannedProjects,
      totalBudget,
      spentBudget,
      budgetUtilization,
      totalJobCount,
      avgProgress
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}億`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}萬`;
    }
    return amount.toLocaleString();
  };

  // 專案指標卡數據
  const projectIndicators = [
    {
      id: 1,
      title: '專案配置',
      primaryValue: stats.totalProjects.toString(),
      primaryLabel: '總專案數',
      secondaryItems: [
        { label: '進行中', value: `${stats.inProgressProjects} 項` },
        { label: '已完成', value: `${stats.completedProjects} 項` },
        { label: '規劃中', value: `${stats.plannedProjects} 項` },
        { label: '平均進度', value: `${stats.avgProgress}%` }
      ],
      bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconBg: '#047857'
    },
    {
      id: 2,
      title: '預算執行',
      primaryValue: `${stats.budgetUtilization}%`,
      primaryLabel: '預算執行率',
      secondaryItems: [
        { label: '總預算', value: formatCurrency(stats.totalBudget) },
        { label: '已使用', value: formatCurrency(stats.spentBudget) },
        { label: '剩餘預算', value: formatCurrency(stats.totalBudget - stats.spentBudget) }
      ],
      bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      iconBg: '#0284c7'
    },
    {
      id: 3,
      title: '人力配置',
      primaryValue: stats.totalJobCount.toString(),
      primaryLabel: '總需求人數',
      secondaryItems: [
        { label: 'AP5專案', value: `${projects.filter(p => p.plantArea === 'AP5廠區').reduce((sum, p) => sum + p.requiredJobTypes.reduce((jobSum, job) => jobSum + job.quantity, 0), 0)} 人` },
        { label: 'AP6專案', value: `${projects.filter(p => p.plantArea === 'AP6廠區').reduce((sum, p) => sum + p.requiredJobTypes.reduce((jobSum, job) => jobSum + job.quantity, 0), 0)} 人` }
      ],
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      iconBg: '#d97706'
    },
    {
      id: 4,
      title: '里程碑達成',
      primaryValue: milestones.filter(m => m.status === 'completed').length.toString(),
      primaryLabel: '已完成里程碑',
      secondaryItems: [
        { label: '進行中', value: `${milestones.filter(m => m.status === 'in_progress').length} 項` },
        { label: '計劃中', value: `${milestones.filter(m => m.status === 'planned').length} 項` },
        { label: '總里程碑', value: `${milestones.length} 項` }
      ],
      bgColor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      iconBg: '#db2777'
    }
  ];

  const handleAddProject = () => {
    setSelectedProject(null);
    setFormMode('create');
    openFormModal();
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setFormMode('view');
    openFormModal();
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setFormMode('edit');
    openFormModal();
  };

  const handleDeleteRequest = (project) => {
    setProjectToDelete(project);
    openDeleteModal();
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(currentProjects => 
        currentProjects.filter(project => project.id !== projectToDelete.id)
      );
    }
    closeDeleteModal();
    setProjectToDelete(null);
  };

  const handleSaveProject = (formValues) => {
    if (formMode === 'create') {
      // 新增專案
      setProjects(currentProjects => [
        ...currentProjects,
        { ...formValues, id: formValues.id || uuidv4() }
      ]);
    } else if (formMode === 'edit') {
      // 編輯專案
      setProjects(currentProjects =>
        currentProjects.map(project => 
          project.id === formValues.id ? { ...project, ...formValues } : project
        )
      );
    }
    closeFormModal();
  };

  const handleViewMilestones = () => {
    openMilestoneModal();
  };

  return (
    <Box p="lg">
      {/* 標題區域 */}
      <Group justify="space-between" mb="lg">
        <Title order={3} fw={600}>專案範疇管理</Title>
        <Group>
          <Button 
            variant="light" 
            leftSection={<IconCalendar size={16} />}
            onClick={handleViewMilestones}
          >
            里程碑管理
          </Button>
          <Button 
            leftSection={<IconPlus size={16} />}
            onClick={handleAddProject}
          >
            新增專案
          </Button>
        </Group>
      </Group>

      {/* 統計卡片 */}
      <IndicatorCards data={projectIndicators} />

      {/* 快速統計區域 */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" h={150}>
            <Group justify="space-between" h="100%" align="flex-start">
              <Stack gap="sm" style={{ flex: 1 }}>
                <Text size="lg" c="dimmed">專案總覽</Text>
                <Group gap="lg" wrap="nowrap">
                  <Box style={{ textAlign: 'center', minWidth: '60px' }}>
                    <Text fw={700} size="1.5rem" c="blue" lh={1.1}>
                      {stats.inProgressProjects}
                    </Text>
                    <Text size="xs" c="dimmed">進行中專案</Text>
                  </Box>
                  <Box style={{ textAlign: 'center', minWidth: '60px' }}>
                    <Text fw={700} size="1.5rem" c="green" lh={1.1}>
                      {stats.completedProjects}
                    </Text>
                    <Text size="xs" c="dimmed">已完成專案</Text>
                  </Box>
                  <Box style={{ textAlign: 'center', minWidth: '60px' }}>
                    <Text fw={700} size="1.5rem" c="orange" lh={1.1}>
                      {stats.plannedProjects}
                    </Text>
                    <Text size="xs" c="dimmed">規劃中專案</Text>
                  </Box>
                </Group>
              </Stack>
              <IconBuilding size={40} color="#e9ecef" style={{ flexShrink: 0 }} />
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" h={150}>
            <Group justify="space-between" h="100%" align="flex-start">
              <Stack gap="sm" style={{ flex: 1, minWidth: 0 }}>
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Text size="lg" c="dimmed">預算執行</Text>
                  <Button
                    variant="subtle"
                    size="xs"
                    leftSection={budgetVisible ? <IconEyeOff size={12} /> : <IconEye size={12} />}
                    onClick={() => setBudgetVisible(!budgetVisible)}
                    color="gray"
                  >
                    {budgetVisible ? '隱藏' : '顯示'}
                  </Button>
                </Group>
                <Text fw={700} size="1.5rem" c="blue" lh={1.1} style={{ textAlign: 'center' }}>
                  {budgetVisible ? `${stats.budgetUtilization}%` : '●●%'}
                </Text>
                <Text size="xs" c="dimmed" style={{ 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}>
                  {budgetVisible 
                    ? `${formatCurrency(stats.spentBudget)} / ${formatCurrency(stats.totalBudget)}`
                    : '●●●● / ●●●●'
                  }
                </Text>
              </Stack>
              <IconTrendingUp size={40} color="#e9ecef" style={{ flexShrink: 0 }} />
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* 專案列表 */}
      <ProjectScopeList
        projects={projects}
        onView={handleViewProject}
        onEdit={handleEditProject}
        onDelete={handleDeleteRequest}
      />

      {/* 專案表單 Modal */}
      <Modal
        opened={formModalOpened}
        onClose={closeFormModal}
        title={
          formMode === 'create' ? '新增專案' : 
          formMode === 'edit' ? '編輯專案' : '專案詳情'
        }
        size="xl"
        centered
      >
        <ProjectScopeForm
          project={selectedProject}
          mode={formMode}
          onSave={handleSaveProject}
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
        <Text>您確定要刪除專案 "{projectToDelete?.name}" 嗎？此操作無法復原。</Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteModal}>
            取消
          </Button>
          <Button color="red" onClick={confirmDeleteProject}>
            確認刪除
          </Button>
        </Group>
      </Modal>

      {/* 里程碑管理 Modal */}
      <Modal
        opened={milestoneModalOpened}
        onClose={closeMilestoneModal}
        title="里程碑管理"
        size="xl"
        centered
      >
        <MilestoneManagement
          milestones={milestones}
          onAdd={() => {
            console.log('新增里程碑');
          }}
          onEdit={(milestone) => {
            console.log('編輯里程碑', milestone);
          }}
          onDelete={(milestone) => {
            console.log('刪除里程碑', milestone);
          }}
        />
      </Modal>
    </Box>
  );
};

export default ProjectScopeManagement;