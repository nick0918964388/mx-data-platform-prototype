const express = require('express');
const router = express.Router();

// 模擬施工現場資料
const mockSites = [
  {
    id: 1,
    name: 'AP5建廠現場',
    location: 'AP5廠區',
    status: '施工中',
    supervisor: '王工程師',
    workers: 45,
    progress: 65,
    safetyScore: 95,
    startDate: '2024-01-15',
    expectedEnd: '2024-12-31'
  },
  {
    id: 2,
    name: 'AP6擴建現場',
    location: 'AP6廠區',
    status: '施工中',
    supervisor: '李工程師',
    workers: 32,
    progress: 42,
    safetyScore: 88,
    startDate: '2024-03-01',
    expectedEnd: '2025-02-28'
  },
  {
    id: 3,
    name: 'AP3設備安裝',
    location: 'AP3廠區',
    status: '暫停',
    supervisor: '陳工程師',
    workers: 0,
    progress: 25,
    safetyScore: 92,
    startDate: '2024-10-01',
    expectedEnd: '2024-12-15'
  }
];

// 模擬工單資料
const mockWorkOrders = [
  {
    id: 1,
    title: '鋼構安裝作業',
    siteId: 1,
    priority: '高',
    status: '進行中',
    assignee: '張技師',
    dueDate: '2024-12-10',
    description: '主要鋼構架設與焊接作業'
  },
  {
    id: 2,
    title: '電力系統配置',
    siteId: 1,
    priority: '中',
    status: '待處理',
    assignee: '林電工',
    dueDate: '2024-12-15',
    description: '廠區電力系統配線與測試'
  },
  {
    id: 3,
    title: '混凝土澆置',
    siteId: 2,
    priority: '高',
    status: '已完成',
    assignee: '黃工班',
    dueDate: '2024-11-30',
    description: '基礎混凝土澆置作業'
  }
];

// 取得所有施工現場
router.get('/sites', (req, res) => {
  res.json({
    success: true,
    data: mockSites
  });
});

// 取得特定施工現場
router.get('/sites/:id', (req, res) => {
  const site = mockSites.find(s => s.id === parseInt(req.params.id));
  
  if (site) {
    res.json({
      success: true,
      data: site
    });
  } else {
    res.status(404).json({
      success: false,
      message: '施工現場不存在'
    });
  }
});

// 取得所有工單
router.get('/workorders', (req, res) => {
  res.json({
    success: true,
    data: mockWorkOrders
  });
});

// 取得特定現場的工單
router.get('/sites/:id/workorders', (req, res) => {
  const siteId = parseInt(req.params.id);
  const workOrders = mockWorkOrders.filter(wo => wo.siteId === siteId);
  
  res.json({
    success: true,
    data: workOrders
  });
});

// 創建新工單
router.post('/workorders', (req, res) => {
  const newWorkOrder = {
    id: mockWorkOrders.length + 1,
    ...req.body,
    status: '待處理'
  };
  
  mockWorkOrders.push(newWorkOrder);
  
  res.status(201).json({
    success: true,
    data: newWorkOrder,
    message: '工單創建成功'
  });
});

// 更新工單狀態
router.put('/workorders/:id', (req, res) => {
  const workOrderIndex = mockWorkOrders.findIndex(wo => wo.id === parseInt(req.params.id));
  
  if (workOrderIndex !== -1) {
    mockWorkOrders[workOrderIndex] = {
      ...mockWorkOrders[workOrderIndex],
      ...req.body
    };
    
    res.json({
      success: true,
      data: mockWorkOrders[workOrderIndex],
      message: '工單更新成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '工單不存在'
    });
  }
});

// 取得現場安全統計
router.get('/safety-stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalSites: mockSites.length,
      activeSites: mockSites.filter(s => s.status === '施工中').length,
      averageSafetyScore: mockSites.reduce((sum, site) => sum + site.safetyScore, 0) / mockSites.length,
      totalWorkers: mockSites.reduce((sum, site) => sum + site.workers, 0),
      pendingWorkOrders: mockWorkOrders.filter(wo => wo.status === '待處理').length
    }
  });
});

module.exports = router; 