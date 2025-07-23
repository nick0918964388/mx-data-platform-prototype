import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Select, NumberInput, Button, Group, Box } from '@mantine/core';
import { mockProjects, mockVendors } from './mockData';

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
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : '規則名稱不可為空'),
      targetId: (value) => (value ? null : '必須選擇一個監控目標'),
      metric: (value) => (value ? null : '必須選擇一個監控指標'),
    },
  });

  const [targetOptions, setTargetOptions] = useState([]);
  const [metricOptions, setMetricOptions] = useState([]);
  
  // 當 targetType 改變時，更新 Target 和 Metric 的選項
  useEffect(() => {
    const { targetType } = form.values;
    if (targetType === 'project') {
      setTargetOptions(mockProjects.map(p => ({ value: p.id, label: p.name })));
      setMetricOptions([{ value: 'completion', label: '完成率' }]);
      if (form.values.metric !== 'completion') {
        form.setFieldValue('metric', 'completion');
      }
    } else if (targetType === 'vendor') {
      setTargetOptions(mockVendors.map(v => ({ value: v.id, label: v.name })));
      setMetricOptions([{ value: 'manHours', label: '累積工時' }]);
       if (form.values.metric !== 'manHours') {
        form.setFieldValue('metric', 'manHours');
      }
    }
     // 如果當前選中的 targetId 不在新的選項中，就清空它
    if (!targetOptions.some(option => option.value === form.values.targetId)) {
        form.setFieldValue('targetId', '');
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
        data={targetOptions}
        {...form.getInputProps('targetId')}
        disabled={!form.values.targetType}
        mt="md"
        required
        searchable
      />
      <Select
        label="監控指標"
        data={metricOptions}
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