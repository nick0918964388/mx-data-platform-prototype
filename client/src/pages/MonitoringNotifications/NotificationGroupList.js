import React from 'react';
import { 
  Table, 
  Badge, 
  Group, 
  ActionIcon, 
  Text, 
  Avatar,
  Box,
  Card,
  Stack
} from '@mantine/core';
import { 
  IconEdit, 
  IconTrash, 
  IconToggleLeft, 
  IconToggleRight,
  IconUsers
} from '@tabler/icons-react';

const NotificationGroupList = ({ groups, onEdit, onDelete, onToggle }) => {
  const rows = groups.map((group) => (
    <Table.Tr key={group.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" radius="xl">
            <IconUsers size={16} />
          </Avatar>
          <Box>
            <Text fw={500} size="md">{group.name}</Text>
            <Text size="sm" c="dimmed">{group.description}</Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {group.members.slice(0, 3).map((member, index) => (
            <Avatar key={member.id} size="sm" radius="xl" color="cyan">
              {member.name.charAt(0)}
            </Avatar>
          ))}
          {group.members.length > 3 && (
            <Text size="sm" c="dimmed">
              +{group.members.length - 3}
            </Text>
          )}
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="md" fw={500}>{group.members.length}</Text>
      </Table.Td>
      <Table.Td>
        <Badge 
          color={group.enabled ? 'gray' : 'green'} 
          variant="light"
          size="md"
        >
          {group.enabled ? '啟用' : '停用'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {new Date(group.updatedAt).toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color={group.enabled ? 'orange' : 'green'}
            onClick={() => onToggle(group.id, !group.enabled)}
            title={group.enabled ? '停用群組' : '啟用群組'}
          >
            {group.enabled ? <IconToggleRight size={18} /> : <IconToggleLeft size={18} />}
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(group)}
            title="編輯群組"
          >
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => onDelete(group)}
            title="刪除群組"
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  if (groups.length === 0) {
    return (
      <Card p="xl" ta="center">
        <Stack align="center" gap="sm">
          <IconUsers size={48} color="gray" />
          <Text c="dimmed">尚未建立任何通知群組</Text>
          <Text size="sm" c="dimmed">點擊「新增群組」建立第一個通知群組</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th><Text size="md" fw={600}>群組資訊</Text></Table.Th>
          <Table.Th><Text size="md" fw={600}>成員</Text></Table.Th>
          <Table.Th><Text size="md" fw={600}>人數</Text></Table.Th>
          <Table.Th><Text size="md" fw={600}>狀態</Text></Table.Th>
          <Table.Th><Text size="md" fw={600}>更新時間</Text></Table.Th>
          <Table.Th><Text size="md" fw={600}>操作</Text></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default NotificationGroupList;