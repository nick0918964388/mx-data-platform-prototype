import React from 'react';
import { Table, Switch, ActionIcon, Group, Badge, Text, Avatar, Tooltip } from '@mantine/core';
import { IconPencil, IconTrash, IconBell } from '@tabler/icons-react';
import { mockProjects, mockVendors, mockNotificationGroups } from './mockData';

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
      <Table.Td>
        <div>
          <Text fw={500}>{getTargetName(rule.targetType, rule.targetId)}</Text>
          {rule.plantArea && (
            <Badge size="xs" color="gray" variant="light" mt={2}>
              {rule.plantArea}
            </Badge>
          )}
        </div>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{getConditionDescription(rule)}</Text>
      </Table.Td>
      <Table.Td>
        {rule.notificationGroups && rule.notificationGroups.length > 0 ? (
          <Group gap="xs">
            {rule.notificationGroups.slice(0, 2).map(groupId => {
              const group = (mockNotificationGroups || []).find(g => g && g.id === groupId);
              return group ? (
                <Tooltip key={group.id} label={`${group.name} (${group.members?.length || 0} 位成員)`}>
                  <Badge size="sm" variant="light" color="blue">
                    {group.name}
                  </Badge>
                </Tooltip>
              ) : null;
            })}
            {rule.notificationGroups.length > 2 && (
              <Badge size="sm" variant="light" color="gray">
                +{rule.notificationGroups.length - 2}
              </Badge>
            )}
          </Group>
        ) : (
          <Text size="sm" c="dimmed">無通知群組</Text>
        )}
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
          <Table.Th>通知群組</Table.Th>
          <Table.Th>操作</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default MonitoringRuleList; 