const express = require('express');
const router = express.Router();

// 模擬系統用戶資料
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    name: '系統管理員',
    email: 'admin@mx.com',
    role: 'admin',
    department: '資訊部',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-05T08:30:00Z'
  },
  {
    id: 2,
    username: 'manager1',
    name: '王工程師',
    email: 'wang@mx.com',
    role: 'manager',
    department: '工程部',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-12-05T07:45:00Z'
  },
  {
    id: 3,
    username: 'engineer1',
    name: '李技師',
    email: 'li@mx.com',
    role: 'engineer',
    department: '施工部',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-12-04T18:20:00Z'
  },
  {
    id: 4,
    username: 'operator1',
    name: '陳操作員',
    email: 'chen@mx.com',
    role: 'operator',
    department: '生產部',
    status: 'inactive',
    createdAt: '2024-03-01T00:00:00Z',
    lastLogin: '2024-11-28T16:30:00Z'
  }
];

// 模擬系統設定
const mockSystemSettings = {
  general: {
    siteName: 'MX 資料分析平台',
    timezone: 'Asia/Taipei',
    language: 'zh-TW',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h'
  },
  security: {
    passwordMinLength: 8,
    passwordComplexity: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    alertThreshold: 'medium'
  },
  backup: {
    autoBackup: true,
    backupInterval: 'daily',
    backupRetention: 30,
    lastBackup: '2024-12-05T02:00:00Z'
  }
};

// 模擬系統日誌
const mockSystemLogs = [
  {
    id: 1,
    timestamp: '2024-12-05T10:30:00Z',
    level: 'INFO',
    module: 'AUTH',
    message: '用戶 admin 登入成功',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: 2,
    timestamp: '2024-12-05T10:25:00Z',
    level: 'WARN',
    module: 'SYSTEM',
    message: '磁碟空間使用率達到 80%',
    ip: 'localhost',
    userAgent: 'System'
  },
  {
    id: 3,
    timestamp: '2024-12-05T10:20:00Z',
    level: 'ERROR',
    module: 'DATABASE',
    message: '資料庫連線逾時',
    ip: 'localhost',
    userAgent: 'System'
  }
];

// 用戶管理 API

// 取得所有用戶
router.get('/users', (req, res) => {
  const { role, status, limit } = req.query;
  let filteredUsers = [...mockUsers];
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status === status);
  }
  
  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    data: filteredUsers.map(user => ({
      ...user,
      password: undefined // 不返回密碼
    })),
    total: filteredUsers.length
  });
});

// 取得特定用戶
router.get('/users/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === parseInt(req.params.id));
  
  if (user) {
    res.json({
      success: true,
      data: {
        ...user,
        password: undefined
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: '用戶不存在'
    });
  }
});

// 創建新用戶
router.post('/users', (req, res) => {
  const newUser = {
    id: mockUsers.length + 1,
    ...req.body,
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  
  mockUsers.push(newUser);
  
  res.status(201).json({
    success: true,
    data: {
      ...newUser,
      password: undefined
    },
    message: '用戶創建成功'
  });
});

// 更新用戶
router.put('/users/:id', (req, res) => {
  const userIndex = mockUsers.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        ...mockUsers[userIndex],
        password: undefined
      },
      message: '用戶更新成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '用戶不存在'
    });
  }
});

// 刪除用戶
router.delete('/users/:id', (req, res) => {
  const userIndex = mockUsers.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
    res.json({
      success: true,
      message: '用戶刪除成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '用戶不存在'
    });
  }
});

// 系統設定 API

// 取得系統設定
router.get('/settings', (req, res) => {
  const { section } = req.query;
  
  if (section && mockSystemSettings[section]) {
    res.json({
      success: true,
      data: mockSystemSettings[section]
    });
  } else {
    res.json({
      success: true,
      data: mockSystemSettings
    });
  }
});

// 更新系統設定
router.put('/settings/:section', (req, res) => {
  const { section } = req.params;
  
  if (mockSystemSettings[section]) {
    mockSystemSettings[section] = {
      ...mockSystemSettings[section],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: mockSystemSettings[section],
      message: '設定更新成功'
    });
  } else {
    res.status(404).json({
      success: false,
      message: '設定區段不存在'
    });
  }
});

// 系統日誌 API

// 取得系統日誌
router.get('/logs', (req, res) => {
  const { level, module, limit } = req.query;
  let filteredLogs = [...mockSystemLogs];
  
  if (level) {
    filteredLogs = filteredLogs.filter(log => log.level === level);
  }
  
  if (module) {
    filteredLogs = filteredLogs.filter(log => log.module === module);
  }
  
  if (limit) {
    filteredLogs = filteredLogs.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    data: filteredLogs,
    total: filteredLogs.length
  });
});

// 系統狀態 API

// 取得系統狀態
router.get('/status', (req, res) => {
  const systemStatus = {
    server: {
      status: 'online',
      uptime: '15天 8小時 32分鐘',
      cpu: 35.2,
      memory: 68.4,
      disk: 78.9
    },
    database: {
      status: 'online',
      connections: 12,
      responseTime: 45,
      lastBackup: '2024-12-05T02:00:00Z'
    },
    services: {
      authentication: 'online',
      monitoring: 'online',
      analytics: 'online',
      notifications: 'degraded'
    },
    statistics: {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      todayLogins: 28,
      totalRequests: 15420
    }
  };
  
  res.json({
    success: true,
    data: systemStatus
  });
});

// 系統維護 API

// 執行系統維護
router.post('/maintenance', (req, res) => {
  const { type, description } = req.body;
  
  res.json({
    success: true,
    data: {
      maintenanceId: `MAINT_${Date.now()}`,
      type: type,
      description: description,
      status: '進行中',
      startTime: new Date().toISOString(),
      estimatedDuration: '30分鐘'
    },
    message: '系統維護已開始'
  });
});

// 資料庫備份
router.post('/backup', (req, res) => {
  res.json({
    success: true,
    data: {
      backupId: `BACKUP_${Date.now()}`,
      status: '進行中',
      startTime: new Date().toISOString(),
      estimatedSize: '250MB'
    },
    message: '資料庫備份已開始'
  });
});

// 清理系統日誌
router.delete('/logs/cleanup', (req, res) => {
  const { olderThan } = req.query;
  
  res.json({
    success: true,
    data: {
      deletedLogs: 1250,
      olderThan: olderThan || '30天',
      freedSpace: '15MB'
    },
    message: '日誌清理完成'
  });
});

module.exports = router; 