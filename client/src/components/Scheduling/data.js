// 模擬排程管理資料
export const mockSupportedSystems = [
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

export const mockScheduleTasks = [
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

export const mockExecutionHistory = [
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