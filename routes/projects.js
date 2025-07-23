const express = require('express');
const router = express.Router();

// 模擬專案資料
const mockProjects = [
  {
    id: 1,
    name: 'AP5建廠工程',
    description: 'AP5廠區新建工程專案',
    status: '進行中',
    progress: 65,
    manager: '王工程師',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    budget: 50000000,
    team: ['王工程師', '李技師', '張主任']
  },
  {
    id: 2,
    name: 'AP6建廠工程',
    description: 'AP6廠區擴建工程專案',
    status: '進行中',
    progress: 42,
    manager: '李工程師',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    budget: 35000000,
    team: ['李工程師', '陳技師', '林主任']
  },
  {
    id: 3,
    name: 'AP3設備更新',
    description: 'AP3廠區設備汰換更新',
    status: '已完成',
    progress: 100,
    manager: '陳工程師',
    startDate: '2023-10-01',
    endDate: '2024-03-31',
    budget: 25000000,
    team: ['陳工程師', '黃技師']
  }
];

// 取得所有專案
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockProjects
  });
});

// 取得特定專案
router.get('/:id', (req, res) => {
  const project = mockProjects.find(p => p.id === parseInt(req.params.id));
  
  if (project) {
    res.json({
      success: true,
      data: project
    });
  } else {
    res.status(404).json({
      success: false,
      message: '專案不存在'
    });
  }
});

// 創建新專案
router.post('/', (req, res) => {
  const newProject = {
    id: mockProjects.length + 1,
    ...req.body,
    status: '規劃中',
    progress: 0
  };
  
  mockProjects.push(newProject);
  
  res.status(201).json({
    success: true,
    data: newProject,
    message: '專案創建成功'
  });
});

// 更新專案
router.put('/:id', (req, res) => {
  const projectIndex = mockProjects.findIndex(p => p.id === parseInt(req.params.id));
  
  if (projectIndex !== -1) {
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...req.body
    };
    
    res.json({
      success: true,
      data: mockProjects[projectIndex],
      message: '專案更新成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '專案不存在'
    });
  }
});

// 刪除專案
router.delete('/:id', (req, res) => {
  const projectIndex = mockProjects.findIndex(p => p.id === parseInt(req.params.id));
  
  if (projectIndex !== -1) {
    mockProjects.splice(projectIndex, 1);
    res.json({
      success: true,
      message: '專案刪除成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '專案不存在'
    });
  }
});

module.exports = router; 