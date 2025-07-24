import React, { useState } from 'react';
import {
  Box, Card, Title, Text, Badge, Group, Stack, ActionIcon,
  Timeline, Button, Modal, Progress, Divider, Grid
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconPlus, IconEdit, IconTrash, IconCheck, IconClock,
  IconCalendar, IconFlag, IconAlertTriangle
} from '@tabler/icons-react';

const MilestoneManagement = ({ milestones, onAdd, onEdit, onDelete }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'planned': return 'gray';
      case 'delayed': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '進行中';
      case 'planned': return '計劃中';
      case 'delayed': return '延遲';
      default: return '未知';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <IconCheck size={16} />;
      case 'in_progress': return <IconClock size={16} />;
      case 'planned': return <IconCalendar size={16} />;
      case 'delayed': return <IconAlertTriangle size={16} />;
      default: return <IconFlag size={16} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW');
  };

  const calculateDelay = (plannedDate, actualDate, status) => {
    if (status !== 'completed' || !actualDate) return null;
    
    const planned = new Date(plannedDate);
    const actual = new Date(actualDate);
    const diffTime = actual - planned;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const handleViewDetails = (milestone) => {
    setSelectedMilestone(milestone);
    openModal();
  };

  const sortedMilestones = milestones.sort((a, b) => 
    new Date(a.plannedDate) - new Date(b.plannedDate)
  );

  return (
    <Box>
      <Group justify="space-between" mb="lg">
        <Title order={4}>重要里程碑</Title>
        <Button 
          leftSection={<IconPlus size={16} />}
          onClick={() => onAdd && onAdd()}
          size="sm"
        >
          新增里程碑
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md">
        <Timeline active={sortedMilestones.findIndex(m => m.status === 'in_progress')} bulletSize={24}>
          {sortedMilestones.map((milestone, index) => {
            const delay = calculateDelay(milestone.plannedDate, milestone.actualDate, milestone.status);
            
            return (
              <Timeline.Item
                key={milestone.id}
                bullet={getStatusIcon(milestone.status)}
                title={
                  <Group justify="space-between" align="flex-start">
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="md">{milestone.name}</Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        {milestone.description}
                      </Text>
                    </Box>
                    <Group gap="xs">
                      <Badge 
                        color={getStatusColor(milestone.status)} 
                        variant="light" 
                        size="sm"
                      >
                        {getStatusLabel(milestone.status)}
                      </Badge>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="sm"
                        onClick={() => handleViewDetails(milestone)}
                      >
                        <IconEdit size={14} />
                      </ActionIcon>
                    </Group>
                  </Group>
                }
              >
                <Grid gutter="sm" mt="md">
                  <Grid.Col span={6}>
                    <Text size="sm" c="dimmed">計劃日期</Text>
                    <Text size="md" fw={500}>{formatDate(milestone.plannedDate)}</Text>
                  </Grid.Col>
                  {milestone.actualDate && (
                    <Grid.Col span={6}>
                      <Text size="sm" c="dimmed">實際日期</Text>
                      <Group gap="sm" align="center">
                        <Text size="md" fw={500}>{formatDate(milestone.actualDate)}</Text>
                        {delay !== null && delay > 0 && (
                          <Badge color="red" size="xs" variant="light">
                            延遲 {delay} 天
                          </Badge>
                        )}
                        {delay !== null && delay < 0 && (
                          <Badge color="green" size="xs" variant="light">
                            提前 {Math.abs(delay)} 天
                          </Badge>
                        )}
                      </Group>
                    </Grid.Col>
                  )}
                  <Grid.Col span={12}>
                    <Text size="sm" c="dimmed">負責單位</Text>
                    <Text size="md">{milestone.responsible}</Text>
                  </Grid.Col>
                  {milestone.deliverables && milestone.deliverables.length > 0 && (
                    <Grid.Col span={12}>
                      <Text size="sm" c="dimmed">交付物</Text>
                      <Group gap="sm" mt={4}>
                        {milestone.deliverables.slice(0, 3).map((deliverable, idx) => (
                          <Badge key={idx} variant="outline" size="xs" color="blue">
                            {deliverable}
                          </Badge>
                        ))}
                        {milestone.deliverables.length > 3 && (
                          <Badge variant="outline" size="xs" color="gray">
                            +{milestone.deliverables.length - 3}
                          </Badge>
                        )}
                      </Group>
                    </Grid.Col>
                  )}
                </Grid>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Card>

      {/* 里程碑詳情 Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title="里程碑詳情"
        size="lg"
        centered
      >
        {selectedMilestone && (
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={4}>{selectedMilestone.name}</Title>
              <Badge 
                color={getStatusColor(selectedMilestone.status)} 
                variant="light" 
                size="lg"
              >
                {getStatusLabel(selectedMilestone.status)}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {selectedMilestone.description}
            </Text>

            <Divider />

            <Grid>
              <Grid.Col span={6}>
                <Text fw={600} size="sm" mb="xs">計劃完成日期</Text>
                <Text size="sm">{formatDate(selectedMilestone.plannedDate)}</Text>
              </Grid.Col>
              {selectedMilestone.actualDate && (
                <Grid.Col span={6}>
                  <Text fw={600} size="sm" mb="xs">實際完成日期</Text>
                  <Text size="sm">{formatDate(selectedMilestone.actualDate)}</Text>
                </Grid.Col>
              )}
              <Grid.Col span={12}>
                <Text fw={600} size="sm" mb="xs">負責單位</Text>
                <Text size="sm">{selectedMilestone.responsible}</Text>
              </Grid.Col>
            </Grid>

            {selectedMilestone.deliverables && selectedMilestone.deliverables.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Text fw={600} size="sm" mb="md">交付物清單</Text>
                  <Stack gap="xs">
                    {selectedMilestone.deliverables.map((deliverable, index) => (
                      <Group key={index} gap="xs">
                        <IconCheck size={14} color="#51cf66" />
                        <Text size="sm">{deliverable}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Box>
              </>
            )}

            <Group justify="flex-end" mt="lg">
              <Button
                variant="light"
                leftSection={<IconEdit size={16} />}
                onClick={() => {
                  closeModal();
                  onEdit && onEdit(selectedMilestone);
                }}
              >
                編輯里程碑
              </Button>
              <Button
                variant="subtle"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={() => {
                  closeModal();
                  onDelete && onDelete(selectedMilestone);
                }}
              >
                刪除里程碑
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default MilestoneManagement;