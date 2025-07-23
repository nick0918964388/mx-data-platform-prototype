export const mockProjects = [
  { id: 'proj-001', name: '平台功能開發專案', completion: 85, estimatedCompletion: 90 },
  { id: 'proj-002', name: '智慧工廠建置案', completion: 60, estimatedCompletion: 62 },
  { id: 'proj-003', name: '辦公室網路升級', completion: 98, estimatedCompletion: 98 },
];

export const mockVendors = [
  { id: 'vendor-a', name: 'A供應商', manHours: 120 },
  { id: 'vendor-b', name: 'B協力廠商', manHours: 85 },
  { id: 'vendor-c', name: 'C顧問公司', manHours: 200 },
];

export const mockRules = [
  {
    id: 'rule-1',
    name: '專案進度落後警示',
    targetType: 'project',
    targetId: 'proj-001',
    metric: 'completion',
    condition: '<',
    threshold: 5, // 意思是 completion < (estimatedCompletion - 5)
    enabled: true,
  },
  {
    id: 'rule-2',
    name: '廠商投入工時不足',
    targetType: 'vendor',
    targetId: 'vendor-b',
    metric: 'manHours',
    condition: '<',
    threshold: 100,
    enabled: true,
  },
  {
    id: 'rule-3',
    name: '網路升級專案監控',
    targetType: 'project',
    targetId: 'proj-003',
    metric: 'completion',
    condition: '<',
    threshold: 100, // 意思是 completion < 100
    enabled: false,
  },
]; 