import React, { useState } from 'react';
import { 
  Table, Badge, Progress, ActionIcon, Group, Text, 
  Card, Stack, Box, Tooltip, Avatar, Button
} from '@mantine/core';
import { 
  IconEye, IconEdit, IconTrash, IconCalendar, 
  IconUsers, IconCurrency, IconBuilding, IconEyeOff 
} from '@tabler/icons-react';
import { mockVendors, mockJobTypes } from './mockData';

const ProjectScopeList = ({ projects, onView, onEdit, onDelete }) => {
  const [budgetVisible, setBudgetVisible] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'planned': return 'gray';
      case 'on_hold': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '進行中';
      case 'planned': return '規劃中';
      case 'on_hold': return '暫停';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}億`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}萬`;
    }
    return amount.toLocaleString();
  };

  const getVendorNames = (vendorIds) => {
    return vendorIds.map(id => {
      const vendor = mockVendors.find(v => v.id === id);
      return vendor ? vendor.name : '未知廠商';
    }).slice(0, 2).join('、') + (vendorIds.length > 2 ? `等${vendorIds.length}家` : '');
  };

  const getTotalJobCount = (requiredJobTypes) => {
    return requiredJobTypes.reduce((total, job) => total + job.quantity, 0);
  };

  const rows = projects.map((project) => (
    <Table.Tr key={project.id}>
      <Table.Td>
        <Box>
          <Text fw={600} size="md">{project.id}</Text>
          <Badge size="sm" color="gray" variant="light" mt={4}>
            {project.plantArea}
          </Badge>
        </Box>
      </Table.Td>
      
      <Table.Td>
        <Box>
          <Text fw={500} size="md" mb={6}>{project.name}</Text>
          <Text size="sm" c="dimmed" lineClamp={2}>
            {project.description}
          </Text>
        </Box>
      </Table.Td>
      
      <Table.Td>
        <Box>
          <Text fw={500} size="md">{project.manager.name}</Text>
          <Text size="sm" c="dimmed">{project.manager.title}</Text>
        </Box>
      </Table.Td>
      
      <Table.Td>
        <Stack gap="sm">
          <Box>
            <Text size="sm" c="dimmed" mb={4}>進度</Text>
            <Group gap="md" align="center">
              <Progress value={project.progress} size="md" style={{ flex: 1 }} />
              <Text size="sm" fw={500}>{project.progress}%</Text>
            </Group>
          </Box>
          <Text size="sm" c="dimmed">{project.schedule.currentPhase}</Text>
        </Stack>
      </Table.Td>
      
      <Table.Td>
        <Stack gap="sm">
          <Group gap="md" align="center">
            <IconCalendar size={16} color="#868e96" />
            <Text size="sm">
              {new Date(project.schedule.startDate).toLocaleDateString()} - 
              {new Date(project.schedule.endDate).toLocaleDateString()}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">共 {project.schedule.duration} 天</Text>
        </Stack>
      </Table.Td>
      
      <Table.Td>
        <Stack gap="sm">
          <Group gap="md" align="center">
            <IconBuilding size={16} color="#868e96" />
            <Text size="sm" lineClamp={1}>{getVendorNames(project.vendors)}</Text>
          </Group>
          <Group gap="md" align="center">
            <IconUsers size={16} color="#868e96" />
            <Text size="sm">{getTotalJobCount(project.requiredJobTypes)} 人</Text>
          </Group>
        </Stack>
      </Table.Td>
      
      <Table.Td>
        <Stack gap="sm">
          <Group gap="md" align="center">
            <IconCurrency size={16} color="#868e96" />
            <Text size="sm" fw={500}>
              {budgetVisible ? formatCurrency(project.budget.total) : '●●●●●'}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            已用 {budgetVisible ? formatCurrency(project.budget.spent) : '●●●●●'}
          </Text>
        </Stack>
      </Table.Td>
      
      <Table.Td>
        <Badge 
          color={getStatusColor(project.status)} 
          variant="light"
          size="md"
        >
          {getStatusLabel(project.status)}
        </Badge>
      </Table.Td>
      
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="查看詳情">
            <ActionIcon 
              variant="subtle" 
              color="blue" 
              size="sm"
              onClick={() => onView && onView(project)}
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="編輯專案">
            <ActionIcon 
              variant="subtle" 
              color="orange" 
              size="sm"
              onClick={() => onEdit && onEdit(project)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="刪除專案">
            <ActionIcon 
              variant="subtle" 
              color="red" 
              size="sm"
              onClick={() => onDelete && onDelete(project)}
              disabled={project.status === 'in_progress'}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md">
      <Table highlightOnHover verticalSpacing="md">
        <Table.Thead>
          <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
            <Table.Th><Text fw={600} size="md">專案編號</Text></Table.Th>
            <Table.Th><Text fw={600} size="md">專案名稱</Text></Table.Th>
            <Table.Th><Text fw={600} size="md">專案經理</Text></Table.Th>
            <Table.Th><Text fw={600} size="md">進度狀況</Text></Table.Th>
            <Table.Th><Text fw={600} size="md">工期</Text></Table.Th>
            <Table.Th><Text fw={600} size="md">相關資源</Text></Table.Th>
            <Table.Th>
              <Group gap="md" align="center">
                <Text fw={600} size="md">預算</Text>
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
            </Table.Th>
            <Table.Th><Text fw={600} size="md">狀態</Text></Table.Th>
            <Table.Th ta="center"><Text fw={600} size="md">操作</Text></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ProjectScopeList;