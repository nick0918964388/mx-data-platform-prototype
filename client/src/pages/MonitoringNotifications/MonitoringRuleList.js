import React from 'react';
import { Table, Switch, ActionIcon, Group, Badge, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { mockProjects, mockVendors } from './mockData';

const getTargetName = (targetType, targetId) => {
  if (targetType === 'project') {
    const project = mockProjects.find(p => p.id === targetId);
    return project ? project.name : '未知專案';
  }
  if (targetType === 'vendor') {
    const vendor = mockVendors.find(v => v.id === targetId);
    return vendor ? vendor.name : '未知廠商';
  }
  return 'N/A';
};

const getMetricLabel = (targetType, metric) => {
    if (targetType === 'project') {
        return metric === 'completion' ? '完成率' : metric;
    }
    if (targetType === 'vendor') {
        return metric === 'manHours' ? '累積工時' : metric;
    }
    return metric;
}

const getConditionDescription = (rule) => {
    const { targetType, metric, condition, threshold } = rule;
    const metricLabel = getMetricLabel(targetType, metric);

    if (targetType === 'project' && metric === 'completion') {
        return `實際${metricLabel} ${condition} (預估${metricLabel} - ${threshold}%)`;
    }
    return `${metricLabel} ${condition} ${threshold}`;
};


const MonitoringRuleList = ({ rules, onToggle, onEdit, onDelete }) => {
  const rows = rules.map((rule) => (
    <Table.Tr key={rule.id}>
      <Table.Td>
        <Switch
          checked={rule.enabled}
          onChange={(event) => onToggle(rule.id, event.currentTarget.checked)}
        />
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{rule.name}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={rule.targetType === 'project' ? 'blue' : 'teal'}>
          {rule.targetType === 'project' ? '專案' : '廠商'}
        </Badge>
      </Table.Td>
      <Table.Td>{getTargetName(rule.targetType, rule.targetId)}</Table.Td>
      <Table.Td>
        <Text size="sm">{getConditionDescription(rule)}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" onClick={() => onEdit(rule)}>
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => onDelete(rule)}
            disabled={rule.enabled}
            title={rule.enabled ? '請先停用規則後再刪除' : '刪除規則'}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table verticalSpacing="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>啟用</Table.Th>
          <Table.Th>規則名稱</Table.Th>
          <Table.Th>監控類型</Table.Th>
          <Table.Th>監控目標</Table.Th>
          <Table.Th>觸發條件</Table.Th>
          <Table.Th>操作</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default MonitoringRuleList; 