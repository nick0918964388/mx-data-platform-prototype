export const mockProjects = [
  { id: 'proj-001', name: 'AP5建廠工程', completion: 65, estimatedCompletion: 70 },
  { id: 'proj-002', name: 'AP6建廠工程', completion: 42, estimatedCompletion: 45 },
  { id: 'proj-003', name: 'AP5設備安裝專案', completion: 78, estimatedCompletion: 80 },
  { id: 'proj-004', name: 'AP6機電系統整合', completion: 55, estimatedCompletion: 60 },
  { id: 'proj-005', name: 'AP5廠區基礎建設', completion: 90, estimatedCompletion: 92 },
];

export const mockVendors = [
  { id: 'vendor-a', name: 'AP5機電廠商', manHours: 285, plantArea: 'AP5廠區' },
  { id: 'vendor-b', name: 'AP6土木承包商', manHours: 342, plantArea: 'AP6廠區' },
  { id: 'vendor-c', name: 'AP5材料供應商', manHours: 156, plantArea: 'AP5廠區' },
  { id: 'vendor-d', name: 'AP6設備安裝商', manHours: 198, plantArea: 'AP6廠區' },
  { id: 'vendor-e', name: 'AP5維護服務商', manHours: 225, plantArea: 'AP5廠區' },
];

// 模擬使用者資料
export const mockUsers = [
  { id: 'user-001', name: '張經理', email: 'zhang@company.com', phone: '0912-345-678', department: '專案部', role: '專案經理', enabled: true },
  { id: 'user-002', name: '李工程師', email: 'li@company.com', phone: '0923-456-789', department: '技術部', role: '資深工程師', enabled: true },
  { id: 'user-003', name: '王主管', email: 'wang@company.com', phone: '0934-567-890', department: '營運部', role: '部門主管', enabled: true },
  { id: 'user-004', name: '陳技師', email: 'chen@company.com', phone: '0945-678-901', department: '維護部', role: '技師', enabled: true },
  { id: 'user-005', name: '劉副理', email: 'liu@company.com', phone: '0956-789-012', department: '品管部', role: '副理', enabled: true },
  { id: 'user-006', name: '黃助理', email: 'huang@company.com', phone: '0967-890-123', department: '行政部', role: '行政助理', enabled: true },
];

// 模擬通知群組資料
export const mockNotificationGroups = [
  {
    id: 'group-001',
    name: 'AP5/AP6建廠專案小組',
    description: '負責AP5及AP6廠區建廠專案進度監控與管理',
    members: [
      { id: 'user-001', name: '王工程師', email: 'wang.engineer@company.com', phone: '0912-345-678', role: '專案經理' },
      { id: 'user-002', name: '李工程師', email: 'li.engineer@company.com', phone: '0923-456-789', role: '資深工程師' },
    ],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    enabled: true,
    plantAreas: ['AP5廠區', 'AP6廠區']
  },
  {
    id: 'group-002',
    name: 'AP5/AP6廠商協調小組',
    description: 'AP5及AP6廠區廠商管理與工時監控通知群組',
    members: [
      { id: 'user-004', name: '陳主管', email: 'chen.manager@company.com', phone: '0945-678-901', role: '廠商管理主管' },
      { id: 'user-003', name: '張協調員', email: 'zhang.coordinator@company.com', phone: '0934-567-890', role: '廠商協調員' },
    ],
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-25T14:20:00Z',
    enabled: true,
    plantAreas: ['AP5廠區', 'AP6廠區']
  },
  {
    id: 'group-003',
    name: 'AP5廠區品質管制組',
    description: 'AP5廠區建廠品質檢查與驗收通知',
    members: [
      { id: 'user-005', name: '劉品管', email: 'liu.qa@company.com', phone: '0956-789-012', role: '品管副理' },
      { id: 'user-006', name: '黃檢驗員', email: 'huang.inspector@company.com', phone: '0967-890-123', role: '品質檢驗員' },
    ],
    createdAt: '2024-02-01T11:30:00Z',
    updatedAt: '2024-02-01T11:30:00Z',
    enabled: true,
    plantAreas: ['AP5廠區']
  },
];

export const mockRules = [
  {
    id: 'rule-1',
    name: 'AP5建廠工程進度警示',
    targetType: 'project',
    targetId: 'proj-001',
    metric: 'completion',
    condition: '<',
    threshold: 5, // 意思是 completion < (estimatedCompletion - 5)
    enabled: true,
    notificationGroups: ['group-001'],
    plantArea: 'AP5廠區',
    description: '監控AP5建廠工程進度，當實際完成度低於預期5%時發出警示'
  },
  {
    id: 'rule-2',
    name: 'AP6土木承包商工時監控',
    targetType: 'vendor',
    targetId: 'vendor-b',
    metric: 'manHours',
    condition: '<',
    threshold: 300,
    enabled: true,
    notificationGroups: ['group-001', 'group-002'],
    plantArea: 'AP6廠區',
    description: '監控AP6廠區土木承包商投入工時，低於300小時時通知相關人員'
  },
  {
    id: 'rule-3',
    name: 'AP6建廠工程完工檢查',
    targetType: 'project',
    targetId: 'proj-002',
    metric: 'completion',
    condition: '>=',
    threshold: 40,
    enabled: true,
    notificationGroups: ['group-001'],
    plantArea: 'AP6廠區',
    description: 'AP6建廠工程達到40%完成度時進行階段性檢查通知'
  },
  {
    id: 'rule-4',
    name: 'AP5機電廠商工時預警',
    targetType: 'vendor',
    targetId: 'vendor-a',
    metric: 'manHours',
    condition: '>',
    threshold: 280,
    enabled: true,
    notificationGroups: ['group-002'],
    plantArea: 'AP5廠區',
    description: 'AP5機電廠商工時超過280小時時發出成本預警'
  },
  {
    id: 'rule-5',
    name: 'AP5廠區基礎建設完工通知',
    targetType: 'project',
    targetId: 'proj-005',
    metric: 'completion',
    condition: '>=',
    threshold: 95,
    enabled: false,
    notificationGroups: ['group-001', 'group-003'],
    plantArea: 'AP5廠區',
    description: 'AP5廠區基礎建設達到95%完成度時通知驗收準備'
  },
  {
    id: 'rule-6',
    name: 'AP6設備安裝商人力配置',
    targetType: 'vendor',
    targetId: 'vendor-d',
    metric: 'manHours',
    condition: '<',
    threshold: 200,
    enabled: true,
    notificationGroups: ['group-002'],
    plantArea: 'AP6廠區',
    description: '監控AP6設備安裝商人力配置，工時不足200小時時發出人力調配通知'
  }
]; 