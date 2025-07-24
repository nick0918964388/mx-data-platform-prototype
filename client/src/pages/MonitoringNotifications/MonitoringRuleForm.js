import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Select, NumberInput, Button, Group, Box, MultiSelect, Text, Badge, Avatar, Textarea } from '@mantine/core';
import { mockProjects, mockVendors, mockNotificationGroups } from './mockData';

const MonitoringRuleForm = ({ rule, onSave, onCancel }) => {
  const form = useForm({
    initialValues: {
      id: rule?.id || null,
      name: rule?.name || '',
      targetType: rule?.targetType || 'project',
      targetId: rule?.targetId || '',
      metric: rule?.metric || '',
      condition: rule?.condition || '<',
      threshold: rule?.threshold || 0,
      plantArea: rule?.plantArea || '',
      description: rule?.description || '',
      notificationGroups: (rule?.notificationGroups && Array.isArray(rule.notificationGroups)) ? rule.notificationGroups : [],
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : '規則名稱不可為空'),
      targetId: (value) => (value ? null : '必須選擇一個監控目標'),
      metric: (value) => (value ? null : '必須選擇一個監控指標'),
    },
  });

  const [targetOptions, setTargetOptions] = useState([]);
  const [metricOptions, setMetricOptions] = useState([]);

  // 初始化選項
  useEffect(() => {
    const initialTargetType = rule?.targetType || 'project';
    if (initialTargetType === 'project') {
      setTargetOptions((mockProjects || []).map(p => ({ value: p.id, label: p.name })));
      setMetricOptions([{ value: 'completion', label: '完成率' }]);
    } else if (initialTargetType === 'vendor') {
      setTargetOptions((mockVendors || []).map(v => ({ value: v.id, label: v.name })));
      setMetricOptions([{ value: 'manHours', label: '累積工時' }]);
    }
  }, [rule]);
  
  // 準備通知群組選項（只包含啟用的群組）
  const notificationGroupOptions = React.useMemo(() => {
    try {
      console.log('mockNotificationGroups:', mockNotificationGroups);
      const options = (mockNotificationGroups || [])
        .filter(group => {
          console.log('Filtering group:', group);
          return group && group.enabled && group.id && group.name;
        })
        .map(group => {
          console.log('Mapping group:', group);
          return {
            value: group.id,
            label: group.name,
          };
        });
      console.log('Final options:', options);
      return options;
    } catch (error) {
      console.error('Error creating notification group options:', error);
      return [];
    }
  }, []);
  
  // 當 targetType 改變時，更新 Target 和 Metric 的選項
  useEffect(() => {
    const { targetType } = form.values;
    if (targetType === 'project') {
      const projectOptions = (mockProjects || []).map(p => ({ value: p.id, label: p.name }));
      setTargetOptions(projectOptions);
      setMetricOptions([{ value: 'completion', label: '完成率' }]);
      if (form.values.metric !== 'completion') {
        form.setFieldValue('metric', 'completion');
      }
      // 如果當前選中的 targetId 不在新的選項中，就清空它
      if (!projectOptions.some(option => option.value === form.values.targetId)) {
        form.setFieldValue('targetId', '');
      }
    } else if (targetType === 'vendor') {
      const vendorOptions = (mockVendors || []).map(v => ({ value: v.id, label: v.name }));
      setTargetOptions(vendorOptions);
      setMetricOptions([{ value: 'manHours', label: '累積工時' }]);
      if (form.values.metric !== 'manHours') {
        form.setFieldValue('metric', 'manHours');
      }
      // 如果當前選中的 targetId 不在新的選項中，就清空它
      if (!vendorOptions.some(option => option.value === form.values.targetId)) {
        form.setFieldValue('targetId', '');
      }
    }
  }, [form.values.targetType]);


  const handleSubmit = (values) => {
    onSave(values);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="規則名稱"
        placeholder="例如：專案進度落後警示"
        {...form.getInputProps('name')}
        required
      />
      
      <Select
        label="廠區"
        placeholder="選擇廠區"
        data={[
          { value: 'AP5廠區', label: 'AP5廠區' },
          { value: 'AP6廠區', label: 'AP6廠區' },
          { value: 'AP7廠區', label: 'AP7廠區' },
          { value: 'AP8廠區', label: 'AP8廠區' },
        ]}
        {...form.getInputProps('plantArea')}
        mt="md"
        searchable
      />

      <Select
        label="監控類型"
        data={[
          { value: 'project', label: '專案' },
          { value: 'vendor', label: '廠商' },
        ]}
        {...form.getInputProps('targetType')}
        mt="md"
        required
      />
      <Select
        label="監控目標"
        data={targetOptions || []}
        {...form.getInputProps('targetId')}
        disabled={!form.values.targetType}
        mt="md"
        required
        searchable
      />
      <Select
        label="監控指標"
        data={metricOptions || []}
        {...form.getInputProps('metric')}
        disabled={!form.values.targetType}
        mt="md"
        required
      />
      <Group grow mt="md">
        <Select
          label="條件"
          data={[
            { value: '<', label: '小於 (<)' },
            { value: '>', label: '大於 (>)' },
            { value: '>=', label: '大於等於 (>=)' },
            { value: '<=', label: '小於等於 (<=)' },
            { value: '=', label: '等於 (=)' },
          ]}
          {...form.getInputProps('condition')}
          required
        />
        <NumberInput
          label="閾值"
          placeholder="請輸入數值"
          {...form.getInputProps('threshold')}
          required
        />
      </Group>

      <Textarea
        label="規則說明"
        placeholder="描述此監控規則的用途和觸發情況"
        {...form.getInputProps('description')}
        mt="md"
        minRows={3}
      />

      <MultiSelect
        label="通知群組"
        description="選擇要接收此監控規則通知的群組"
        placeholder="請選擇通知群組"
        data={notificationGroupOptions || []}
        value={form.values.notificationGroups || []}
        onChange={(value) => form.setFieldValue('notificationGroups', value || [])}
        searchable
        clearable
        mt="md"
      />

      {(form.values.notificationGroups || []).length > 0 && (
        <Box mt="sm" p="sm" style={{ backgroundColor: '#f8f9fa', borderRadius: 4 }}>
          <Text size="sm" fw={500} mb="xs">將通知以下群組成員：</Text>
          <Group gap="xs">
            {(form.values.notificationGroups || []).map(groupId => {
              const group = (mockNotificationGroups || []).find(g => g && g.id === groupId);
              return group?.members?.map(member => (
                <Badge key={member.id} size="sm" variant="outline" color="gray">
                  {member.name}
                </Badge>
              )) || [];
            })}
          </Group>
        </Box>
      )}

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">儲存</Button>
      </Group>
    </Box>
  );
};

export default MonitoringRuleForm; 