import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, Paper, Title, Text, Tabs, Grid, Card, Badge, 
  Table, Button, Group, Stack, ActionIcon, Modal,
  TextInput, Textarea, Select, NumberInput, Switch,
  Divider, Alert, Progress, ScrollArea, Accordion,
  MultiSelect, Stepper, RangeSlider, SegmentedControl,
  ColorInput, LoadingOverlay, Center, Container,
  Timeline, DateTimePicker, JsonInput, Code, Drawer, 
  Menu, RingProgress, Skeleton, Anchor, Tooltip,
  ThemeIcon, Notification, Kbd, Spotlight
} from '@mantine/core';
import { 
  IconChartLine, IconCalendarEvent, IconMessageQuestion, IconTable,
  IconDatabase, IconColumns, IconCalculator, IconEye, IconPlus,
  IconEdit, IconTrash, IconSearch, IconFilter, IconDownload,
  IconInfoCircle, IconMath, IconMathFunction, IconChartBar,
  IconChartPie, IconChartDots, IconChartArea, IconDeviceFloppy,
  IconShare, IconRefresh, IconSettings, IconLayoutGrid,
  IconChartBubble, IconTrendingUp, IconReportAnalytics,
  IconClock, IconPlayerPause, IconStop, IconDoor,
  IconBuilding, IconCertificate, IconFileText, IconTools,
  IconDashboard, IconCheck, IconX, IconAlertTriangle,
  IconHistory, IconPlayerPlay, IconClockHour4, IconCalendar,
  IconSettingsAutomation, IconApi, IconPlugConnected,
  IconCloudDownload, IconActivity, IconBell, IconClipboardList
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { BarChart, LineChart, PieChart, AreaChart, DonutChart } from '@mantine/charts';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

// 模擬排程管理資料
const mockSupportedSystems = [
  {
    id: 'EMS',
    name: 'EMS門禁管理系統',
    description: '員工門禁進出記錄同步',
    icon: 'IconDoor',
    color: 'blue',
    status: 'connected',
    endpoint: 'https://ems.company.com/api',
    lastSync: '2024-12-05T14:30:00Z',
    defaultParams: {
      syncInterval: '1d',
      retryCount: 3,
      batchSize: 100
    }
  },
  {
    id: 'SO360',
    name: 'SO360承攬商管理系統',
    description: '承攬商資料及工作狀態同步',
    icon: 'IconBuilding',
    color: 'green',
    status: 'connected',
    endpoint: 'https://so360.company.com/api',
    lastSync: '2024-12-05T12:15:00Z',
    defaultParams: {
      syncInterval: '4h',
      retryCount: 2,
      batchSize: 50
    }
  },
  {
    id: 'SRTS',
    name: 'SRTS員工證照訓練',
    description: '員工訓練記錄及證照狀態同步',
    icon: 'IconCertificate',
    color: 'orange',
    status: 'warning',
    endpoint: 'https://srts.company.com/api',
    lastSync: '2024-12-05T08:20:00Z',
    defaultParams: {
      syncInterval: '12h',
      retryCount: 3,
      batchSize: 200
    }
  },
  {
    id: 'TSM_SMOC',
    name: 'TSM SMOC管理案號',
    description: '管理案號及工單狀態同步',
    icon: 'IconFileText',
    color: 'purple',
    status: 'connected',
    endpoint: 'https://tsm.company.com/api',
    lastSync: '2024-12-05T13:45:00Z',
    defaultParams: {
      syncInterval: '2h',
      retryCount: 5,
      batchSize: 150
    }
  },
  {
    id: 'FAM',
    name: 'FAM保養系統',
    description: '設備保養計劃及執行記錄同步',
    icon: 'IconTools',
    color: 'red',
    status: 'error',
    endpoint: 'https://fam.company.com/api',
    lastSync: '2024-12-04T22:30:00Z',
    defaultParams: {
      syncInterval: '6h',
      retryCount: 3,
      batchSize: 75
    }
  },
  {
    id: 'PM_CONTROL',
    name: 'PM行控中心',
    description: 'PM執行狀態及進度監控',
    icon: 'IconDashboard',
    color: 'teal',
    status: 'connected',
    endpoint: 'https://pm.company.com/api',
    lastSync: '2024-12-05T14:45:00Z',
    defaultParams: {
      syncInterval: '30m',
      retryCount: 2,
      batchSize: 300
    }
  }
];

const mockScheduleTasks = [
  {
    id: 'schedule_001',
    name: 'EMS門禁資料同步',
    description: '每日同步EMS門禁管理系統的進出記錄',
    systemType: 'EMS',
    systemName: 'EMS門禁管理系統',
    scheduleType: 'cron',
    cronExpression: '0 2 * * *',
    cronDisplay: '每日 02:00',
    isActive: true,
    status: 'running',
    nextRunTime: '2024-12-06T02:00:00Z',
    lastRunTime: '2024-12-05T02:00:00Z',
    lastRunStatus: 'success',
    totalRuns: 45,
    successRate: 97.8,
    createdBy: '系統管理員',
    createdAt: '2024-11-01T10:00:00Z',
    parameters: {
      apiEndpoint: 'https://ems.company.com/api/access',
      batchSize: 100,
      timeout: 300,
      retryCount: 3
    }
  },
  {
    id: 'schedule_002',
    name: 'SO360承攬商狀態更新',
    description: '每4小時同步承攬商工作狀態',
    systemType: 'SO360',
    systemName: 'SO360承攬商管理系統',
    scheduleType: 'cron',
    cronExpression: '0 */4 * * *',
    cronDisplay: '每4小時',
    isActive: true,
    status: 'success',
    nextRunTime: '2024-12-05T16:00:00Z',
    lastRunTime: '2024-12-05T12:00:00Z',
    lastRunStatus: 'success',
    totalRuns: 180,
    successRate: 95.5,
    createdBy: '系統管理員',
    createdAt: '2024-10-15T09:30:00Z',
    parameters: {
      apiEndpoint: 'https://so360.company.com/api/contractors',
      batchSize: 50,
      timeout: 180,
      retryCount: 2
    }
  },
  {
    id: 'schedule_003',
    name: 'SRTS證照資料檢核',
    description: '每日檢核員工證照到期狀態',
    systemType: 'SRTS',
    systemName: 'SRTS員工證照訓練',
    scheduleType: 'cron',
    cronExpression: '0 6 * * *',
    cronDisplay: '每日 06:00',
    isActive: false,
    status: 'disabled',
    nextRunTime: null,
    lastRunTime: '2024-12-04T06:00:00Z',
    lastRunStatus: 'failed',
    totalRuns: 38,
    successRate: 84.2,
    createdBy: '人資部',
    createdAt: '2024-11-10T14:20:00Z',
    parameters: {
      apiEndpoint: 'https://srts.company.com/api/certificates',
      batchSize: 200,
      timeout: 600,
      retryCount: 3
    }
  },
  {
    id: 'schedule_004',
    name: 'TSM工單狀態同步',
    description: '每2小時同步工單處理狀態',
    systemType: 'TSM_SMOC',
    systemName: 'TSM SMOC管理案號',
    scheduleType: 'cron',
    cronExpression: '0 */2 * * *',
    cronDisplay: '每2小時',
    isActive: true,
    status: 'waiting',
    nextRunTime: '2024-12-05T16:00:00Z',
    lastRunTime: '2024-12-05T14:00:00Z',
    lastRunStatus: 'success',
    totalRuns: 320,
    successRate: 98.1,
    createdBy: '工程部',
    createdAt: '2024-10-01T11:15:00Z',
    parameters: {
      apiEndpoint: 'https://tsm.company.com/api/workorders',
      batchSize: 150,
      timeout: 240,
      retryCount: 5
    }
  },
  {
    id: 'schedule_005',
    name: 'FAM保養計劃同步',
    description: '每6小時同步設備保養計劃',
    systemType: 'FAM',
    systemName: 'FAM保養系統',
    scheduleType: 'cron',
    cronExpression: '0 */6 * * *',
    cronDisplay: '每6小時',
    isActive: true,
    status: 'failed',
    nextRunTime: '2024-12-05T18:00:00Z',
    lastRunTime: '2024-12-05T12:00:00Z',
    lastRunStatus: 'failed',
    totalRuns: 85,
    successRate: 89.4,
    createdBy: '設備部',
    createdAt: '2024-11-05T16:45:00Z',
    parameters: {
      apiEndpoint: 'https://fam.company.com/api/maintenance',
      batchSize: 75,
      timeout: 450,
      retryCount: 3
    }
  }
];

const mockExecutionHistory = [
  {
    id: 'exec_001',
    scheduleId: 'schedule_001',
    scheduleName: 'EMS門禁資料同步',
    startTime: '2024-12-05T02:00:00Z',
    endTime: '2024-12-05T02:05:32Z',
    status: 'success',
    duration: 332,
    recordsProcessed: 1250,
    errorMessage: null,
    logs: [
      { timestamp: '2024-12-05T02:00:00Z', level: 'info', message: '開始執行排程任務' },
      { timestamp: '2024-12-05T02:00:15Z', level: 'info', message: '連接EMS系統成功' },
      { timestamp: '2024-12-05T02:01:30Z', level: 'info', message: '開始同步門禁記錄' },
      { timestamp: '2024-12-05T02:05:30Z', level: 'info', message: '資料同步完成，處理1250筆記錄' }
    ],
    metrics: {
      throughput: 3.77,
      errorRate: 0,
      apiCalls: 15,
      dataSize: '2.5MB'
    }
  },
  {
    id: 'exec_002',
    scheduleId: 'schedule_002',
    scheduleName: 'SO360承攬商狀態更新',
    startTime: '2024-12-05T12:00:00Z',
    endTime: '2024-12-05T12:03:15Z',
    status: 'success',
    duration: 195,
    recordsProcessed: 380,
    errorMessage: null,
    logs: [
      { timestamp: '2024-12-05T12:00:00Z', level: 'info', message: '開始執行排程任務' },
      { timestamp: '2024-12-05T12:00:10Z', level: 'info', message: '連接SO360系統成功' },
      { timestamp: '2024-12-05T12:03:10Z', level: 'info', message: '承攬商狀態同步完成，處理380筆記錄' }
    ],
    metrics: {
      throughput: 1.95,
      errorRate: 0,
      apiCalls: 8,
      dataSize: '850KB'
    }
  },
  {
    id: 'exec_003',
    scheduleId: 'schedule_005',
    scheduleName: 'FAM保養計劃同步',
    startTime: '2024-12-05T12:00:00Z',
    endTime: '2024-12-05T12:02:45Z',
    status: 'failed',
    duration: 165,
    recordsProcessed: 0,
    errorMessage: 'API連接超時：無法連接到FAM系統端點',
    logs: [
      { timestamp: '2024-12-05T12:00:00Z', level: 'info', message: '開始執行排程任務' },
      { timestamp: '2024-12-05T12:00:05Z', level: 'warning', message: '嘗試連接FAM系統...' },
      { timestamp: '2024-12-05T12:01:30Z', level: 'error', message: '連接超時，重試中...' },
      { timestamp: '2024-12-05T12:02:45Z', level: 'error', message: '連接失敗：API連接超時' }
    ],
    metrics: {
      throughput: 0,
      errorRate: 100,
      apiCalls: 3,
      dataSize: '0KB'
    }
  }
];

// 模擬資料表結構
const mockDataTables = [
  {
    id: 'projects_table',
    name: 'projects',
    displayName: '專案資料表',
    description: '包含所有工程專案的基本資訊',
    category: '專案管理',
    rowCount: 245,
    columns: [
      { name: '廠區', type: 'string', description: '專案所屬廠區代碼', nullable: false, distinctValues: ['AP3', 'AP4', 'AP5', 'AP6', 'AP7'] },
      { name: '單位', type: 'string', description: '負責單位名稱', nullable: false, distinctValues: ['土木工程部', '機電工程部', '環保工程部'] },
      { name: '專案負責人', type: 'string', description: '專案主要負責人姓名', nullable: false, distinctValues: ['王工程師', '李工程師', '陳工程師', '林工程師'] },
      { name: '專案進度', type: 'number', description: '專案完成百分比', nullable: false, min: 0, max: 100 },
      { name: '參與廠商', type: 'string', description: '參與施工的廠商名稱', nullable: true, distinctValues: ['承佳營造', '宏達工程', '信義機電', '環球建設'] },
      { name: '廠商實際累計出工數', type: 'number', description: '廠商實際投入的總工時數（小時）', nullable: false, min: 0 },
      { name: '專案總工時(日)', type: 'number', description: '專案預計總工作天數', nullable: false, min: 1 }
    ],
    lastUpdated: '2024-12-05T10:30:00Z'
  },
  {
    id: 'manpower_table',
    name: 'manpower_statistics', 
    displayName: '人力資源統計表',
    description: 'F22P3 NFCD人力出工統計與管理',
    category: '人力管理',
    rowCount: 1850,
    columns: [
      { name: '日期', type: 'datetime', description: '出工統計日期', nullable: false },
      { name: '專案代碼', type: 'string', description: '專案識別代碼', nullable: false, distinctValues: ['F22P3', 'F22P4', 'F22P5', 'F23P1'] },
      { name: '總出工人數', type: 'number', description: '當日總出工人數', nullable: false, min: 0, max: 1200 },
      { name: 'CSA人數', type: 'number', description: 'CSA認證人員數量', nullable: false, min: 0, max: 1000 },
      { name: '系統人員', type: 'number', description: '系統內建人員數量', nullable: false, min: 0, max: 100 },
      { name: '其他人員', type: 'number', description: '其他類別人員數量', nullable: false, min: 0, max: 200 },
      { name: '工種類別', type: 'string', description: '主要工種分類', nullable: false, distinctValues: ['土木工程', '機電安裝', '系統整合', '品質管控', '安全監督'] },
      { name: '出勤率', type: 'number', description: '實際出勤率百分比', nullable: false, min: 80, max: 100 }
    ],
    lastUpdated: '2024-12-05T11:30:00Z'
  },
  {
    id: 'construction_table', 
    name: 'construction_sites',
    displayName: '施工現場資料表',
    description: '施工現場的詳細資訊和狀態記錄',
    category: '施工管理',
    rowCount: 156,
    columns: [
      { name: '現場名稱', type: 'string', description: '施工現場的正式名稱', nullable: false },
      { name: '現場位置', type: 'string', description: '施工現場的地理位置', nullable: false },
      { name: '施工狀態', type: 'string', description: '目前施工進行狀態', nullable: false, distinctValues: ['施工中', '暫停', '完工', '準備中'] },
      { name: '現場督導', type: 'string', description: '負責現場監督的工程師', nullable: false },
      { name: '工人數量', type: 'number', description: '目前在場工人總數', nullable: false, min: 0 },
      { name: '安全評分', type: 'number', description: '現場安全評估分數', nullable: false, min: 0, max: 100 }
    ],
    lastUpdated: '2024-12-05T09:15:00Z'
  },
  {
    id: 'monitoring_table',
    name: 'monitoring_data', 
    displayName: '監控數據表',
    description: '各種設備和環境的監控數據記錄',
    category: '監控管理',
    rowCount: 5234,
    columns: [
      { name: '設備名稱', type: 'string', description: '監控設備的名稱', nullable: false },
      { name: '監控時間', type: 'datetime', description: '數據記錄的時間戳', nullable: false },
      { name: '溫度', type: 'number', description: '設備或環境溫度（攝氏度）', nullable: true },
      { name: '壓力', type: 'number', description: '設備壓力值（bar）', nullable: true },
      { name: '狀態', type: 'string', description: '設備運行狀態', nullable: false, distinctValues: ['正常', '警告', '異常', '維護'] }
    ],
    lastUpdated: '2024-12-05T11:45:00Z'
  }
];

// 模擬計算欄位
const mockCalculatedFields = [
  {
    id: 'calc_001',
    name: 'avg_daily_work_hours',
    displayName: '平均廠商每日出工數',
    description: '計算廠商實際累計出工數除以專案總工時',
    formula: '廠商實際累計出工數 / 專案總工時(日)',
    dataType: 'number',
    unit: '小時/日',
    sourceTable: 'projects_table',
    dependencies: ['廠商實際累計出工數', '專案總工時(日)'],
    category: '效率指標',
    isActive: true,
    createdAt: '2024-12-05T10:30:00Z'
  },
  {
    id: 'calc_002', 
    name: 'project_efficiency',
    displayName: '專案效率指標',
    description: '基於進度和時間的專案效率計算',
    formula: '專案進度 / (已用工時 / 總工時) * 100',
    dataType: 'number',
    unit: '%',
    sourceTable: 'projects_table',
    dependencies: ['專案進度'],
    category: '效率指標',
    isActive: true,
    createdAt: '2024-12-05T08:45:00Z'
  },
  {
    id: 'calc_003',
    name: 'manpower_utilization',
    displayName: '人力利用率',
    description: 'CSA人員佔總出工人數的比例',
    formula: 'CSA人數 / 總出工人數 * 100',
    dataType: 'number',
    unit: '%',
    sourceTable: 'manpower_table',
    dependencies: ['CSA人數', '總出工人數'],
    category: '人力指標',
    isActive: true,
    createdAt: '2024-12-05T11:30:00Z'
  },
  {
    id: 'calc_004',
    name: 'daily_productivity',
    displayName: '日均生產力指標',
    description: '每日出工人數與出勤率的綜合指標',
    formula: '總出工人數 * 出勤率 / 100',
    dataType: 'number',
    unit: '有效人力',
    sourceTable: 'manpower_table',
    dependencies: ['總出工人數', '出勤率'],
    category: '生產力指標',
    isActive: true,
    createdAt: '2024-12-05T11:45:00Z'
  },
  {
    id: 'calc_005',
    name: 'workforce_stability',
    displayName: '人力穩定性指數',
    description: '系統人員與其他人員的比例穩定性',
    formula: 'IF(其他人員 > 0, 系統人員 / 其他人員 * 100, 100)',
    dataType: 'number',
    unit: '穩定指數',
    sourceTable: 'manpower_table',
    dependencies: ['系統人員', '其他人員'],
    category: '穩定性指標',
    isActive: true,
    createdAt: '2024-12-05T12:00:00Z'
  }
];

// 資料表瀏覽器組件
const DataTableBrowser = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTables = mockDataTables.filter(table => 
    table.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid>
      <Grid.Col span={4}>
        <Paper p="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>資料表列表</Title>
            <Badge color="blue" variant="light">{filteredTables.length} 個表格</Badge>
          </Group>
          
          <TextInput
            placeholder="搜尋資料表..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            mb="md"
          />

          <Stack gap="xs">
            {filteredTables.map((table) => (
              <Card
                key={table.id}
                p="sm"
                withBorder
                style={{ cursor: 'pointer' }}
                bg={selectedTable?.id === table.id ? 'blue.1' : undefined}
                onClick={() => setSelectedTable(table)}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={500} size="sm">{table.displayName}</Text>
                  <Badge size="xs" color="gray">{table.category}</Badge>
                </Group>
                <Text size="xs" c="dimmed" lineClamp={2}>
                  {table.description}
                </Text>
                <Text size="xs" c="blue" mt="xs">
                  {table.rowCount.toLocaleString()} 筆資料
                </Text>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>

      <Grid.Col span={8}>
        {selectedTable ? (
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <div>
                <Title order={4}>{selectedTable.displayName}</Title>
                <Text size="sm" c="dimmed">{selectedTable.description}</Text>
              </div>
              <Group>
                <Badge color="green" leftSection={<IconDatabase size={12} />}>
                  {selectedTable.rowCount.toLocaleString()} 筆
                </Badge>
                <Badge color="blue" leftSection={<IconColumns size={12} />}>
                  {selectedTable.columns.length} 欄位
                </Badge>
              </Group>
            </Group>

            <Divider mb="md" />

            <Title order={5} mb="md">欄位資訊</Title>
            <ScrollArea h={400}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>欄位名稱</Table.Th>
                    <Table.Th>類型</Table.Th>
                    <Table.Th>描述</Table.Th>
                    <Table.Th>可為空</Table.Th>
                    <Table.Th>統計</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {selectedTable.columns.map((column, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Text fw={500}>{column.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" color={
                          column.type === 'string' ? 'blue' :
                          column.type === 'number' ? 'green' :
                          column.type === 'datetime' ? 'orange' : 'gray'
                        }>
                          {column.type}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{column.description}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" color={column.nullable ? 'yellow' : 'red'} variant="light">
                          {column.nullable ? '是' : '否'}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {column.distinctValues && (
                          <Text size="xs" c="dimmed">
                            {column.distinctValues.length} 個不重複值
                          </Text>
                        )}
                        {column.min !== undefined && column.max !== undefined && (
                          <Text size="xs" c="dimmed">
                            範圍: {column.min} - {column.max}
                          </Text>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        ) : (
          <Paper p="xl" ta="center" withBorder>
            <IconTable size={48} color="gray" />
            <Title order={4} c="gray" mt="md">選擇資料表</Title>
            <Text c="dimmed">請從左側選擇一個資料表來查看詳細資訊</Text>
          </Paper>
        )}
      </Grid.Col>
    </Grid>
  );
};

// 計算欄位管理組件
const CalculatedFieldsManager = () => {
  const [opened, setOpened] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [calculatedFields, setCalculatedFields] = useState(mockCalculatedFields);
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const form = useForm({
    initialValues: {
      displayName: '',
      description: '',
      formula: '',
      unit: '',
      sourceTable: '',
      category: '效率指標'
    },
    validate: {
      displayName: (value) => value.trim().length < 2 ? '名稱至少需要2個字符' : null,
      formula: (value) => value.trim().length < 3 ? '計算公式不能為空' : null,
      sourceTable: (value) => !value ? '請選擇資料來源表' : null
    }
  });

  const handleSubmit = (values) => {
    const newField = {
      id: `calc_${Date.now()}`,
      name: values.displayName.toLowerCase().replace(/\s+/g, '_'),
      displayName: values.displayName,
      description: values.description,
      formula: values.formula,
      unit: values.unit,
      sourceTable: values.sourceTable,
      category: values.category,
      dataType: 'number',
      dependencies: extractDependencies(values.formula),
      isActive: true,
      createdAt: new Date().toISOString()
    };

    if (editingField) {
      setCalculatedFields(prev => prev.map(field => 
        field.id === editingField.id ? { ...newField, id: editingField.id } : field
      ));
      notifications.show({
        title: '更新成功',
        message: '計算欄位已成功更新',
        color: 'green'
      });
    } else {
      setCalculatedFields(prev => [...prev, newField]);
      notifications.show({
        title: '建立成功', 
        message: '新的計算欄位已成功建立',
        color: 'green'
      });
    }

    setOpened(false);
    setEditingField(null);
    form.reset();
  };

  // 支援的數學函數
  const supportedFunctions = [
    { name: 'SUM', description: '求和', example: 'SUM(數值1, 數值2, ...)' },
    { name: 'AVG', description: '平均值', example: 'AVG(數值1, 數值2, ...)' },
    { name: 'MAX', description: '最大值', example: 'MAX(數值1, 數值2, ...)' },
    { name: 'MIN', description: '最小值', example: 'MIN(數值1, 數值2, ...)' },
    { name: 'COUNT', description: '計數', example: 'COUNT(欄位名稱)' },
    { name: 'ROUND', description: '四捨五入', example: 'ROUND(數值, 小數位數)' },
    { name: 'ABS', description: '絕對值', example: 'ABS(數值)' },
    { name: 'SQRT', description: '平方根', example: 'SQRT(數值)' },
    { name: 'POWER', description: '次方', example: 'POWER(底數, 指數)' },
    { name: 'IF', description: '條件判斷', example: 'IF(條件, 真值, 假值)' }
  ];

  // 運算符說明
  const supportedOperators = [
    { symbol: '+', description: '加法', example: 'A + B' },
    { symbol: '-', description: '減法', example: 'A - B' },
    { symbol: '*', description: '乘法', example: 'A * B' },
    { symbol: '/', description: '除法', example: 'A / B' },
    { symbol: '>', description: '大於', example: 'A > B' },
    { symbol: '<', description: '小於', example: 'A < B' },
    { symbol: '>=', description: '大於等於', example: 'A >= B' },
    { symbol: '<=', description: '小於等於', example: 'A <= B' },
    { symbol: '==', description: '等於', example: 'A == B' },
    { symbol: '!=', description: '不等於', example: 'A != B' }
  ];

  const extractDependencies = (formula) => {
    // 更完整的依賴提取邏輯，支援函數調用
    const fieldMatches = formula.match(/[\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_\(\)]*(?=\s*[+\-*/>=<!]|\s*[,)]|\s*$)/g);
    const dependencies = [];
    
    if (fieldMatches) {
      fieldMatches.forEach(match => {
        // 排除函數名稱和數字
        if (!supportedFunctions.some(func => func.name === match.toUpperCase()) && 
            !match.match(/^\d+(\.\d+)?$/)) {
          dependencies.push(match.trim());
        }
      });
    }
    
    return [...new Set(dependencies)];
  };

  // 公式驗證函數
  const validateFormula = (formula, availableFields) => {
    const errors = [];
    const dependencies = extractDependencies(formula);
    
    // 檢查欄位是否存在
    const invalidFields = dependencies.filter(dep => 
      !availableFields.some(field => field.value === dep)
    );
    
    if (invalidFields.length > 0) {
      errors.push(`以下欄位不存在：${invalidFields.join(', ')}`);
    }
    
    // 檢查括號配對
    const openBrackets = (formula.match(/\(/g) || []).length;
    const closeBrackets = (formula.match(/\)/g) || []).length;
    if (openBrackets !== closeBrackets) {
      errors.push('括號不配對');
    }
    
    // 檢查基本語法
    if (formula.includes('//') || formula.includes('**')) {
      errors.push('不支援的運算符');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      dependencies: dependencies
    };
  };

  const handleEdit = (field) => {
    setEditingField(field);
    form.setValues({
      displayName: field.displayName,
      description: field.description,
      formula: field.formula,
      unit: field.unit,
      sourceTable: field.sourceTable,
      category: field.category
    });
    setOpened(true);
  };

  const handleDelete = (fieldId) => {
    setCalculatedFields(prev => prev.filter(field => field.id !== fieldId));
    notifications.show({
      title: '刪除成功',
      message: '計算欄位已刪除',
      color: 'red'
    });
  };

  // 預覽計算結果
  const handlePreviewCalculation = async () => {
    setPreviewLoading(true);
    try {
      // 模擬 API 調用
      setTimeout(() => {
        const table = mockDataTables.find(t => t.id === form.values.sourceTable);
        if (table) {
          const mockPreview = [];
          for (let i = 0; i < 5; i++) {
            const row = {};
            table.columns.forEach(column => {
              if (column.type === 'number') {
                const min = column.min || 0;
                const max = column.max || 100;
                row[column.name] = Math.floor(Math.random() * (max - min + 1)) + min;
              }
            });
            
            // 簡單計算示例
            let calculatedValue = 'N/A';
            try {
              if (form.values.formula.includes('/')) {
                const parts = form.values.formula.split('/');
                if (parts.length === 2) {
                  const num1 = row[parts[0].trim()] || Math.random() * 100;
                  const num2 = row[parts[1].trim()] || Math.random() * 10 + 1;
                  calculatedValue = Math.round((num1 / num2) * 100) / 100;
                }
              } else if (form.values.formula.includes('SUM')) {
                calculatedValue = Object.values(row).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
              }
            } catch (error) {
              calculatedValue = '錯誤';
            }
            
            mockPreview.push({
              rowIndex: i + 1,
              sourceData: row,
              calculatedValue: calculatedValue
            });
          }
          
          setPreviewData({
            formula: form.values.formula,
            sourceTable: table.displayName,
            previewRows: mockPreview
          });
        }
        setPreviewLoading(false);
      }, 1000);
    } catch (error) {
      setPreviewLoading(false);
      notifications.show({
        title: '預覽失敗',
        message: '無法生成預覽數據',
        color: 'red'
      });
    }
  };

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={4}>計算欄位管理</Title>
          <Text size="sm" c="dimmed">建立和管理自定義的計算欄位</Text>
        </div>
        <Button 
          leftSection={<IconPlus size={16} />}
          onClick={() => setOpened(true)}
        >
          新增計算欄位
        </Button>
      </Group>

      <Grid>
        {calculatedFields.map((field) => (
          <Grid.Col span={12} key={field.id}>
            <Card withBorder p="md">
              <Group justify="space-between" mb="sm">
                <div>
                  <Group gap="sm">
                    <Title order={5}>{field.displayName}</Title>
                    <Badge size="sm" color="blue">{field.category}</Badge>
                    <Badge size="sm" color={field.isActive ? 'green' : 'gray'}>
                      {field.isActive ? '啟用' : '停用'}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mt="xs">{field.description}</Text>
                </div>
                <Group>
                  <ActionIcon variant="light" color="blue" onClick={() => handleEdit(field)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon variant="light" color="red" onClick={() => handleDelete(field.id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              <Paper p="sm" bg="gray.1" mb="sm">
                <Group gap="xs" align="center">
                  <IconMathFunction size={16} color="gray" />
                  <Text size="sm" ff="monospace">{field.formula}</Text>
                </Group>
              </Paper>

              <Group gap="md" mt="sm">
                <Text size="xs" c="dimmed">
                  <strong>資料來源：</strong>
                  {mockDataTables.find(t => t.id === field.sourceTable)?.displayName || field.sourceTable}
                </Text>
                {field.unit && (
                  <Text size="xs" c="dimmed">
                    <strong>單位：</strong>{field.unit}
                  </Text>
                )}
                <Text size="xs" c="dimmed">
                  <strong>依賴欄位：</strong>{field.dependencies.join(', ')}
                </Text>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setEditingField(null);
          form.reset();
        }}
        title={editingField ? '編輯計算欄位' : '新增計算欄位'}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="欄位名稱"
              placeholder="例如：平均廠商每日出工數"
              required
              {...form.getInputProps('displayName')}
            />

            <Textarea
              label="描述"
              placeholder="詳細說明這個計算欄位的用途..."
              rows={3}
              {...form.getInputProps('description')}
            />

            <Select
              label="資料來源表"
              placeholder="選擇資料表"
              required
              data={mockDataTables.map(table => ({
                value: table.id,
                label: table.displayName
              }))}
              {...form.getInputProps('sourceTable')}
            />

            <Stack>
              <Textarea
                label="計算公式"
                placeholder="例如：廠商實際累計出工數 / 專案總工時(日)"
                required
                rows={4}
                {...form.getInputProps('formula')}
              />
              
              <Accordion>
                <Accordion.Item value="functions">
                  <Accordion.Control>
                    <Group>
                      <IconMath size={16} />
                      <Text>支援的函數</Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid>
                      {supportedFunctions.map((func) => (
                        <Grid.Col span={6} key={func.name}>
                          <Paper p="xs" withBorder>
                            <Text fw={500} size="sm">{func.name}</Text>
                            <Text size="xs" c="dimmed">{func.description}</Text>
                            <Text size="xs" ff="monospace" c="blue">{func.example}</Text>
                          </Paper>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
                
                <Accordion.Item value="operators">
                  <Accordion.Control>
                    <Group>
                      <IconCalculator size={16} />
                      <Text>支援的運算符</Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid>
                      {supportedOperators.map((op) => (
                        <Grid.Col span={4} key={op.symbol}>
                          <Paper p="xs" withBorder>
                            <Text fw={500} size="sm">{op.symbol}</Text>
                            <Text size="xs" c="dimmed">{op.description}</Text>
                            <Text size="xs" ff="monospace" c="blue">{op.example}</Text>
                          </Paper>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stack>

            <Group grow>
              <TextInput
                label="單位"
                placeholder="例如：小時/日"
                {...form.getInputProps('unit')}
              />
              
              <Select
                label="分類"
                data={['效率指標', '成本指標', '品質指標', '安全指標', '其他']}
                {...form.getInputProps('category')}
              />
            </Group>

            {form.values.formula && (
              (() => {
                const table = mockDataTables.find(t => t.id === form.values.sourceTable);
                if (!table) return null;
                
                const availableFields = [
                  ...table.columns.map(col => ({ value: col.name, label: col.name })),
                  ...mockCalculatedFields
                    .filter(field => field.sourceTable === form.values.sourceTable && field.isActive)
                    .map(field => ({ value: field.name, label: field.displayName }))
                ];
                
                const validation = validateFormula(form.values.formula, availableFields);
                
                return validation.isValid ? (
                  <Alert icon={<IconInfoCircle size={16} />} color="green">
                    ✅ 公式驗證通過！依賴欄位：{validation.dependencies.join(', ') || '無'}
                  </Alert>
                ) : (
                  <Alert icon={<IconInfoCircle size={16} />} color="red">
                    ❌ 公式錯誤：
                    <ul style={{ margin: '8px 0 0 16px' }}>
                      {validation.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </Alert>
                );
              })()
            )}

            <Group justify="flex-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setOpened(false);
                  setEditingField(null);
                  form.reset();
                }}
              >
                取消
              </Button>
              <Button 
                variant="light" 
                onClick={() => handlePreviewCalculation()}
                disabled={!form.values.formula || !form.values.sourceTable}
              >
                預覽計算
              </Button>
              <Button type="submit">
                {editingField ? '更新' : '建立'}
              </Button>
            </Group>
          </Stack>
        </form>
        
        {/* 預覽結果區域 */}
        {previewData && (
          <Stack mt="lg">
            <Divider label="計算預覽" labelPosition="center" />
            <Paper p="md" withBorder>
              <LoadingOverlay visible={previewLoading} />
              <Group justify="space-between" mb="md">
                <Text fw={500}>預覽結果</Text>
                <Badge color="blue">基於模擬數據</Badge>
              </Group>
              
              <ScrollArea h={200}>
                <Table size="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>#</Table.Th>
                      {Object.keys(previewData.previewRows[0]?.sourceData || {}).map(key => (
                        <Table.Th key={key}>{key}</Table.Th>
                      ))}
                      <Table.Th>
                        <Text fw={600} c="blue">計算結果</Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {previewData.previewRows.map((row) => (
                      <Table.Tr key={row.rowIndex}>
                        <Table.Td>{row.rowIndex}</Table.Td>
                        {Object.values(row.sourceData).map((value, index) => (
                          <Table.Td key={index}>{value}</Table.Td>
                        ))}
                        <Table.Td>
                          <Text fw={600} c="blue">{row.calculatedValue}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
              
              <Alert icon={<IconInfoCircle size={16} />} color="blue" mt="md">
                公式：<Text span ff="monospace">{previewData.formula}</Text>
                <br />
                資料來源：{previewData.sourceTable}
              </Alert>
            </Paper>
          </Stack>
        )}
      </Modal>
    </>
  );
};

// 模擬報表數據
const mockSavedReports = [
  {
    id: 'report_001',
    name: '廠商出工效率分析',
    description: '分析各廠商的每日出工數效率',
    dataSource: 'projects_table',
    chartType: 'bar',
    dimensions: ['廠區', '參與廠商'],
    metrics: ['avg_daily_work_hours'],
    createdAt: '2024-12-05T10:30:00Z',
    isPublic: true
  },
  {
    id: 'report_002', 
    name: '專案進度趨勢',
    description: '各專案的進度變化趨勢',
    dataSource: 'projects_table',
    chartType: 'line',
    dimensions: ['專案負責人'],
    metrics: ['專案進度', 'project_efficiency'],
    createdAt: '2024-12-04T15:20:00Z',
    isPublic: false
  },
  {
    id: 'report_003',
    name: 'F22P3 NFCD 人力出工統計',
    description: '類似圖片的人力資源堆疊統計圖表',
    dataSource: 'manpower_table',
    chartType: 'stackedBar',
    dimensions: ['日期'],
    metrics: ['CSA人數', '系統人員', '其他人員'],
    createdAt: '2024-12-05T12:15:00Z',
    isPublic: true
  },
  {
    id: 'report_004',
    name: '人力與效率綜合分析',
    description: '柱狀圖顯示總出工人數，折線圖顯示出勤率變化',
    dataSource: 'manpower_table',
    chartType: 'mixed',
    dimensions: ['日期'],
    metrics: ['總出工人數', '出勤率'],
    createdAt: '2024-12-05T14:30:00Z',
    isPublic: true
  },
  {
    id: 'report_005',
    name: '單位工作分佈圓餅圖',
    description: '顯示各單位的專案進度分佈比例',
    dataSource: 'projects_table',
    chartType: 'pie',
    dimensions: ['單位'],
    metrics: ['專案進度'],
    createdAt: '2024-12-05T15:00:00Z',
    isPublic: true
  }
];

// 圖表類型配置
const chartTypes = [
  { value: 'bar', label: '柱狀圖', icon: IconChartBar, description: '比較不同類別的數值' },
  { value: 'stackedBar', label: '堆疊柱狀圖', icon: IconChartBar, description: '顯示分類數據的組成結構' },
  { value: 'line', label: '折線圖', icon: IconChartLine, description: '顯示數據隨時間的變化趨勢' },
  { value: 'mixed', label: '混合圖表', icon: IconChartBubble, description: '柱狀圖與折線圖的組合分析' },
  { value: 'pie', label: '圓餅圖', icon: IconChartPie, description: '顯示各部分佔整體的比例' },
  { value: 'area', label: '面積圖', icon: IconChartArea, description: '強調數量隨時間的累積變化' },
  { value: 'scatter', label: '散點圖', icon: IconChartDots, description: '顯示兩個變數間的關係' }
];

// 生成模擬圖表數據 - 依照實際模擬資料結構
const generateMockChartData = (chartType, dimensions, metrics, sourceTable) => {
  const table = mockDataTables.find(t => t.id === sourceTable);
  if (!table || !dimensions?.length || !metrics?.length) return [];

  // 獲取維度欄位的可能值
  const getDimensionValues = (dimensionName) => {
    const column = table.columns.find(col => col.name === dimensionName);
    if (column && column.distinctValues) {
      return column.distinctValues;
    }
    // 如果沒有預定義值，生成一些默認值
    switch (dimensionName) {
      case '廠區': return ['AP3', 'AP4', 'AP5', 'AP6', 'AP7'];
      case '單位': return ['土木工程部', '機電工程部', '環保工程部'];
      case '專案負責人': return ['王工程師', '李工程師', '陳工程師', '林工程師'];
      case '參與廠商': return ['承佳營造', '宏達工程', '信義機電', '環球建設'];
      case '現場督導': return ['張督導', '李督導', '陳督導'];
      case '施工狀態': return ['施工中', '暫停', '完工', '準備中'];
      case '設備名稱': return ['設備A', '設備B', '設備C', '設備D'];
      case '專案代碼': return ['F22P3', 'F22P4', 'F22P5', 'F23P1'];
      case '工種類別': return ['土木工程', '機電安裝', '系統整合', '品質管控', '安全監督'];
      case '日期': 
        // 為人力資源統計生成連續日期
        if (sourceTable === 'manpower_table') {
          return [
            '6/8日', '6/9日', '6/10日', '6/11日', '6/12日', '6/13日', '6/14日',
            '6/15日', '6/16日', '6/17日', '6/18日', '6/19日', '6/20日', '6/21日',
            '6/22日', '6/23日'
          ];
        }
        return ['2024-06-01', '2024-06-02', '2024-06-03'];
      default: return [`${dimensionName}1`, `${dimensionName}2`, `${dimensionName}3`];
    }
  };

  // 生成指標數值 - 根據實際欄位特性
  const getMetricValue = (metricName, dimensionValue) => {
    const column = table.columns.find(col => col.name === metricName);
    let baseValue = 50;
    
    if (column && column.type === 'number') {
      const min = column.min || 0;
      const max = column.max || 100;
      baseValue = Math.random() * (max - min) + min;
    } else {
      // 計算欄位或其他指標的模擬值
      const calculatedField = mockCalculatedFields.find(field => field.name === metricName || field.displayName === metricName);
      if (calculatedField) {
        switch (calculatedField.name) {
          case 'avg_daily_work_hours': baseValue = Math.random() * 5 + 6; break;
          case 'project_efficiency': baseValue = Math.random() * 20 + 80; break;
          case 'manpower_utilization': baseValue = Math.random() * 10 + 85; break; // 85-95%
          case 'daily_productivity': baseValue = Math.random() * 200 + 500; break; // 500-700有效人力
          case 'workforce_stability': baseValue = Math.random() * 30 + 70; break; // 70-100穩定指數
          default: baseValue = Math.random() * 100;
        }
      } else {
        // 根據指標名稱推測合理範圍
        if (metricName.includes('進度')) baseValue = Math.random() * 40 + 60;
        else if (metricName.includes('工時') || metricName.includes('出工')) baseValue = Math.random() * 800 + 200;
        else if (metricName.includes('數量')) baseValue = Math.random() * 50 + 10;
        else if (metricName.includes('評分') || metricName.includes('分數')) baseValue = Math.random() * 20 + 80;
        else if (metricName.includes('溫度')) baseValue = Math.random() * 30 + 20;
        else if (metricName.includes('壓力')) baseValue = Math.random() * 10 + 5;
        else if (metricName.includes('CSA')) baseValue = Math.random() * 200 + 700; // 700-900人
        else if (metricName.includes('系統')) baseValue = Math.random() * 30 + 10; // 10-40人
        else if (metricName.includes('其他')) baseValue = Math.random() * 100 + 50; // 50-150人
        else if (metricName.includes('總出工')) baseValue = Math.random() * 300 + 800; // 800-1100人
        else if (metricName.includes('出勤率')) baseValue = Math.random() * 15 + 85; // 85-100%
        else baseValue = Math.random() * 100;
      }
    }

    // 根據維度值調整數據，讓不同類別有不同特徵
    if (dimensionValue) {
      const hashCode = dimensionValue.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const adjustmentFactor = (hashCode % 20 - 10) / 100;
      baseValue = baseValue * (1 + adjustmentFactor);
    }
    
    return Math.round(baseValue * 100) / 100;
  };

  // 主要維度（用作分組）
  const primaryDimension = dimensions[0];
  const dimensionValues = getDimensionValues(primaryDimension);

  console.log(`生成圖表數據 - 表格: ${table.displayName}, 維度: ${primaryDimension}, 指標: ${metrics.join(', ')}, 類型: ${chartType}`);

  switch (chartType) {
    case 'bar':
      return dimensionValues.map(dimValue => {
        const result = { name: dimValue };
        metrics.forEach((metric, index) => {
          const value = getMetricValue(metric, dimValue);
          // 第一個指標用 'value'，其他用描述性名稱
          const key = index === 0 ? 'value' : metric.replace(/[^a-zA-Z0-9]/g, '_');
          result[key] = value;
        });
        return result;
      });

    case 'stackedBar':
      // 特別為人力資源統計生成堆疊數據
      if (sourceTable === 'manpower_table') {
        // 生成類似F22P3 NFCD的時間序列堆疊數據
        const dates = [
          '6/8日', '6/9日', '6/10日', '6/11日', '6/12日', '6/13日', '6/14日',
          '6/15日', '6/16日', '6/17日', '6/18日', '6/19日', '6/20日', '6/21日',
          '6/22日', '6/23日'
        ];
        
        return dates.map(date => {
          // 生成總人數範圍 600-1000人
          const totalWorkers = Math.floor(Math.random() * 400) + 600;
          const csaWorkers = Math.floor(totalWorkers * (0.85 + Math.random() * 0.1)); // 85-95%
          const systemWorkers = Math.floor(Math.random() * 50); // 0-50人
          const otherWorkers = totalWorkers - csaWorkers - systemWorkers;
          
          return {
            name: date,
            CSA人數: csaWorkers,
            系統人員: systemWorkers,
            其他人員: Math.max(0, otherWorkers),
            總出工人數: totalWorkers
          };
        });
      } else {
        // 其他表格的堆疊數據生成
        return dimensionValues.map(dimValue => {
          const result = { name: dimValue };
          let total = 0;
          
          metrics.forEach((metric, index) => {
            const value = getMetricValue(metric, dimValue);
            const key = metric.replace(/[^a-zA-Z0-9]/g, '_');
            result[key] = value;
            total += value;
          });
          
          result.total = Math.round(total);
          return result;
        });
      }

    case 'line':
      // 生成時間序列數據
      const months = ['2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
      return months.map(month => {
        const result = { month };
        metrics.forEach(metric => {
          const key = metric.replace(/[^a-zA-Z0-9]/g, '_');
          result[key] = getMetricValue(metric, month);
        });
        return result;
      });

    case 'pie':
      const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      const pieData = dimensionValues.map((dimValue, index) => ({
        name: dimValue,
        value: Math.round(getMetricValue(metrics[0], dimValue)),
        color: colors[index % colors.length]
      }));
      
      // 計算總數和百分比
      const total = pieData.reduce((sum, item) => sum + item.value, 0);
      return pieData.map(item => ({
        ...item,
        percentage: total > 0 ? Math.round((item.value / total) * 100 * 100) / 100 : 0
      }));

    case 'area':
      const timePoints = ['2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
      return timePoints.map(time => {
        const result = { month: time };
        // 為面積圖生成堆疊數據
        if (metrics.length >= 1) {
          const baseValue = getMetricValue(metrics[0], time);
          result.completed = Math.round(baseValue * 0.6);
          result.inProgress = Math.round(baseValue * 0.3);
          result.planned = Math.round(baseValue * 0.1);
        }
        return result;
      });

    case 'scatter':
      return dimensionValues.map(dimValue => ({
        name: dimValue,
        x: getMetricValue(metrics[0] || '默認指標', dimValue),
        y: getMetricValue(metrics[1] || '默認指標2', dimValue)
      }));

    case 'mixed':
      // 混合圖表：第一個指標用柱狀圖，第二個指標用折線圖
      if (sourceTable === 'manpower_table') {
        // 人力資源統計的混合圖表
        const dates = [
          '6/8日', '6/9日', '6/10日', '6/11日', '6/12日', '6/13日', '6/14日',
          '6/15日', '6/16日', '6/17日', '6/18日', '6/19日', '6/20日', '6/21日',
          '6/22日', '6/23日'
        ];
        
        const data = dates.map(date => {
          const totalWorkers = Math.floor(Math.random() * 400) + 600;
          const efficiency = Math.random() * 15 + 85; // 85-100%
          
          return {
            name: date,
            總出工人數: totalWorkers,
            出勤率: Math.round(efficiency * 100) / 100
          };
        });
        
        console.log('混合圖表生成的數據:', data);
        return data;
      } else {
        // 其他表格的混合圖表
        const data = dimensionValues.map(dimValue => {
          const result = { name: dimValue };
          metrics.forEach((metric, index) => {
            const value = getMetricValue(metric, dimValue);
            result[metric] = value; // 直接使用原始指標名稱作為鍵
          });
          return result;
        });
        
        console.log('其他表格混合圖表數據:', data);
        return data;
      }

    default:
      return [];
  }
};

// 分析報表建立器組件
const AnalyticsReportBuilder = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savedReports, setSavedReports] = useState(mockSavedReports);
  
  // 使用 useMemo 確保初始值穩定
  const initialReportForm = useMemo(() => ({
    name: '',
    description: '',
    dataSource: '',
    dimensions: [],
    metrics: [],
    chartType: 'bar',
    filters: {},
    isPublic: false
  }), []);
  
  const [reportForm, setReportForm] = useState(initialReportForm);
  const [chartData, setChartData] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [showSavedReports, setShowSavedReports] = useState(false);

  // 可用維度和指標 - 使用 useMemo 優化性能
  const getAvailableFields = useMemo(() => {
    try {
      if (!reportForm?.dataSource) {
        console.log('沒有選擇資料來源');
        return { dimensions: [], metrics: [] };
      }
      
      const table = mockDataTables.find(t => t.id === reportForm.dataSource);
      if (!table) {
        console.log('找不到資料表:', reportForm.dataSource);
        return { dimensions: [], metrics: [] };
      }

      console.log('處理資料表:', table.displayName, '欄位數量:', table.columns?.length);

      // 維度包括 string 和 datetime 類型的欄位
      const dimensions = (table.columns || [])
        .filter(col => col && (col.type === 'string' || col.type === 'datetime'))
        .map(col => ({ 
          value: col.name || '', 
          label: col.type === 'datetime' ? `${col.name} (日期)` : (col.name || '')
        }));

      const metrics = [
        ...(table.columns || [])
          .filter(col => col && col.type === 'number')
          .map(col => ({ value: col.name || '', label: col.name || '' })),
        ...(mockCalculatedFields || [])
          .filter(field => field && field.sourceTable === reportForm.dataSource && field.isActive)
          .map(field => ({ value: field.name || '', label: field.displayName || field.name || '' }))
      ];

      console.log('生成維度:', dimensions.length, '個');
      console.log('生成指標:', metrics.length, '個');

      return { dimensions, metrics };
    } catch (error) {
      console.error('getAvailableFields 錯誤:', error);
      return { dimensions: [], metrics: [] };
    }
  }, [reportForm?.dataSource]);

  const { dimensions: availableDimensions, metrics: availableMetrics } = getAvailableFields;

  // 確保維度和指標數據總是有效的陣列
  const safeDimensions = Array.isArray(availableDimensions) ? availableDimensions : [];
  const safeMetrics = Array.isArray(availableMetrics) ? availableMetrics : [];

  console.log('可用維度:', safeDimensions);
  console.log('可用指標:', safeMetrics);

  // 步驟驗證 - 使用 useCallback 優化
  const isStepValid = useCallback((step) => {
    if (!reportForm) return false;
    
    switch (step) {
      case 0: return Boolean(reportForm.dataSource);
      case 1: return Array.isArray(reportForm.dimensions) && reportForm.dimensions.length > 0 && 
                     Array.isArray(reportForm.metrics) && reportForm.metrics.length > 0;
      case 2: return Boolean(reportForm.chartType);
      case 3: return true;
      case 4: return Boolean(reportForm.name && reportForm.name.trim().length > 0);
      default: return false;
    }
  }, [reportForm]);

  // 下一步
  const nextStep = useCallback(() => {
    if (active < 4 && isStepValid(active)) {
      setActive(active + 1);
      if (active === 2) {
        // 進入預覽步驟時生成圖表數據
        generatePreviewData();
      }
    }
  }, [active, isStepValid]);

  // 上一步
  const prevStep = useCallback(() => {
    if (active > 0) {
      setActive(active - 1);
    }
  }, [active]);

  // 生成預覽數據
  const generatePreviewData = useCallback(() => {
    if (!reportForm) return;
    
    setLoading(true);
    setTimeout(() => {
      const data = generateMockChartData(
        reportForm.chartType,
        reportForm.dimensions,
        reportForm.metrics,
        reportForm.dataSource
      );
      setChartData(data);
      setLoading(false);
      setPreviewMode(true);
    }, 1000);
  }, [reportForm]);

  // 保存報表
  const saveReport = useCallback(() => {
    if (!reportForm || !reportForm.name || !reportForm.name.trim()) {
      notifications.show({
        title: '保存失敗',
        message: '請填寫報表名稱',
        color: 'red'
      });
      return;
    }

    const newReport = {
      id: `report_${Date.now()}`,
      ...reportForm,
      createdAt: new Date().toISOString()
    };

    setSavedReports(prev => [...prev, newReport]);
    notifications.show({
      title: '報表保存成功',
      message: `報表「${reportForm.name}」已成功保存`,
      color: 'green'
    });

    // 重置表單
    setReportForm(initialReportForm);
    setActive(0);
    setPreviewMode(false);
    setChartData([]);
  }, [reportForm, initialReportForm]);

  // 渲染圖表 - 根據實際選定的指標動態生成
  const renderChart = () => {
    if (!chartData.length || !reportForm) return null;

    const chartProps = {
      data: chartData,
      h: 300,
      withLegend: true,
      withTooltip: true
    };

    // 動態生成系列配置
    const generateSeries = () => {
      if (!reportForm.metrics) return [];
      
      const colors = ['blue.6', 'green.6', 'orange.6', 'red.6', 'purple.6'];
      return reportForm.metrics.map((metric, index) => {
        const key = index === 0 ? 'value' : metric.replace(/[^a-zA-Z0-9]/g, '_');
        return {
          name: key,
          label: metric,
          color: colors[index % colors.length]
        };
      });
    };

    console.log('渲染圖表 - 數據:', chartData);
    console.log('渲染圖表 - 指標:', reportForm.metrics);

    switch (reportForm.chartType) {
      case 'bar':
        return (
          <BarChart
            {...chartProps}
            dataKey="name"
            series={generateSeries()}
          />
        );
        
      case 'stackedBar':
        // 堆疊柱狀圖特殊處理
        if (reportForm.dataSource === 'manpower_table') {
          // 人力資源統計的特殊配置
          return (
            <BarChart
              {...chartProps}
              dataKey="name"
              type="stacked"
              series={[
                { name: 'CSA人數', label: 'CSA人員', color: '#D2691E' },
                { name: '系統人員', label: '系統', color: '#90EE90' },
                { name: '其他人員', label: 'Others', color: '#98FB98' }
              ]}
            />
          );
        } else {
          // 其他數據的堆疊柱狀圖
          const stackedSeries = reportForm.metrics.map((metric, index) => {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
            return {
              name: metric.replace(/[^a-zA-Z0-9]/g, '_'),
              label: metric,
              color: colors[index % colors.length]
            };
          });
          
          return (
            <BarChart
              {...chartProps}
              dataKey="name"
              type="stacked"
              series={stackedSeries}
            />
          );
        }
        
      case 'line':
        const lineSeries = reportForm.metrics.map((metric, index) => {
          const colors = ['blue.6', 'green.6', 'orange.6', 'red.6', 'purple.6'];
          return {
            name: metric.replace(/[^a-zA-Z0-9]/g, '_'),
            label: metric,
            color: colors[index % colors.length]
          };
        });
        
        return (
          <LineChart
            {...chartProps}
            dataKey="month"
            series={lineSeries}
          />
        );
        
      case 'pie':
        return (
          <div>
            <PieChart
              {...chartProps}
              withTooltip
              tooltipDataSource="segment"
              mx="auto"
              withLabelsLine
              labelsPosition="outside"
              labelsType="percent"
              withLabels
              h={250}
            />
            
            {/* 圓餅圖統計資訊面板 */}
            <Paper p="md" mt="md" withBorder>
              <Title order={6} mb="sm">統計資訊</Title>
              <Grid>
                {chartData.map((item, index) => (
                  <Grid.Col span={6} key={index}>
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="xs" wrap="nowrap">
                        <div 
                          style={{ 
                            width: 12, 
                            height: 12, 
                            backgroundColor: item.color, 
                            borderRadius: 2 
                          }} 
                        />
                        <Text size="sm" truncate>{item.name}</Text>
                      </Group>
                      <Group gap="xs" wrap="nowrap">
                        <Text size="sm" fw={600}>{item.value}</Text>
                        <Text size="xs" c="dimmed">({item.percentage}%)</Text>
                      </Group>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
              
              <Divider my="sm" />
              <Group justify="space-between">
                <Text size="sm" c="dimmed">總計</Text>
                <Text size="sm" fw={600}>
                  {chartData.reduce((sum, item) => sum + item.value, 0)}
                </Text>
              </Group>
            </Paper>
          </div>
        );
        
      case 'area':
        return (
          <AreaChart
            {...chartProps}
            dataKey="month"
            series={[
              { name: 'completed', label: '已完成', color: 'green.6' },
              { name: 'inProgress', label: '進行中', color: 'blue.6' },
              { name: 'planned', label: '計劃中', color: 'orange.6' }
            ]}
          />
        );
        
      case 'scatter':
        return (
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text c="dimmed">散點圖功能開發中...</Text>
          </div>
        );
        
      case 'mixed':
        // 混合圖表渲染 - 使用 recharts 實現
        if (!chartData.length || !reportForm.metrics || reportForm.metrics.length < 2) {
          return (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text c="dimmed">混合圖表需要至少選擇2個指標（第一個用柱狀圖，第二個用折線圖）</Text>
            </div>
          );
        }
        
        // 獲取數據鍵 - 直接使用原始指標名稱
        const barKey = reportForm.metrics[0] || 'value';
        const lineKey = reportForm.metrics[1] || 'efficiency';
        
        console.log('混合圖表數據:', chartData);
        console.log('柱狀圖鍵:', barKey);
        console.log('折線圖鍵:', lineKey);
        
        return (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                {/* 第一個指標用柱狀圖 */}
                <Bar 
                  yAxisId="left" 
                  dataKey={barKey} 
                  fill="#8884d8" 
                  name={reportForm.metrics[0] || '指標1'}
                />
                {/* 第二個指標用折線圖 */}
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey={lineKey} 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                  name={reportForm.metrics[1] || '指標2'}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );
        
      default:
        return <Text c="dimmed">不支援的圖表類型</Text>;
    }
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={4}>分析報表建立器</Title>
          <Text size="sm" c="dimmed">建立自定義的數據分析報表和視覺化圖表</Text>
        </div>
        <Group>
          <Button 
            variant="light" 
            leftSection={<IconReportAnalytics size={16} />}
            onClick={() => setShowSavedReports(true)}
          >
            我的報表 ({savedReports.length})
          </Button>
        </Group>
      </Group>

      <Paper p="lg" withBorder>
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          
          {/* 步驟 1: 選擇資料來源 */}
          <Stepper.Step 
            label="資料來源" 
            description="選擇分析的資料表"
            icon={<IconDatabase size={18} />}
            loading={loading && active === 0}
          >
            <Stack mt="md">
              <Title order={5}>選擇資料來源表</Title>
              <Select
                label="資料表"
                placeholder="選擇要分析的資料表"
                value={reportForm?.dataSource || ''}
                onChange={(value) => setReportForm(prev => ({ 
                  ...(prev || initialReportForm), 
                  dataSource: value || '',
                  dimensions: [],
                  metrics: []
                }))}
                data={mockDataTables.map(table => ({
                  value: table.id,
                  label: table.displayName,
                  description: table.description
                }))}
                searchable
                clearable
              />
              
              {reportForm?.dataSource && (
                <Alert icon={<IconInfoCircle size={16} />} color="blue">
                  已選擇：{mockDataTables.find(t => t.id === reportForm.dataSource)?.displayName}
                  <br />
                  可用欄位：{mockDataTables.find(t => t.id === reportForm.dataSource)?.columns.length} 個
                </Alert>
              )}
            </Stack>
          </Stepper.Step>

          {/* 步驟 2: 配置維度和指標 */}
          <Stepper.Step 
            label="維度與指標" 
            description="選擇分析的維度和指標"
            icon={<IconLayoutGrid size={18} />}
          >
            <Stack mt="md">
              <Title order={5}>配置分析維度和指標</Title>
              
              <MultiSelect
                label="分析維度"
                placeholder="選擇分組維度（如：廠區、單位）"
                description="維度用於對資料進行分組"
                value={reportForm?.dimensions || []}
                onChange={(value) => setReportForm(prev => ({ 
                  ...(prev || initialReportForm), 
                  dimensions: Array.isArray(value) ? value : [] 
                }))}
                data={safeDimensions}
                searchable
                clearable
                error={safeDimensions.length === 0 ? "沒有可用的維度選項" : null}
                nothingFoundMessage="沒有找到匹配的維度"
              />

              <MultiSelect
                label="分析指標"
                placeholder="選擇要分析的數值指標"
                description="指標是要分析的數值欄位或計算欄位"
                value={reportForm?.metrics || []}
                onChange={(value) => setReportForm(prev => ({ 
                  ...(prev || initialReportForm), 
                  metrics: Array.isArray(value) ? value : [] 
                }))}
                data={safeMetrics}
                searchable
                clearable
                error={safeMetrics.length === 0 ? "沒有可用的指標選項" : null}
                nothingFoundMessage="沒有找到匹配的指標"
              />

              {(reportForm?.dimensions?.length > 0) && (reportForm?.metrics?.length > 0) && (
                <Alert icon={<IconInfoCircle size={16} />} color="green">
                  配置完成！將分析 {reportForm?.dimensions?.length || 0} 個維度和 {reportForm?.metrics?.length || 0} 個指標
                </Alert>
              )}
            </Stack>
          </Stepper.Step>

          {/* 步驟 3: 選擇圖表類型 */}
          <Stepper.Step 
            label="圖表類型" 
            description="選擇視覺化方式"
            icon={<IconChartBar size={18} />}
          >
            <Stack mt="md">
              <Title order={5}>選擇圖表類型</Title>
              
              <Grid>
                {chartTypes.map((chart) => (
                  <Grid.Col span={6} key={chart.value}>
                    <Card
                      p="md"
                      withBorder
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: reportForm?.chartType === chart?.value ? 'var(--mantine-color-blue-light)' : undefined
                      }}
                      onClick={() => {
                        if (chart && chart.value) {
                          setReportForm(prev => ({ ...(prev || initialReportForm), chartType: chart.value }));
                        }
                      }}
                    >
                      <Group align="center" mb="xs">
                        <chart.icon size={24} color={reportForm?.chartType === chart?.value ? 'blue' : 'gray'} />
                        <Text fw={500}>{chart.label}</Text>
                      </Group>
                      <Text size="sm" c="dimmed">{chart.description}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Stepper.Step>

          {/* 步驟 4: 預覽結果 */}
          <Stepper.Step 
            label="預覽結果" 
            description="查看圖表效果"
            icon={<IconEye size={18} />}
          >
            <Stack mt="md">
              <Group justify="space-between">
                <Title order={5}>圖表預覽</Title>
                <Button 
                  variant="light" 
                  leftSection={<IconRefresh size={16} />}
                  onClick={generatePreviewData}
                  loading={loading}
                >
                  重新生成
                </Button>
              </Group>

              <Paper p="md" withBorder>
                <LoadingOverlay visible={loading} />
                {chartData.length > 0 && renderChart()}
                {!loading && chartData.length === 0 && (
                  <Center h={300}>
                    <Stack align="center">
                      <IconChartLine size={48} color="gray" />
                      <Text c="dimmed">點擊「重新生成」查看圖表預覽</Text>
                    </Stack>
                  </Center>
                )}
              </Paper>

              {previewMode && (
                <Alert icon={<IconInfoCircle size={16} />} color="blue">
                  預覽使用模擬數據。實際報表將使用真實資料庫數據。
                </Alert>
              )}
            </Stack>
          </Stepper.Step>

          {/* 步驟 5: 保存報表 */}
          <Stepper.Step 
            label="保存報表" 
            description="命名並保存報表"
            icon={<IconDeviceFloppy size={18} />}
          >
            <Stack mt="md">
              <Title order={5}>保存報表</Title>
              
              <TextInput
                label="報表名稱"
                placeholder="輸入報表名稱"
                value={reportForm?.name || ''}
                onChange={(e) => {
                  const value = e?.currentTarget?.value || '';
                  setReportForm(prev => ({ ...(prev || initialReportForm), name: value }));
                }}
                required
              />

              <Textarea
                label="報表描述"
                placeholder="簡要描述這個報表的用途"
                value={reportForm?.description || ''}
                onChange={(e) => {
                  const value = e?.currentTarget?.value || '';
                  setReportForm(prev => ({ ...(prev || initialReportForm), description: value }));
                }}
                rows={3}
              />

              <Switch
                label="公開報表"
                description="允許其他使用者查看這個報表"
                checked={reportForm?.isPublic || false}
                onChange={(e) => {
                  const checked = e?.currentTarget?.checked || false;
                  setReportForm(prev => ({ ...(prev || initialReportForm), isPublic: checked }));
                }}
              />

              <Alert icon={<IconInfoCircle size={16} />}>
                報表將包含以下配置：
                <ul>
                  <li>資料來源：{mockDataTables.find(t => t.id === reportForm?.dataSource)?.displayName || '未選擇'}</li>
                  <li>維度：{reportForm?.dimensions?.join(', ') || '無'}</li>
                  <li>指標：{reportForm?.metrics?.join(', ') || '無'}</li>
                  <li>圖表類型：{chartTypes.find(c => c.value === reportForm?.chartType)?.label || '未選擇'}</li>
                </ul>
              </Alert>
            </Stack>
          </Stepper.Step>
        </Stepper>

        <Group justify="space-between" mt="xl">
          <Button 
            variant="default" 
            onClick={prevStep}
            disabled={active === 0}
          >
            上一步
          </Button>
          
          {active < 4 ? (
            <Button 
              onClick={nextStep}
              disabled={!reportForm || !isStepValid(active)}
            >
              下一步
            </Button>
          ) : (
            <Button 
              onClick={saveReport}
              disabled={!reportForm || !isStepValid(active)}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              保存報表
            </Button>
          )}
        </Group>
      </Paper>
      
      {/* 已保存報表模態窗口 */}
      <Modal 
        opened={showSavedReports} 
        onClose={() => setShowSavedReports(false)}
        title="我的報表"
        size="lg"
      >
        <Stack>
          {savedReports.length === 0 ? (
            <Center h={100}>
              <Text c="dimmed">還沒有保存的報表</Text>
            </Center>
          ) : (
            savedReports.map((report) => (
              <Paper key={report.id} p="md" withBorder>
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text fw={600} size="sm">{report.name}</Text>
                    <Text size="xs" c="dimmed" mt={4}>
                      {report.description}
                    </Text>
                    <Group mt="xs" gap="xs">
                      <Badge size="xs" variant="light">
                        {chartTypes.find(type => type.value === report.chartType)?.label || report.chartType}
                      </Badge>
                      <Badge size="xs" variant="outline">
                        {mockDataTables.find(table => table.id === report.dataSource)?.name || report.dataSource}
                      </Badge>
                      {report.isPublic && (
                        <Badge size="xs" color="green">公開</Badge>
                      )}
                    </Group>
                    <Text size="xs" c="dimmed" mt="xs">
                      建立時間：{new Date(report.createdAt).toLocaleString('zh-TW')}
                    </Text>
                  </div>
                  <Group gap="xs">
                    <Button 
                      size="xs" 
                      variant="light"
                      onClick={() => {
                        // 載入報表到編輯器
                        setReportForm(report);
                        setActive(0);
                        setShowSavedReports(false);
                        notifications.show({
                          title: '報表已載入',
                          message: `報表「${report.name}」已載入到編輯器`,
                          color: 'blue'
                        });
                      }}
                    >
                      編輯
                    </Button>
                    <ActionIcon 
                      size="sm" 
                      variant="light" 
                      color="red"
                      onClick={() => {
                        setSavedReports(prev => prev.filter(r => r.id !== report.id));
                        notifications.show({
                          title: '報表已刪除',
                          message: `報表「${report.name}」已刪除`,
                          color: 'red'
                        });
                      }}
                    >
                      <IconTrash size={12} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Paper>
            ))
          )}
        </Stack>
      </Modal>
    </Container>
  );
};

// 主要的分析管理組件
const Analysis = () => {
  const [activeTab, setActiveTab] = useState('tables');

  return (
    <Box p="lg">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={3} fw={600}>分析管理</Title>
          <Text size="sm" c="dimmed">資料表瀏覽、欄位管理和自定義計算功能</Text>
        </div>
        <Group>
          <Button variant="light" leftSection={<IconDownload size={16} />}>
            匯出設定
          </Button>
          <Button variant="light" leftSection={<IconFilter size={16} />}>
            篩選器
          </Button>
        </Group>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="tables" leftSection={<IconDatabase size={16} />}>
            資料表瀏覽
          </Tabs.Tab>
          <Tabs.Tab value="calculated" leftSection={<IconCalculator size={16} />}>
            計算欄位
          </Tabs.Tab>
          <Tabs.Tab value="analytics" leftSection={<IconChartLine size={16} />}>
            分析報表
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="tables">
          <DataTableBrowser />
        </Tabs.Panel>

        <Tabs.Panel value="calculated">
          <CalculatedFieldsManager />
        </Tabs.Panel>

        <Tabs.Panel value="analytics">
          <AnalyticsReportBuilder />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

// 排程列表展示組件
const ScheduleList = () => {
  const [schedules, setSchedules] = useState(mockScheduleTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 狀態顏色映射
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'blue';
      case 'success': return 'green';
      case 'failed': return 'red';
      case 'waiting': return 'yellow';
      case 'disabled': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return IconPlayerPlay;
      case 'success': return IconCheck;
      case 'failed': return IconX;
      case 'waiting': return IconClock;
      case 'disabled': return IconPlayerPause;
      default: return IconClock;
    }
  };

  // 系統圖標映射
  const getSystemIcon = (iconName) => {
    switch (iconName) {
      case 'IconDoor': return IconDoor;
      case 'IconBuilding': return IconBuilding;
      case 'IconCertificate': return IconCertificate;
      case 'IconFileText': return IconFileText;
      case 'IconTools': return IconTools;
      case 'IconDashboard': return IconDashboard;
      default: return IconSettingsAutomation;
    }
  };

  // 篩選邏輯
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 切換排程狀態
  const toggleScheduleStatus = (scheduleId) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { 
            ...schedule, 
            isActive: !schedule.isActive,
            status: !schedule.isActive ? 'waiting' : 'disabled'
          }
        : schedule
    ));
    
    const schedule = schedules.find(s => s.id === scheduleId);
    notifications.show({
      title: schedule?.isActive ? '排程已停用' : '排程已啟用',
      message: `${schedule?.name} ${schedule?.isActive ? '已停用' : '已啟用'}`,
      color: schedule?.isActive ? 'red' : 'green'
    });
  };

  // 手動執行排程
  const runScheduleNow = (scheduleId) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    
    // 更新狀態為執行中
    setSchedules(prev => prev.map(s => 
      s.id === scheduleId ? { ...s, status: 'running' } : s
    ));

    notifications.show({
      title: '排程執行中',
      message: `正在執行 ${schedule?.name}...`,
      color: 'blue',
      autoClose: 3000
    });

    // 模擬執行過程
    setTimeout(() => {
      setSchedules(prev => prev.map(s => 
        s.id === scheduleId ? { 
          ...s, 
          status: 'success',
          lastRunTime: new Date().toISOString(),
          lastRunStatus: 'success'
        } : s
      ));
      
      notifications.show({
        title: '執行完成',
        message: `${schedule?.name} 執行成功`,
        color: 'green'
      });
    }, 3000);
  };

  return (
    <Stack gap="lg">
      {/* 篩選工具列 */}
      <Group justify="space-between">
        <Group>
          <TextInput
            placeholder="搜尋排程名稱或描述..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ minWidth: 300 }}
          />
          <Select
            placeholder="狀態篩選"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: 'all', label: '全部狀態' },
              { value: 'running', label: '執行中' },
              { value: 'success', label: '成功' },
              { value: 'failed', label: '失敗' },
              { value: 'waiting', label: '等待中' },
              { value: 'disabled', label: '已停用' }
            ]}
          />
        </Group>
        <Group>
          <Badge variant="light" color="blue">
            共 {filteredSchedules.length} 個排程
          </Badge>
        </Group>
      </Group>

      {/* 排程卡片列表 */}
      <Grid>
        {filteredSchedules.map((schedule) => {
          const StatusIcon = getStatusIcon(schedule.status);
          const SystemIcon = getSystemIcon(mockSupportedSystems.find(s => s.id === schedule.systemType)?.icon);
          
          return (
            <Grid.Col span={12} key={schedule.id}>
              <Card withBorder p="md">
                <Group justify="space-between" align="flex-start">
                  <Group align="flex-start" gap="md">
                    <ThemeIcon 
                      size="lg" 
                      color={mockSupportedSystems.find(s => s.id === schedule.systemType)?.color || 'gray'}
                      variant="light"
                    >
                      <SystemIcon size={20} />
                    </ThemeIcon>
                    
                    <Stack gap="xs" style={{ flex: 1 }}>
                      <Group gap="sm">
                        <Title order={5}>{schedule.name}</Title>
                        <Badge 
                          size="sm" 
                          color={getStatusColor(schedule.status)}
                          leftSection={<StatusIcon size={12} />}
                        >
                          {schedule.status === 'running' ? '執行中' :
                           schedule.status === 'success' ? '成功' :
                           schedule.status === 'failed' ? '失敗' :
                           schedule.status === 'waiting' ? '等待中' : '已停用'}
                        </Badge>
                        <Badge size="sm" variant="outline">
                          {schedule.systemName}
                        </Badge>
                      </Group>
                      
                      <Text size="sm" c="dimmed">{schedule.description}</Text>
                      
                      <Group gap="md" mt="xs">
                        <Group gap="xs">
                          <IconClock size={14} color="gray" />
                          <Text size="xs" c="dimmed">{schedule.cronDisplay}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconHistory size={14} color="gray" />
                          <Text size="xs" c="dimmed">
                            成功率: {schedule.successRate}% ({schedule.totalRuns}次)
                          </Text>
                        </Group>
                        {schedule.nextRunTime && (
                          <Group gap="xs">
                            <IconCalendar size={14} color="gray" />
                            <Text size="xs" c="dimmed">
                              下次執行: {new Date(schedule.nextRunTime).toLocaleString('zh-TW')}
                            </Text>
                          </Group>
                        )}
                      </Group>
                    </Stack>
                  </Group>

                  <Group gap="xs">
                    <Tooltip label={schedule.isActive ? '停用排程' : '啟用排程'}>
                      <ActionIcon 
                        variant="light" 
                        color={schedule.isActive ? 'red' : 'green'}
                        onClick={() => toggleScheduleStatus(schedule.id)}
                      >
                        {schedule.isActive ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                      </ActionIcon>
                    </Tooltip>
                    
                    {schedule.isActive && (
                      <Tooltip label="立即執行">
                        <ActionIcon 
                          variant="light" 
                          color="blue"
                          onClick={() => runScheduleNow(schedule.id)}
                          disabled={schedule.status === 'running'}
                        >
                          <IconPlayerPlay size={16} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                    
                    <Tooltip label="編輯排程">
                      <ActionIcon variant="light" color="blue">
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip>
                    
                    <Tooltip label="查看歷程">
                      <ActionIcon variant="light" color="gray">
                        <IconHistory size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      {filteredSchedules.length === 0 && (
        <Paper p="xl" ta="center" withBorder>
          <IconSearch size={48} color="gray" />
          <Title order={4} c="gray" mt="md">沒有找到符合條件的排程</Title>
          <Text c="dimmed">請調整搜尋條件或篩選器</Text>
    </Paper>
      )}
    </Stack>
  );
};

// 排程建立組件
const ScheduleCreator = () => {
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    systemType: '',
    cronExpression: '0 0 * * *',
    cronDisplay: '每日 00:00',
    parameters: {}
  });

  // Cron 表達式預設選項
  const cronPresets = [
    { value: '0 0 * * *', label: '每日 00:00' },
    { value: '0 2 * * *', label: '每日 02:00' },
    { value: '0 6 * * *', label: '每日 06:00' },
    { value: '0 */2 * * *', label: '每2小時' },
    { value: '0 */4 * * *', label: '每4小時' },
    { value: '0 */6 * * *', label: '每6小時' },
    { value: '*/30 * * * *', label: '每30分鐘' },
    { value: '0 0 * * 1', label: '每週一 00:00' },
    { value: 'custom', label: '自定義' }
  ];

  const nextStep = () => {
    if (active < 3) setActive(active + 1);
  };

  const prevStep = () => {
    if (active > 0) setActive(active - 1);
  };

  const handleSubmit = () => {
    const newSchedule = {
      id: `schedule_${Date.now()}`,
      ...formData,
      isActive: true,
      status: 'waiting',
      totalRuns: 0,
      successRate: 0,
      createdBy: '當前使用者',
      createdAt: new Date().toISOString(),
      nextRunTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 明天
      lastRunTime: null,
      lastRunStatus: null
    };

    notifications.show({
      title: '排程建立成功',
      message: `排程「${formData.name}」已成功建立`,
      color: 'green'
    });

    // 重設表單
    setFormData({
      name: '',
      description: '',
      systemType: '',
      cronExpression: '0 0 * * *',
      cronDisplay: '每日 00:00',
      parameters: {}
    });
    setActive(0);
  };

  return (
    <Paper p="lg" withBorder>
      <Title order={4} mb="lg">建立新排程</Title>
      
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        {/* 步驟 1: 基本資訊 */}
        <Stepper.Step label="基本資訊" description="排程名稱和描述">
          <Stack mt="md">
            <TextInput
              label="排程名稱"
              placeholder="例如：EMS門禁資料同步"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.currentTarget.value }))}
            />
            <Textarea
              label="排程描述"
              placeholder="詳細說明這個排程的用途..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.currentTarget.value }))}
            />
          </Stack>
        </Stepper.Step>

        {/* 步驟 2: 選擇系統 */}
        <Stepper.Step label="選擇系統" description="選擇要整合的系統">
          <Stack mt="md">
            <Title order={5}>選擇整合系統</Title>
            <Grid>
              {mockSupportedSystems.map((system) => {
                const SystemIcon = getSystemIcon(system.icon);
                return (
                  <Grid.Col span={6} key={system.id}>
                    <Card
                      p="md"
                      withBorder
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: formData.systemType === system.id ? 'var(--mantine-color-blue-light)' : undefined
                      }}
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        systemType: system.id,
                        parameters: system.defaultParams 
                      }))}
                    >
                      <Group align="center" mb="xs">
                        <ThemeIcon size="md" color={system.color} variant="light">
                          <SystemIcon size={18} />
                        </ThemeIcon>
                        <Text fw={500} size="sm">{system.name}</Text>
                        <Badge size="xs" color={system.status === 'connected' ? 'green' : 'red'}>
                          {system.status === 'connected' ? '已連接' : '離線'}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed">{system.description}</Text>
                    </Card>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Stack>
        </Stepper.Step>

        {/* 步驟 3: 時間設定 */}
        <Stepper.Step label="時間設定" description="設定執行時間">
          <Stack mt="md">
            <Select
              label="執行頻率"
              data={cronPresets}
              value={formData.cronExpression}
              onChange={(value) => {
                const preset = cronPresets.find(p => p.value === value);
                setFormData(prev => ({ 
                  ...prev, 
                  cronExpression: value,
                  cronDisplay: preset?.label || '自定義'
                }));
              }}
            />
            
            {formData.cronExpression === 'custom' && (
              <TextInput
                label="自定義 Cron 表達式"
                placeholder="0 0 * * *"
                description="格式：分 時 日 月 週 (例如：0 2 * * * 表示每日凌晨2點)"
                value={formData.cronExpression}
                onChange={(e) => setFormData(prev => ({ ...prev, cronExpression: e.currentTarget.value }))}
              />
            )}
            
            <Alert icon={<IconInfoCircle size={16} />} color="blue">
              設定的執行時間：{formData.cronDisplay}
            </Alert>
          </Stack>
        </Stepper.Step>

        {/* 步驟 4: 確認建立 */}
        <Stepper.Step label="確認建立" description="確認排程設定">
          <Stack mt="md">
            <Title order={5}>排程設定確認</Title>
            <Paper p="md" withBorder bg="gray.0">
              <Stack gap="sm">
                <Group>
                  <Text fw={500}>排程名稱：</Text>
                  <Text>{formData.name}</Text>
                </Group>
                <Group>
                  <Text fw={500}>整合系統：</Text>
                  <Text>{mockSupportedSystems.find(s => s.id === formData.systemType)?.name}</Text>
                </Group>
                <Group>
                  <Text fw={500}>執行頻率：</Text>
                  <Text>{formData.cronDisplay}</Text>
                </Group>
                <div>
                  <Text fw={500} mb="xs">描述：</Text>
                  <Text size="sm" c="dimmed">{formData.description}</Text>
                </div>
              </Stack>
            </Paper>
          </Stack>
        </Stepper.Step>
      </Stepper>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          上一步
        </Button>
        
        {active < 3 ? (
          <Button 
            onClick={nextStep}
            disabled={
              (active === 0 && !formData.name) ||
              (active === 1 && !formData.systemType) ||
              (active === 2 && !formData.cronExpression)
            }
          >
            下一步
          </Button>
        ) : (
          <Button onClick={handleSubmit} leftSection={<IconDeviceFloppy size={16} />}>
            建立排程
          </Button>
        )}
      </Group>
    </Paper>
  );

  function getSystemIcon(iconName) {
    switch (iconName) {
      case 'IconDoor': return IconDoor;
      case 'IconBuilding': return IconBuilding;
      case 'IconCertificate': return IconCertificate;
      case 'IconFileText': return IconFileText;
      case 'IconTools': return IconTools;
      case 'IconDashboard': return IconDashboard;
      default: return IconSettingsAutomation;
    }
  }
};

// 執行歷程組件
const ExecutionHistory = () => {
  const [history, setHistory] = useState(mockExecutionHistory);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'green';
      case 'failed': return 'red';
      case 'running': return 'blue';
      default: return 'gray';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`;
  };

  const viewDetails = (execution) => {
    setSelectedExecution(execution);
    setDrawerOpened(true);
  };

  return (
    <>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={4}>執行歷程</Title>
          <Badge variant="light" color="blue">
            最近 {history.length} 次執行
          </Badge>
        </Group>

        <Timeline active={history.length} bulletSize={24} lineWidth={2}>
          {history.map((execution, index) => {
            const StatusIcon = execution.status === 'success' ? IconCheck : 
                              execution.status === 'failed' ? IconX : IconClock;
            
            return (
              <Timeline.Item
                key={execution.id}
                bullet={<StatusIcon size={12} />}
                title={execution.scheduleName}
                color={getStatusColor(execution.status)}
              >
                <Card withBorder p="sm" mt="xs">
                  <Group justify="space-between" align="flex-start">
                    <Stack gap="xs" style={{ flex: 1 }}>
                      <Group gap="md">
                        <Badge size="sm" color={getStatusColor(execution.status)}>
                          {execution.status === 'success' ? '成功' : 
                           execution.status === 'failed' ? '失敗' : '執行中'}
                        </Badge>
                        <Text size="sm" c="dimmed">
                          {new Date(execution.startTime).toLocaleString('zh-TW')}
                        </Text>
                        <Text size="sm" c="dimmed">
                          耗時: {formatDuration(execution.duration)}
                        </Text>
                      </Group>
                      
                      <Group gap="md">
                        <Text size="xs" c="dimmed">
                          處理記錄: {execution.recordsProcessed.toLocaleString()} 筆
                        </Text>
                        <Text size="xs" c="dimmed">
                          吞吐量: {execution.metrics.throughput} 記錄/秒
                        </Text>
                        <Text size="xs" c="dimmed">
                          資料量: {execution.metrics.dataSize}
                        </Text>
                      </Group>
                      
                      {execution.errorMessage && (
                        <Alert icon={<IconAlertTriangle size={14} />} color="red" p="xs">
                          <Text size="xs">{execution.errorMessage}</Text>
                        </Alert>
                      )}
                    </Stack>
                    
                    <Button 
                      size="xs" 
                      variant="light"
                      onClick={() => viewDetails(execution)}
                    >
                      查看詳情
                    </Button>
                  </Group>
                </Card>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Stack>

      {/* 詳情抽屜 */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={`執行詳情 - ${selectedExecution?.scheduleName}`}
        position="right"
        size="lg"
      >
        {selectedExecution && (
          <Stack gap="lg">
            {/* 基本資訊 */}
            <Paper p="md" withBorder>
              <Title order={5} mb="md">基本資訊</Title>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={500}>執行狀態</Text>
                  <Badge color={getStatusColor(selectedExecution.status)}>
                    {selectedExecution.status === 'success' ? '成功' : 
                     selectedExecution.status === 'failed' ? '失敗' : '執行中'}
                  </Badge>
                </Group>
                <Group justify="space-between">
                  <Text fw={500}>開始時間</Text>
                  <Text>{new Date(selectedExecution.startTime).toLocaleString('zh-TW')}</Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={500}>結束時間</Text>
                  <Text>{new Date(selectedExecution.endTime).toLocaleString('zh-TW')}</Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={500}>執行時長</Text>
                  <Text>{formatDuration(selectedExecution.duration)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text fw={500}>處理記錄</Text>
                  <Text>{selectedExecution.recordsProcessed.toLocaleString()} 筆</Text>
                </Group>
              </Stack>
            </Paper>

            {/* 效能指標 */}
            <Paper p="md" withBorder>
              <Title order={5} mb="md">效能指標</Title>
              <Grid>
                <Grid.Col span={6}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">吞吐量</Text>
                    <Text size="lg" fw={600}>{selectedExecution.metrics.throughput}</Text>
                    <Text size="xs" c="dimmed">記錄/秒</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">API 調用</Text>
                    <Text size="lg" fw={600}>{selectedExecution.metrics.apiCalls}</Text>
                    <Text size="xs" c="dimmed">次</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">錯誤率</Text>
                    <Text size="lg" fw={600} c={selectedExecution.metrics.errorRate > 0 ? 'red' : 'green'}>
                      {selectedExecution.metrics.errorRate}%
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">資料量</Text>
                    <Text size="lg" fw={600}>{selectedExecution.metrics.dataSize}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* 執行日誌 */}
            <Paper p="md" withBorder>
              <Title order={5} mb="md">執行日誌</Title>
              <ScrollArea h={300}>
                <Stack gap="xs">
                  {selectedExecution.logs.map((log, index) => (
                    <Group key={index} gap="sm" align="flex-start">
                      <Text size="xs" c="dimmed" style={{ minWidth: 80 }}>
                        {new Date(log.timestamp).toLocaleTimeString('zh-TW')}
                      </Text>
                      <Badge size="xs" color={getLogLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <Text size="xs" style={{ flex: 1 }}>{log.message}</Text>
                    </Group>
                  ))}
                </Stack>
              </ScrollArea>
            </Paper>
          </Stack>
        )}
      </Drawer>
    </>
  );
};

// 主要的排程管理組件
const Scheduling = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <Box p="lg">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={3} fw={600}>資料排程管理</Title>
          <Text size="sm" c="dimmed">系統整合作業的自動化排程與執行監控</Text>
        </div>
        <Group>
          <Button variant="light" leftSection={<IconActivity size={16} />}>
            系統狀態
          </Button>
          <Button variant="light" leftSection={<IconBell size={16} />}>
            通知設定
          </Button>
        </Group>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="list" leftSection={<IconClipboardList size={16} />}>
            排程列表
          </Tabs.Tab>
          <Tabs.Tab value="create" leftSection={<IconPlus size={16} />}>
            建立排程
          </Tabs.Tab>
          <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>
            執行歷程
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="list">
          <ScheduleList />
        </Tabs.Panel>

        <Tabs.Panel value="create">
          <ScheduleCreator />
        </Tabs.Panel>

        <Tabs.Panel value="history">
          <ExecutionHistory />
        </Tabs.Panel>
      </Tabs>
  </Box>
);
};

const AiQa = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">AI問答</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconMessageQuestion size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">AI問答功能開發中</Title>
      <Text c="gray.5">智能問答、知識庫查詢等功能即將推出</Text>
    </Paper>
  </Box>
);

const PowerBi = () => (
  <Box p="lg">
    <Title order={3} fw={600} mb="lg">報表連結(PowerBI)</Title>
    <Paper p="lg" ta="center" mih={400}>
      <IconTable size={64} color="#9ca3af" />
      <Title order={4} c="gray.5" mt="md">PowerBI整合功能開發中</Title>
      <Text c="gray.5">報表嵌入、儀表板整合等功能即將推出</Text>
    </Paper>
  </Box>
);

const DataAnalytics = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Analysis />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/ai-qa" element={<AiQa />} />
        <Route path="/powerbi" element={<PowerBi />} />
      </Routes>
    </Box>
  );
};

export default DataAnalytics;