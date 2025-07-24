import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Box, TextInput, Textarea, Select, NumberInput, Button, Group, 
  Grid, Card, Title, Text, Stack, MultiSelect, Table, ActionIcon,
  Tabs, Divider, Badge, Paper, PasswordInput
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlus, IconTrash, IconCalendar, IconUsers, IconBuilding, IconEye, IconEyeOff } from '@tabler/icons-react';
import { mockVendors, mockJobTypes } from './mockData';

const ProjectScopeForm = ({ project, onSave, onCancel, mode = 'edit' }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';
  const [budgetVisible, setBudgetVisible] = useState(false);

  const form = useForm({
    initialValues: {
      id: project?.id || '',
      name: project?.name || '',
      description: project?.description || '',
      plantArea: project?.plantArea || '',
      scope: {
        inclusions: project?.scope?.inclusions || [''],
        exclusions: project?.scope?.exclusions || ['']
      },
      manager: {
        name: project?.manager?.name || '',
        title: project?.manager?.title || '',
        department: project?.manager?.department || '',
        phone: project?.manager?.phone || '',
        email: project?.manager?.email || ''
      },
      schedule: {
        startDate: project?.schedule?.startDate ? new Date(project.schedule.startDate) : null,
        endDate: project?.schedule?.endDate ? new Date(project.schedule.endDate) : null,
        currentPhase: project?.schedule?.currentPhase || ''
      },
      vendors: project?.vendors || [],
      requiredJobTypes: project?.requiredJobTypes || [],
      budget: {
        total: project?.budget?.total || 0,
        allocated: project?.budget?.allocated || 0,
        spent: project?.budget?.spent || 0
      },
      status: project?.status || 'planned',
      progress: project?.progress || 0,
      notes: project?.notes || ''
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : '專案名稱不可為空'),
      description: (value) => (value.trim().length > 0 ? null : '專案描述不可為空'),
      plantArea: (value) => (value ? null : '請選擇廠區'),
      'manager.name': (value) => (value.trim().length > 0 ? null : '專案經理姓名不可為空'),
      'manager.email': (value) => (/^\S+@\S+$/.test(value) ? null : '請輸入有效的電子郵件'),
      'schedule.startDate': (value) => (value ? null : '請選擇開始日期'),
      'schedule.endDate': (value) => (value ? null : '請選擇結束日期')
    }
  });

  // 廠區選項
  const plantAreaOptions = [
    { value: 'AP5廠區', label: 'AP5廠區' },
    { value: 'AP6廠區', label: 'AP6廠區' },
    { value: 'AP7廠區', label: 'AP7廠區' },
    { value: 'AP8廠區', label: 'AP8廠區' }
  ];

  // 狀態選項
  const statusOptions = [
    { value: 'planned', label: '規劃中' },
    { value: 'in_progress', label: '進行中' },
    { value: 'on_hold', label: '暫停' },
    { value: 'completed', label: '已完成' },
    { value: 'cancelled', label: '已取消' }
  ];

  // 廠商選項
  const vendorOptions = mockVendors.map(vendor => ({
    value: vendor.id,
    label: `${vendor.name} (${vendor.specialty})`
  }));

  // 工種選項
  const jobTypeOptions = mockJobTypes.map(job => ({
    value: job.id,
    label: `${job.name} (${job.category})`
  }));

  // 添加工種需求
  const addJobType = () => {
    const currentJobTypes = form.values.requiredJobTypes;
    form.setFieldValue('requiredJobTypes', [
      ...currentJobTypes,
      { jobTypeId: '', quantity: 1, duration: 30, notes: '' }
    ]);
  };

  // 移除工種需求
  const removeJobType = (index) => {
    const currentJobTypes = form.values.requiredJobTypes;
    form.setFieldValue('requiredJobTypes', currentJobTypes.filter((_, i) => i !== index));
  };

  // 添加範疇包含項目
  const addInclusionItem = () => {
    const currentInclusions = form.values.scope.inclusions;
    form.setFieldValue('scope.inclusions', [...currentInclusions, '']);
  };

  // 移除範疇包含項目
  const removeInclusionItem = (index) => {
    const currentInclusions = form.values.scope.inclusions;
    form.setFieldValue('scope.inclusions', currentInclusions.filter((_, i) => i !== index));
  };

  // 添加範疇排除項目
  const addExclusionItem = () => {
    const currentExclusions = form.values.scope.exclusions;
    form.setFieldValue('scope.exclusions', [...currentExclusions, '']);
  };

  // 移除範疇排除項目
  const removeExclusionItem = (index) => {
    const currentExclusions = form.values.scope.exclusions;
    form.setFieldValue('scope.exclusions', currentExclusions.filter((_, i) => i !== index));
  };

  // 獲取工種名稱
  const getJobTypeName = (jobTypeId) => {
    const jobType = mockJobTypes.find(job => job.id === jobTypeId);
    return jobType ? jobType.name : '未知工種';
  };

  const handleSubmit = (values) => {
    // 計算工期
    if (values.schedule.startDate && values.schedule.endDate) {
      const timeDiff = values.schedule.endDate.getTime() - values.schedule.startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      values.schedule.duration = daysDiff;
    }

    // 轉換日期格式
    if (values.schedule.startDate) {
      values.schedule.startDate = values.schedule.startDate.toISOString().split('T')[0];
    }
    if (values.schedule.endDate) {
      values.schedule.endDate = values.schedule.endDate.toISOString().split('T')[0];
    }

    onSave(values);
  };

  const formatCurrency = (amount) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}億`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}萬`;
    }
    return amount.toLocaleString();
  };

  if (isViewMode) {
    return (
      <Box>
        <Paper shadow="sm" p="lg" radius="md" mb="lg">
          <Group justify="space-between" mb="lg">
            <Title order={3}>{project.name}</Title>
            <Group>
              <Badge color="blue" size="lg">{project.plantArea}</Badge>
              <Badge color="green" size="lg">{project.status === 'in_progress' ? '進行中' : '其他'}</Badge>
            </Group>
          </Group>

          <Tabs defaultValue="basic" variant="outline">
            <Tabs.List>
              <Tabs.Tab value="basic" leftSection={<IconBuilding size={16} />}>基本資訊</Tabs.Tab>
              <Tabs.Tab value="schedule" leftSection={<IconCalendar size={16} />}>時程資訊</Tabs.Tab>
              <Tabs.Tab value="resources" leftSection={<IconUsers size={16} />}>資源配置</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" pt="lg">
              <Grid>
                <Grid.Col span={12}>
                  <Text fw={600} size="md" mb="xs">專案描述</Text>
                  <Text size="md" c="dimmed" mb="lg">{project.description}</Text>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Text fw={600} size="md" mb="xs">專案經理</Text>
                  <Text size="md" mb={2}>{project.manager.name} ({project.manager.title})</Text>
                  <Text size="sm" c="dimmed" mb={1}>{project.manager.department}</Text>
                  <Text size="sm" c="dimmed">{project.manager.email}</Text>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="md">預算資訊</Text>
                    <Button
                      variant="subtle"
                      size="xs"
                      leftSection={budgetVisible ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                      onClick={() => setBudgetVisible(!budgetVisible)}
                      color="gray"
                    >
                      {budgetVisible ? '隱藏' : '顯示'}
                    </Button>
                  </Group>
                  <Text size="md" mb={2}>
                    總預算: {budgetVisible ? formatCurrency(project.budget.total) : '●●●●●'}
                  </Text>
                  <Text size="md" mb={2}>
                    已分配: {budgetVisible ? formatCurrency(project.budget.allocated) : '●●●●●'}
                  </Text>
                  <Text size="md">
                    已使用: {budgetVisible ? formatCurrency(project.budget.spent) : '●●●●●'}
                  </Text>
                </Grid.Col>
              </Grid>
              
              <Divider my="lg" />
              
              <Grid>
                <Grid.Col span={6}>
                  <Text fw={600} size="md" mb="md">專案範疇 - 包含項目</Text>
                  <Stack gap="sm">
                    {project.scope.inclusions.map((item, index) => (
                      <Text key={index} size="md">• {item}</Text>
                    ))}
                  </Stack>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Text fw={600} size="md" mb="md">專案範疇 - 排除項目</Text>
                  <Stack gap="sm">
                    {project.scope.exclusions.map((item, index) => (
                      <Text key={index} size="md">• {item}</Text>
                    ))}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="schedule" pt="lg">
              <Grid>
                <Grid.Col span={4}>
                  <Text fw={600} size="md" mb="md">開始日期</Text>
                  <Text size="md">{new Date(project.schedule.startDate).toLocaleDateString()}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text fw={600} size="md" mb="md">結束日期</Text>
                  <Text size="md">{new Date(project.schedule.endDate).toLocaleDateString()}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text fw={600} size="md" mb="md">總工期</Text>
                  <Text size="md">{project.schedule.duration} 天</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text fw={600} size="md" mb="md">目前階段</Text>
                  <Text size="md">{project.schedule.currentPhase}</Text>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="resources" pt="lg">
              <Text fw={600} size="md" mb="md">需求工種</Text>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th><Text fw={600} size="md">工種</Text></Table.Th>
                    <Table.Th><Text fw={600} size="md">需求人數</Text></Table.Th>
                    <Table.Th><Text fw={600} size="md">工期(天)</Text></Table.Th>
                    <Table.Th><Text fw={600} size="md">備註</Text></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {project.requiredJobTypes.map((job, index) => (
                    <Table.Tr key={index}>
                      <Table.Td><Text size="md">{getJobTypeName(job.jobTypeId)}</Text></Table.Td>
                      <Table.Td><Text size="md">{job.quantity}</Text></Table.Td>
                      <Table.Td><Text size="md">{job.duration}</Text></Table.Td>
                      <Table.Td><Text size="md" lineClamp={2}>{job.notes}</Text></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        </Paper>

        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel}>關閉</Button>
        </Group>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Paper shadow="sm" p="lg" radius="md" mb="lg">
        <Title order={3} mb="lg">
          {isCreateMode ? '新增專案' : '編輯專案'}
        </Title>

        <Tabs defaultValue="basic" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="basic" leftSection={<IconBuilding size={16} />}>基本資訊</Tabs.Tab>
            <Tabs.Tab value="schedule" leftSection={<IconCalendar size={16} />}>時程資訊</Tabs.Tab>
            <Tabs.Tab value="resources" leftSection={<IconUsers size={16} />}>資源配置</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" pt="lg">
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="專案編號"
                  placeholder="例如: AP5-001"
                  {...form.getInputProps('id')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="廠區"
                  placeholder="選擇廠區"
                  data={plantAreaOptions}
                  {...form.getInputProps('plantArea')}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <TextInput
                  label="專案名稱"
                  placeholder="輸入專案名稱"
                  {...form.getInputProps('name')}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="專案描述"
                  placeholder="詳細描述專案內容與目標"
                  minRows={3}
                  {...form.getInputProps('description')}
                  required
                />
              </Grid.Col>
            </Grid>

            <Divider my="lg" />

            <Title order={4} mb="md">專案經理資訊</Title>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="姓名"
                  placeholder="專案經理姓名"
                  {...form.getInputProps('manager.name')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="職稱"
                  placeholder="例如: 專案經理"
                  {...form.getInputProps('manager.title')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="部門"
                  placeholder="所屬部門"
                  {...form.getInputProps('manager.department')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="電話"
                  placeholder="聯絡電話"
                  {...form.getInputProps('manager.phone')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="電子郵件"
                  placeholder="email@company.com"
                  {...form.getInputProps('manager.email')}
                  required
                />
              </Grid.Col>
            </Grid>

            <Divider my="lg" />

            <Title order={4} mb="md">專案範疇</Title>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={500} mb="sm">包含項目</Text>
                <Stack gap="xs">
                  {form.values.scope.inclusions.map((item, index) => (
                    <Group key={index} align="flex-end">
                      <TextInput
                        placeholder="輸入包含項目"
                        style={{ flex: 1 }}
                        value={item}
                        onChange={(e) => {
                          const newInclusions = [...form.values.scope.inclusions];
                          newInclusions[index] = e.target.value;
                          form.setFieldValue('scope.inclusions', newInclusions);
                        }}
                      />
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeInclusionItem(index)}
                        disabled={form.values.scope.inclusions.length <= 1}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                  <Button
                    variant="light"
                    leftSection={<IconPlus size={16} />}
                    onClick={addInclusionItem}
                    size="xs"
                  >
                    添加項目
                  </Button>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Text fw={500} mb="sm">排除項目</Text>
                <Stack gap="xs">
                  {form.values.scope.exclusions.map((item, index) => (
                    <Group key={index} align="flex-end">
                      <TextInput
                        placeholder="輸入排除項目"
                        style={{ flex: 1 }}
                        value={item}
                        onChange={(e) => {
                          const newExclusions = [...form.values.scope.exclusions];
                          newExclusions[index] = e.target.value;
                          form.setFieldValue('scope.exclusions', newExclusions);
                        }}
                      />
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeExclusionItem(index)}
                        disabled={form.values.scope.exclusions.length <= 1}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                  <Button
                    variant="light"
                    leftSection={<IconPlus size={16} />}
                    onClick={addExclusionItem}
                    size="xs"
                  >
                    添加項目
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="schedule" pt="lg">
            <Grid>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="開始日期"
                  placeholder="選擇開始日期"
                  {...form.getInputProps('schedule.startDate')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DatePickerInput
                  label="結束日期"
                  placeholder="選擇結束日期"
                  {...form.getInputProps('schedule.endDate')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="目前階段"
                  placeholder="例如: 基礎建設施工"
                  {...form.getInputProps('schedule.currentPhase')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="專案狀態"
                  data={statusOptions}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <NumberInput
                  label="完成進度 (%)"
                  placeholder="0-100"
                  min={0}
                  max={100}
                  {...form.getInputProps('progress')}
                />
              </Grid.Col>
            </Grid>

            <Divider my="lg" />

            <Title order={4} mb="md">預算資訊</Title>
            <Grid>
              <Grid.Col span={4}>
                <NumberInput
                  label="總預算 (台幣)"
                  placeholder="輸入總預算金額"
                  {...form.getInputProps('budget.total')}
                  thousandSeparator=","
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="已分配預算 (台幣)"
                  placeholder="已分配金額"
                  {...form.getInputProps('budget.allocated')}
                  thousandSeparator=","
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="已使用預算 (台幣)"
                  placeholder="已使用金額"
                  {...form.getInputProps('budget.spent')}
                  thousandSeparator=","
                />
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="resources" pt="lg">
            <Title order={4} mb="md">相關廠商</Title>
            <MultiSelect
              placeholder="選擇相關廠商"
              data={vendorOptions}
              {...form.getInputProps('vendors')}
              searchable
              mb="lg"
            />

            <Title order={4} mb="md">需求工種</Title>
            <Table mb="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>工種</Table.Th>
                  <Table.Th>需求人數</Table.Th>
                  <Table.Th>工期(天)</Table.Th>
                  <Table.Th>備註</Table.Th>
                  <Table.Th>操作</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form.values.requiredJobTypes.map((job, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Select
                        placeholder="選擇工種"
                        data={jobTypeOptions}
                        value={job.jobTypeId}
                        onChange={(value) => {
                          const newJobTypes = [...form.values.requiredJobTypes];
                          newJobTypes[index].jobTypeId = value;
                          form.setFieldValue('requiredJobTypes', newJobTypes);
                        }}
                        size="xs"
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        placeholder="人數"
                        min={1}
                        value={job.quantity}
                        onChange={(value) => {
                          const newJobTypes = [...form.values.requiredJobTypes];
                          newJobTypes[index].quantity = value;
                          form.setFieldValue('requiredJobTypes', newJobTypes);
                        }}
                        size="xs"
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        placeholder="天數"
                        min={1}
                        value={job.duration}
                        onChange={(value) => {
                          const newJobTypes = [...form.values.requiredJobTypes];
                          newJobTypes[index].duration = value;
                          form.setFieldValue('requiredJobTypes', newJobTypes);
                        }}
                        size="xs"
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        placeholder="備註"
                        value={job.notes}
                        onChange={(e) => {
                          const newJobTypes = [...form.values.requiredJobTypes];
                          newJobTypes[index].notes = e.target.value;
                          form.setFieldValue('requiredJobTypes', newJobTypes);
                        }}
                        size="xs"
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeJobType(index)}
                        size="sm"
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            
            <Button
              variant="light"
              leftSection={<IconPlus size={16} />}
              onClick={addJobType}
              mb="lg"
            >
              添加工種需求
            </Button>

            <Textarea
              label="備註"
              placeholder="其他備註事項"
              minRows={3}
              {...form.getInputProps('notes')}
            />
          </Tabs.Panel>
        </Tabs>
      </Paper>

      <Group justify="flex-end">
        <Button variant="default" onClick={onCancel}>取消</Button>
        <Button type="submit">儲存</Button>
      </Group>
    </Box>
  );
};

export default ProjectScopeForm;