const express = require('express');
const router = express.Router();

// 模擬監控警報資料
const mockAlerts = [
  {
    id: 1,
    type: '設備異常',
    level: '緊急',
    message: 'AP5廠區壓縮機溫度過高',
    location: 'AP5廠區-A棟-2樓',
    timestamp: '2024-12-05T10:30:00Z',
    status: '未處理',
    assignedTo: null
  },
  {
    id: 2,
    type: '安全警報',
    level: '警告',
    message: '施工區域未佩戴安全帽',
    location: 'AP6建廠現場',
    timestamp: '2024-12-05T09:15:00Z',
    status: '處理中',
    assignedTo: '李工程師'
  },
  {
    id: 3,
    type: '系統通知',
    level: '資訊',
    message: '定期維護作業完成',
    location: 'AP3廠區',
    timestamp: '2024-12-05T08:00:00Z',
    status: '已完成',
    assignedTo: '陳技師'
  },
  {
    id: 4,
    type: '環境監測',
    level: '警告',
    message: '廠區空氣品質指數偏高',
    location: 'AP4廠區',
    timestamp: '2024-12-05T07:45:00Z',
    status: '未處理',
    assignedTo: null
  }
];

// 模擬監控數據
const mockMonitoringData = {
  equipment: [
    { id: 1, name: '壓縮機A1', status: '正常', temperature: 65, pressure: 8.5 },
    { id: 2, name: '壓縮機A2', status: '警告', temperature: 85, pressure: 9.2 },
    { id: 3, name: '冷卻系統B1', status: '正常', temperature: 45, pressure: 6.8 },
    { id: 4, name: '發電機C1', status: '維護', temperature: 0, pressure: 0 }
  ],
  environmental: {
    temperature: 26.5,
    humidity: 65,
    airQuality: 78,
    noiseLevel: 62
  },
  safety: {
    totalWorkers: 156,
    safetyIncidents: 2,
    complianceRate: 95.5,
    lastInspection: '2024-12-01'
  }
};

// 取得所有警報
router.get('/alerts', (req, res) => {
  const { level, status, limit } = req.query;
  let filteredAlerts = [...mockAlerts];
  
  if (level) {
    filteredAlerts = filteredAlerts.filter(alert => alert.level === level);
  }
  
  if (status) {
    filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
  }
  
  if (limit) {
    filteredAlerts = filteredAlerts.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    data: filteredAlerts,
    total: filteredAlerts.length
  });
});

// 取得特定警報
router.get('/alerts/:id', (req, res) => {
  const alert = mockAlerts.find(a => a.id === parseInt(req.params.id));
  
  if (alert) {
    res.json({
      success: true,
      data: alert
    });
  } else {
    res.status(404).json({
      success: false,
      message: '警報不存在'
    });
  }
});

// 更新警報狀態
router.put('/alerts/:id', (req, res) => {
  const alertIndex = mockAlerts.findIndex(a => a.id === parseInt(req.params.id));
  
  if (alertIndex !== -1) {
    mockAlerts[alertIndex] = {
      ...mockAlerts[alertIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: mockAlerts[alertIndex],
      message: '警報更新成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '警報不存在'
    });
  }
});

// 創建新警報
router.post('/alerts', (req, res) => {
  const newAlert = {
    id: mockAlerts.length + 1,
    ...req.body,
    timestamp: new Date().toISOString(),
    status: '未處理'
  };
  
  mockAlerts.push(newAlert);
  
  res.status(201).json({
    success: true,
    data: newAlert,
    message: '警報創建成功'
  });
});

// 取得設備監控數據
router.get('/equipment', (req, res) => {
  res.json({
    success: true,
    data: mockMonitoringData.equipment
  });
});

// 取得環境監控數據
router.get('/environmental', (req, res) => {
  res.json({
    success: true,
    data: mockMonitoringData.environmental
  });
});

// 取得安全監控數據
router.get('/safety', (req, res) => {
  res.json({
    success: true,
    data: mockMonitoringData.safety
  });
});

// 取得監控統計
router.get('/stats', (req, res) => {
  const stats = {
    totalAlerts: mockAlerts.length,
    unhandledAlerts: mockAlerts.filter(a => a.status === '未處理').length,
    criticalAlerts: mockAlerts.filter(a => a.level === '緊急').length,
    warningAlerts: mockAlerts.filter(a => a.level === '警告').length,
    equipmentStatus: {
      normal: mockMonitoringData.equipment.filter(e => e.status === '正常').length,
      warning: mockMonitoringData.equipment.filter(e => e.status === '警告').length,
      maintenance: mockMonitoringData.equipment.filter(e => e.status === '維護').length
    }
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// 設定警報通知
router.post('/notifications/settings', (req, res) => {
  res.json({
    success: true,
    message: '通知設定已更新',
    data: req.body
  });
});

module.exports = router; 