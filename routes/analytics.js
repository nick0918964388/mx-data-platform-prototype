const express = require('express');
const router = express.Router();

// 模擬分析數據
const mockAnalyticsData = {
  dashboard: {
    summary: {
      totalProjects: 12,
      activeSites: 8,
      pendingTasks: 23,
      completedTasks: 156,
      totalWorkers: 1206,
      safetyScore: 92.5
    },
    trends: {
      workerTrend: [
        { date: '2024-11-01', workers: 980, target: 1000 },
        { date: '2024-11-05', workers: 1050, target: 1000 },
        { date: '2024-11-10', workers: 1120, target: 1100 },
        { date: '2024-11-15', workers: 1180, target: 1150 },
        { date: '2024-11-20', workers: 1150, target: 1200 },
        { date: '2024-11-25', workers: 1250, target: 1200 },
        { date: '2024-11-30', workers: 1320, target: 1300 }
      ],
      vendorEntry: [
        { date: '2024-11-01', 機電廠商: 12, 土木廠商: 8, 材料供應商: 15 },
        { date: '2024-11-05', 機電廠商: 15, 土木廠商: 12, 材料供應商: 18 },
        { date: '2024-11-10', 機電廠商: 18, 土木廠商: 15, 材料供應商: 22 },
        { date: '2024-11-15', 機電廠商: 22, 土木廠商: 18, 材料供應商: 25 },
        { date: '2024-11-20', 機電廠商: 20, 土木廠商: 16, 材料供應商: 20 },
        { date: '2024-11-25', 機電廠商: 25, 土木廠商: 20, 材料供應商: 28 },
        { date: '2024-11-30', 機電廠商: 28, 土木廠商: 22, 材料供應商: 30 }
      ],
      plantWorkers: [
        { plant: 'AP7廠區', workers: 156 },
        { plant: 'AP4廠區', workers: 225 },
        { plant: 'AP3廠區', workers: 198 },
        { plant: 'AP6廠區', workers: 342 },
        { plant: 'AP5廠區', workers: 285 }
      ]
    }
  },
  performance: {
    projectPerformance: [
      { project: 'AP5建廠工程', planned: 65, actual: 68, efficiency: 104.6 },
      { project: 'AP6建廠工程', planned: 42, actual: 39, efficiency: 92.9 },
      { project: 'AP3設備更新', planned: 100, actual: 100, efficiency: 100.0 }
    ],
    costAnalysis: [
      { category: '人力成本', budget: 25000000, actual: 23500000, variance: -6.0 },
      { category: '材料成本', budget: 35000000, actual: 36800000, variance: 5.1 },
      { category: '設備租賃', budget: 12000000, actual: 11200000, variance: -6.7 },
      { category: '其他費用', budget: 8000000, actual: 7900000, variance: -1.3 }
    ],
    qualityMetrics: {
      defectRate: 2.3,
      reworkRate: 1.8,
      customerSatisfaction: 94.5,
      onTimeDelivery: 87.2
    }
  },
  reports: {
    monthly: {
      '2024-11': {
        totalHours: 18560,
        productivity: 92.3,
        safetyIncidents: 3,
        qualityScore: 94.1,
        costEfficiency: 96.8
      },
      '2024-10': {
        totalHours: 17890,
        productivity: 89.7,
        safetyIncidents: 2,
        qualityScore: 93.5,
        costEfficiency: 94.2
      }
    },
    quarterly: {
      'Q4-2024': {
        revenue: 125000000,
        profit: 18750000,
        projectsCompleted: 8,
        customerRetention: 96.5
      },
      'Q3-2024': {
        revenue: 118000000,
        profit: 16520000,
        projectsCompleted: 6,
        customerRetention: 94.2
      }
    }
  }
};

// 新增：資料表結構管理
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

// 計算欄位存儲（在實際應用中應該存儲在資料庫中）
let calculatedFields = [
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
    createdBy: 'admin',
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
    dependencies: ['專案進度', '廠商實際累計出工數', '專案總工時(日)'],
    category: '效率指標',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2024-12-04T15:20:00Z'
  }
];

// 資料表管理 API

// 取得所有資料表
router.get('/data-tables', (req, res) => {
  const { category, search } = req.query;
  let filteredTables = [...mockDataTables];
  
  if (category) {
    filteredTables = filteredTables.filter(table => table.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredTables = filteredTables.filter(table => 
      table.displayName.toLowerCase().includes(searchLower) ||
      table.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json({
    success: true,
    data: filteredTables,
    total: filteredTables.length
  });
});

// 取得特定資料表詳細資訊
router.get('/data-tables/:tableId', (req, res) => {
  const { tableId } = req.params;
  const table = mockDataTables.find(t => t.id === tableId || t.name === tableId);
  
  if (!table) {
    return res.status(404).json({
      success: false,
      message: '資料表不存在'
    });
  }
  
  res.json({
    success: true,
    data: table
  });
});

// 取得資料表欄位資訊
router.get('/data-tables/:tableId/columns', (req, res) => {
  const { tableId } = req.params;
  const table = mockDataTables.find(t => t.id === tableId || t.name === tableId);
  
  if (!table) {
    return res.status(404).json({
      success: false,
      message: '資料表不存在'
    });
  }
  
  res.json({
    success: true,
    data: table.columns
  });
});

// 預覽資料表資料
router.get('/data-tables/:tableId/preview', (req, res) => {
  const { tableId } = req.params;
  const { limit = 10 } = req.query;
  
  const table = mockDataTables.find(t => t.id === tableId || t.name === tableId);
  
  if (!table) {
    return res.status(404).json({
      success: false,
      message: '資料表不存在'
    });
  }
  
  // 生成模擬數據
  const sampleData = [];
  for (let i = 0; i < Math.min(parseInt(limit), 20); i++) {
    const row = {};
    table.columns.forEach(column => {
      switch (column.type) {
        case 'string':
          if (column.distinctValues) {
            row[column.name] = column.distinctValues[Math.floor(Math.random() * column.distinctValues.length)];
          } else {
            row[column.name] = `範例${column.name}${i + 1}`;
          }
          break;
        case 'number':
          const min = column.min || 0;
          const max = column.max || 100;
          row[column.name] = Math.floor(Math.random() * (max - min + 1)) + min;
          break;
        case 'datetime':
          row[column.name] = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        default:
          row[column.name] = `範例值${i + 1}`;
      }
    });
    sampleData.push(row);
  }
  
  res.json({
    success: true,
    data: {
      table: table,
      rows: sampleData,
      totalRows: table.rowCount,
      previewRows: sampleData.length
    }
  });
});

// 計算欄位管理 API

// 取得所有計算欄位
router.get('/calculated-fields', (req, res) => {
  const { sourceTable, category, isActive } = req.query;
  let filteredFields = [...calculatedFields];
  
  if (sourceTable) {
    filteredFields = filteredFields.filter(field => field.sourceTable === sourceTable);
  }
  
  if (category) {
    filteredFields = filteredFields.filter(field => field.category === category);
  }
  
  if (isActive !== undefined) {
    filteredFields = filteredFields.filter(field => field.isActive === (isActive === 'true'));
  }
  
  res.json({
    success: true,
    data: filteredFields,
    total: filteredFields.length
  });
});

// 取得特定計算欄位
router.get('/calculated-fields/:fieldId', (req, res) => {
  const { fieldId } = req.params;
  const field = calculatedFields.find(f => f.id === fieldId);
  
  if (!field) {
    return res.status(404).json({
      success: false,
      message: '計算欄位不存在'
    });
  }
  
  res.json({
    success: true,
    data: field
  });
});

// 建立新的計算欄位
router.post('/calculated-fields', (req, res) => {
  const { displayName, description, formula, unit, sourceTable, category } = req.body;
  
  // 基本驗證
  if (!displayName || !formula || !sourceTable) {
    return res.status(400).json({
      success: false,
      message: '缺少必要欄位：displayName, formula, sourceTable'
    });
  }
  
  // 檢查資料表是否存在
  const table = mockDataTables.find(t => t.id === sourceTable);
  if (!table) {
    return res.status(400).json({
      success: false,
      message: '指定的資料來源表不存在'
    });
  }
  
  // 提取依賴欄位
  const extractDependencies = (formula) => {
    // 簡單的依賴提取邏輯，匹配中文、英文字母、數字、括號的組合
    const matches = formula.match(/[\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_\(\)]*(?=\s*[+\-*/]|\s*$)/g);
    return matches ? [...new Set(matches)] : [];
  };
  
  const newField = {
    id: `calc_${Date.now()}`,
    name: displayName.toLowerCase().replace(/\s+/g, '_'),
    displayName,
    description: description || '',
    formula,
    unit: unit || '',
    sourceTable,
    category: category || '其他',
    dataType: 'number', // 目前只支援數值計算
    dependencies: extractDependencies(formula),
    isActive: true,
    createdBy: 'current_user', // 在實際應用中應該從認證中取得
    createdAt: new Date().toISOString()
  };
  
  calculatedFields.push(newField);
  
  res.status(201).json({
    success: true,
    data: newField,
    message: '計算欄位建立成功'
  });
});

// 更新計算欄位
router.put('/calculated-fields/:fieldId', (req, res) => {
  const { fieldId } = req.params;
  const { displayName, description, formula, unit, sourceTable, category, isActive } = req.body;
  
  const fieldIndex = calculatedFields.findIndex(f => f.id === fieldId);
  
  if (fieldIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '計算欄位不存在'
    });
  }
  
  // 檢查資料表是否存在（如果有提供的話）
  if (sourceTable) {
    const table = mockDataTables.find(t => t.id === sourceTable);
    if (!table) {
      return res.status(400).json({
        success: false,
        message: '指定的資料來源表不存在'
      });
    }
  }
  
  const extractDependencies = (formula) => {
    const matches = formula.match(/[\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_\(\)]*(?=\s*[+\-*/]|\s*$)/g);
    return matches ? [...new Set(matches)] : [];
  };
  
  // 更新欄位
  const updatedField = {
    ...calculatedFields[fieldIndex],
    ...(displayName && { displayName, name: displayName.toLowerCase().replace(/\s+/g, '_') }),
    ...(description !== undefined && { description }),
    ...(formula && { formula, dependencies: extractDependencies(formula) }),
    ...(unit !== undefined && { unit }),
    ...(sourceTable && { sourceTable }),
    ...(category && { category }),
    ...(isActive !== undefined && { isActive }),
    updatedAt: new Date().toISOString()
  };
  
  calculatedFields[fieldIndex] = updatedField;
  
  res.json({
    success: true,
    data: updatedField,
    message: '計算欄位更新成功'
  });
});

// 刪除計算欄位
router.delete('/calculated-fields/:fieldId', (req, res) => {
  const { fieldId } = req.params;
  const fieldIndex = calculatedFields.findIndex(f => f.id === fieldId);
  
  if (fieldIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '計算欄位不存在'
    });
  }
  
  const deletedField = calculatedFields.splice(fieldIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedField,
    message: '計算欄位刪除成功'
  });
});

// 驗證計算公式
router.post('/calculated-fields/validate', (req, res) => {
  const { formula, sourceTable } = req.body;
  
  if (!formula || !sourceTable) {
    return res.status(400).json({
      success: false,
      message: '缺少必要參數：formula, sourceTable'
    });
  }
  
  const table = mockDataTables.find(t => t.id === sourceTable);
  if (!table) {
    return res.status(400).json({
      success: false,
      message: '指定的資料來源表不存在'
    });
  }
  
  // 簡單的公式驗證
  const extractDependencies = (formula) => {
    const matches = formula.match(/[\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_\(\)]*(?=\s*[+\-*/]|\s*$)/g);
    return matches ? [...new Set(matches)] : [];
  };
  
  const dependencies = extractDependencies(formula);
  const validColumns = table.columns.map(col => col.name);
  const invalidDependencies = dependencies.filter(dep => !validColumns.includes(dep));
  
  const isValid = invalidDependencies.length === 0;
  
  res.json({
    success: true,
    data: {
      isValid,
      dependencies,
      invalidDependencies,
      availableColumns: validColumns,
      message: isValid ? '公式驗證通過' : `以下欄位不存在於資料表中: ${invalidDependencies.join(', ')}`
    }
  });
});

// 計算欄位預覽（模擬計算結果）
router.post('/calculated-fields/preview', (req, res) => {
  const { formula, sourceTable, limit = 5 } = req.body;
  
  const table = mockDataTables.find(t => t.id === sourceTable);
  if (!table) {
    return res.status(400).json({
      success: false,
      message: '指定的資料來源表不存在'
    });
  }
  
  // 支援的函數計算
  const evaluateFormula = (formula, data) => {
    try {
      let expression = formula;
      
      // 替換欄位名稱為實際值
      Object.keys(data).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        expression = expression.replace(regex, data[key] || 0);
      });
      
      // 處理函數調用
      expression = expression.replace(/SUM\(([^)]+)\)/g, (match, args) => {
        const values = args.split(',').map(v => parseFloat(v.trim()) || 0);
        return values.reduce((sum, val) => sum + val, 0);
      });
      
      expression = expression.replace(/AVG\(([^)]+)\)/g, (match, args) => {
        const values = args.split(',').map(v => parseFloat(v.trim()) || 0);
        return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
      });
      
      expression = expression.replace(/MAX\(([^)]+)\)/g, (match, args) => {
        const values = args.split(',').map(v => parseFloat(v.trim()) || 0);
        return Math.max(...values);
      });
      
      expression = expression.replace(/MIN\(([^)]+)\)/g, (match, args) => {
        const values = args.split(',').map(v => parseFloat(v.trim()) || 0);
        return Math.min(...values);
      });
      
      expression = expression.replace(/ROUND\(([^,]+),\s*(\d+)\)/g, (match, value, decimals) => {
        const num = parseFloat(value) || 0;
        const dec = parseInt(decimals) || 0;
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
      });
      
      expression = expression.replace(/ABS\(([^)]+)\)/g, (match, value) => {
        return Math.abs(parseFloat(value) || 0);
      });
      
      expression = expression.replace(/SQRT\(([^)]+)\)/g, (match, value) => {
        return Math.sqrt(parseFloat(value) || 0);
      });
      
      expression = expression.replace(/POWER\(([^,]+),\s*([^)]+)\)/g, (match, base, exponent) => {
        return Math.pow(parseFloat(base) || 0, parseFloat(exponent) || 0);
      });
      
      // 簡單的 IF 函數處理
      expression = expression.replace(/IF\(([^,]+),\s*([^,]+),\s*([^)]+)\)/g, (match, condition, trueValue, falseValue) => {
        // 簡化條件評估
        const conditionResult = eval(condition.replace(/==/g, '==='));
        return conditionResult ? parseFloat(trueValue) : parseFloat(falseValue);
      });
      
      // 安全評估數學表達式
      const result = Function(`"use strict"; return (${expression})`)();
      return isNaN(result) ? 'N/A' : Math.round(result * 100) / 100;
      
    } catch (error) {
      return 'ERROR';
    }
  };
  
  // 生成模擬預覽資料
  const previewData = [];
  for (let i = 0; i < limit; i++) {
    const row = {};
    table.columns.forEach(column => {
      if (column.type === 'number') {
        const min = column.min || 0;
        const max = column.max || 100;
        row[column.name] = Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (column.type === 'string' && column.distinctValues) {
        row[column.name] = column.distinctValues[Math.floor(Math.random() * column.distinctValues.length)];
      }
    });
    
    // 計算結果
    const calculatedValue = evaluateFormula(formula, row);
    
    previewData.push({
      rowIndex: i + 1,
      sourceData: row,
      calculatedValue: calculatedValue
    });
  }
  
  res.json({
    success: true,
    data: {
      formula,
      sourceTable: table.displayName,
      previewRows: previewData,
      note: '這是基於隨機資料的計算預覽，實際結果可能不同'
    }
  });
});

// 即時資料預覽 API
router.post('/data-preview', (req, res) => {
  const { tableId, filters, limit = 10 } = req.body;
  
  const table = mockDataTables.find(t => t.id === tableId);
  if (!table) {
    return res.status(400).json({
      success: false,
      message: '資料表不存在'
    });
  }
  
  // 生成模擬資料
  const previewData = [];
  for (let i = 0; i < Math.min(parseInt(limit), 50); i++) {
    const row = {};
    table.columns.forEach(column => {
      switch (column.type) {
        case 'string':
          if (column.distinctValues) {
            row[column.name] = column.distinctValues[Math.floor(Math.random() * column.distinctValues.length)];
          } else {
            row[column.name] = `${column.name}${i + 1}`;
          }
          break;
        case 'number':
          const min = column.min || 0;
          const max = column.max || 100;
          row[column.name] = Math.floor(Math.random() * (max - min + 1)) + min;
          break;
        case 'datetime':
          row[column.name] = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
          break;
        default:
          row[column.name] = `值${i + 1}`;
      }
    });
    previewData.push(row);
  }
  
  // 應用篩選器（簡化版）
  let filteredData = previewData;
  if (filters && Object.keys(filters).length > 0) {
    filteredData = previewData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }
  
  res.json({
    success: true,
    data: {
      table: table,
      rows: filteredData,
      totalRows: table.rowCount,
      previewRows: filteredData.length,
      appliedFilters: filters || {}
    }
  });
});

// 統計資料 API
router.get('/data-statistics/:tableId', (req, res) => {
  const { tableId } = req.params;
  
  const table = mockDataTables.find(t => t.id === tableId);
  if (!table) {
    return res.status(404).json({
      success: false,
      message: '資料表不存在'
    });
  }
  
  // 生成模擬統計資料
  const statistics = {};
  table.columns.forEach(column => {
    if (column.type === 'number') {
      statistics[column.name] = {
        type: 'numeric',
        count: table.rowCount,
        nullCount: Math.floor(table.rowCount * 0.02), // 2% null values
        mean: Math.random() * 100,
        median: Math.random() * 100,
        min: column.min || 0,
        max: column.max || 100,
        stdDev: Math.random() * 20
      };
    } else if (column.type === 'string') {
      statistics[column.name] = {
        type: 'categorical',
        count: table.rowCount,
        nullCount: Math.floor(table.rowCount * 0.01), // 1% null values
        uniqueCount: column.distinctValues ? column.distinctValues.length : Math.floor(table.rowCount * 0.1),
        topValues: column.distinctValues ? column.distinctValues.slice(0, 5) : [`值1`, `值2`, `值3`]
      };
    }
  });
  
  res.json({
    success: true,
    data: {
      table: table,
      statistics: statistics,
      generatedAt: new Date().toISOString()
    }
  });
});

// 取得儀表板數據
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: mockAnalyticsData.dashboard
  });
});

// 取得效能分析數據
router.get('/performance', (req, res) => {
  const { type } = req.query;
  
  if (type && mockAnalyticsData.performance[type]) {
    res.json({
      success: true,
      data: mockAnalyticsData.performance[type]
    });
  } else {
    res.json({
      success: true,
      data: mockAnalyticsData.performance
    });
  }
});

// 取得趨勢數據
router.get('/trends/:type', (req, res) => {
  const { type } = req.params;
  const { startDate, endDate } = req.query;
  
  if (mockAnalyticsData.dashboard.trends[type]) {
    let data = mockAnalyticsData.dashboard.trends[type];
    
    // 簡單的日期過濾邏輯
    if (startDate && endDate) {
      data = data.filter(item => {
        if (item.date) {
          return item.date >= startDate && item.date <= endDate;
        }
        return true;
      });
    }
    
    res.json({
      success: true,
      data: data
    });
  } else {
    res.status(404).json({
      success: false,
      message: '趨勢數據類型不存在'
    });
  }
});

// 取得報告數據
router.get('/reports/:period', (req, res) => {
  const { period } = req.params;
  const { timeframe } = req.query;
  
  if (mockAnalyticsData.reports[period]) {
    let data = mockAnalyticsData.reports[period];
    
    if (timeframe && data[timeframe]) {
      data = data[timeframe];
    }
    
    res.json({
      success: true,
      data: data
    });
  } else {
    res.status(404).json({
      success: false,
      message: '報告週期不存在'
    });
  }
});

// 生成自訂報告
router.post('/reports/generate', (req, res) => {
  const { reportType, parameters, format } = req.body;
  
  // 模擬報告生成
  const reportId = `RPT_${Date.now()}`;
  
  res.json({
    success: true,
    data: {
      reportId: reportId,
      type: reportType,
      status: '生成中',
      format: format || 'PDF',
      estimatedTime: '5-10分鐘',
      downloadUrl: `/api/analytics/reports/download/${reportId}`
    },
    message: '報告生成已開始'
  });
});

// 下載報告
router.get('/reports/download/:reportId', (req, res) => {
  const { reportId } = req.params;
  
  // 模擬報告下載
  res.json({
    success: true,
    data: {
      reportId: reportId,
      status: '已完成',
      downloadUrl: `https://example.com/reports/${reportId}.pdf`,
      size: '2.3MB',
      generatedAt: new Date().toISOString()
    }
  });
});

// 取得 KPI 數據
router.get('/kpi', (req, res) => {
  const kpiData = {
    safety: {
      name: '安全指標',
      value: 92.5,
      target: 95.0,
      trend: 'up',
      unit: '%'
    },
    productivity: {
      name: '生產力指標',
      value: 89.3,
      target: 90.0,
      trend: 'up',
      unit: '%'
    },
    quality: {
      name: '品質指標',
      value: 94.1,
      target: 93.0,
      trend: 'up',
      unit: '%'
    },
    cost: {
      name: '成本效率',
      value: 96.8,
      target: 95.0,
      trend: 'up',
      unit: '%'
    }
  };
  
  res.json({
    success: true,
    data: kpiData
  });
});

// 預測分析
router.get('/predictions/:type', (req, res) => {
  const { type } = req.params;
  
  const predictions = {
    worker_demand: [
      { month: '2024-12', predicted: 1380, confidence: 87 },
      { month: '2025-01', predicted: 1420, confidence: 82 },
      { month: '2025-02', predicted: 1350, confidence: 78 }
    ],
    cost_forecast: [
      { month: '2024-12', predicted: 42000000, confidence: 89 },
      { month: '2025-01', predicted: 45000000, confidence: 85 },
      { month: '2025-02', predicted: 41000000, confidence: 80 }
    ],
    project_completion: [
      { project: 'AP5建廠工程', predicted_date: '2024-12-28', confidence: 92 },
      { project: 'AP6建廠工程', predicted_date: '2025-03-15', confidence: 78 }
    ]
  };
  
  if (predictions[type]) {
    res.json({
      success: true,
      data: predictions[type]
    });
  } else {
    res.status(404).json({
      success: false,
      message: '預測類型不存在'
    });
  }
  });

// 報表管理 API

// 報表存儲（在實際應用中應該存儲在資料庫中）
let savedReports = [
  {
    id: 'report_001',
    name: '廠商出工效率分析',
    description: '分析各廠商的每日出工數效率',
    dataSource: 'projects_table',
    chartType: 'bar',
    dimensions: ['廠區', '參與廠商'],
    metrics: ['avg_daily_work_hours'],
    filters: {},
    isPublic: true,
    createdBy: 'admin',
    createdAt: '2024-12-05T10:30:00Z',
    lastModified: '2024-12-05T10:30:00Z'
  },
  {
    id: 'report_002', 
    name: '專案進度趨勢',
    description: '各專案的進度變化趨勢',
    dataSource: 'projects_table',
    chartType: 'line',
    dimensions: ['專案負責人'],
    metrics: ['專案進度', 'project_efficiency'],
    filters: {},
    isPublic: false,
    createdBy: 'admin',
    createdAt: '2024-12-04T15:20:00Z',
    lastModified: '2024-12-04T15:20:00Z'
  }
];

// 取得所有報表
router.get('/reports', (req, res) => {
  const { createdBy, isPublic, dataSource, chartType } = req.query;
  let filteredReports = [...savedReports];
  
  if (createdBy) {
    filteredReports = filteredReports.filter(report => report.createdBy === createdBy);
  }
  
  if (isPublic !== undefined) {
    filteredReports = filteredReports.filter(report => report.isPublic === (isPublic === 'true'));
  }
  
  if (dataSource) {
    filteredReports = filteredReports.filter(report => report.dataSource === dataSource);
  }
  
  if (chartType) {
    filteredReports = filteredReports.filter(report => report.chartType === chartType);
  }
  
  res.json({
    success: true,
    data: filteredReports,
    total: filteredReports.length
  });
});

// 取得特定報表
router.get('/reports/:reportId', (req, res) => {
  const { reportId } = req.params;
  const report = savedReports.find(r => r.id === reportId);
  
  if (!report) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  res.json({
    success: true,
    data: report
  });
});

// 建立新報表
router.post('/reports', (req, res) => {
  const { name, description, dataSource, dimensions, metrics, chartType, filters, isPublic } = req.body;
  
  // 基本驗證
  if (!name || !dataSource || !dimensions || !metrics || !chartType) {
    return res.status(400).json({
      success: false,
      message: '缺少必要欄位：name, dataSource, dimensions, metrics, chartType'
    });
  }
  
  // 檢查資料表是否存在
  const table = mockDataTables.find(t => t.id === dataSource);
  if (!table) {
    return res.status(400).json({
      success: false,
      message: '指定的資料來源表不存在'
    });
  }
  
  // 驗證維度是否存在於資料表中
  const validDimensions = table.columns.filter(col => col.type === 'string').map(col => col.name);
  const invalidDimensions = dimensions.filter(dim => !validDimensions.includes(dim));
  
  if (invalidDimensions.length > 0) {
    return res.status(400).json({
      success: false,
      message: `以下維度不存在於資料表中: ${invalidDimensions.join(', ')}`
    });
  }
  
  // 驗證指標是否存在
  const validMetrics = [
    ...table.columns.filter(col => col.type === 'number').map(col => col.name),
    ...calculatedFields.filter(field => field.sourceTable === dataSource && field.isActive).map(field => field.name)
  ];
  const invalidMetrics = metrics.filter(metric => !validMetrics.includes(metric));
  
  if (invalidMetrics.length > 0) {
    return res.status(400).json({
      success: false,
      message: `以下指標不存在或未啟用: ${invalidMetrics.join(', ')}`
    });
  }
  
  const newReport = {
    id: `report_${Date.now()}`,
    name,
    description: description || '',
    dataSource,
    dimensions,
    metrics,
    chartType,
    filters: filters || {},
    isPublic: isPublic || false,
    createdBy: 'current_user', // 在實際應用中應該從認證中取得
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };
  
  savedReports.push(newReport);
  
  res.status(201).json({
    success: true,
    data: newReport,
    message: '報表建立成功'
  });
});

// 更新報表
router.put('/reports/:reportId', (req, res) => {
  const { reportId } = req.params;
  const { name, description, dataSource, dimensions, metrics, chartType, filters, isPublic } = req.body;
  
  const reportIndex = savedReports.findIndex(r => r.id === reportId);
  
  if (reportIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  // 如果更新了資料來源，需要重新驗證
  if (dataSource && dataSource !== savedReports[reportIndex].dataSource) {
    const table = mockDataTables.find(t => t.id === dataSource);
    if (!table) {
      return res.status(400).json({
        success: false,
        message: '指定的資料來源表不存在'
      });
    }
  }
  
  // 更新報表
  const updatedReport = {
    ...savedReports[reportIndex],
    ...(name && { name }),
    ...(description !== undefined && { description }),
    ...(dataSource && { dataSource }),
    ...(dimensions && { dimensions }),
    ...(metrics && { metrics }),
    ...(chartType && { chartType }),
    ...(filters !== undefined && { filters }),
    ...(isPublic !== undefined && { isPublic }),
    lastModified: new Date().toISOString()
  };
  
  savedReports[reportIndex] = updatedReport;
  
  res.json({
    success: true,
    data: updatedReport,
    message: '報表更新成功'
  });
});

// 刪除報表
router.delete('/reports/:reportId', (req, res) => {
  const { reportId } = req.params;
  const reportIndex = savedReports.findIndex(r => r.id === reportId);
  
  if (reportIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  const deletedReport = savedReports.splice(reportIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedReport,
    message: '報表刪除成功'
  });
});

// 複製報表
router.post('/reports/:reportId/duplicate', (req, res) => {
  const { reportId } = req.params;
  const { name } = req.body;
  
  const originalReport = savedReports.find(r => r.id === reportId);
  
  if (!originalReport) {
    return res.status(404).json({
      success: false,
      message: '原始報表不存在'
    });
  }
  
  const duplicatedReport = {
    ...originalReport,
    id: `report_${Date.now()}`,
    name: name || `${originalReport.name} (副本)`,
    isPublic: false, // 複製的報表預設為私有
    createdBy: 'current_user',
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };
  
  savedReports.push(duplicatedReport);
  
  res.status(201).json({
    success: true,
    data: duplicatedReport,
    message: '報表複製成功'
  });
});

// 取得報表資料（用於圖表渲染）
router.get('/reports/:reportId/data', (req, res) => {
  const { reportId } = req.params;
  const { limit = 100 } = req.query;
  
  const report = savedReports.find(r => r.id === reportId);
  
  if (!report) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  // 生成模擬圖表數據（在實際應用中應該根據報表配置查詢真實數據）
  const generateChartData = (chartType) => {
    switch (chartType) {
      case 'bar':
        return [
          { name: 'AP3廠區', value: 8.5, efficiency: 95.2 },
          { name: 'AP4廠區', value: 7.8, efficiency: 89.3 },
          { name: 'AP5廠區', value: 9.2, efficiency: 98.7 },
          { name: 'AP6廠區', value: 6.9, efficiency: 85.1 },
          { name: 'AP7廠區', value: 8.1, efficiency: 91.4 }
        ].slice(0, parseInt(limit));
      case 'line':
        return [
          { month: '2024-08', progress: 45, efficiency: 85 },
          { month: '2024-09', progress: 62, efficiency: 89 },
          { month: '2024-10', progress: 78, efficiency: 92 },
          { month: '2024-11', progress: 89, efficiency: 94 },
          { month: '2024-12', progress: 95, efficiency: 96 }
        ].slice(0, parseInt(limit));
      case 'pie':
        return [
          { name: '土木工程部', value: 35, color: '#6366f1' },
          { name: '機電工程部', value: 45, color: '#06b6d4' },
          { name: '環保工程部', value: 20, color: '#10b981' }
        ].slice(0, parseInt(limit));
      case 'area':
        return [
          { month: '2024-08', completed: 156, inProgress: 89, planned: 67 },
          { month: '2024-09', completed: 203, inProgress: 76, planned: 82 },
          { month: '2024-10', completed: 267, inProgress: 94, planned: 58 },
          { month: '2024-11', completed: 289, inProgress: 67, planned: 73 },
          { month: '2024-12', completed: 334, inProgress: 45, planned: 89 }
        ].slice(0, parseInt(limit));
      default:
        return [];
    }
  };
  
  const chartData = generateChartData(report.chartType);
  
  res.json({
    success: true,
    data: {
      report: report,
      chartData: chartData,
      dataCount: chartData.length,
      generatedAt: new Date().toISOString()
    }
  });
});

// 分享報表
router.post('/reports/:reportId/share', (req, res) => {
  const { reportId } = req.params;
  const { shareWith, permissions } = req.body;
  
  const report = savedReports.find(r => r.id === reportId);
  
  if (!report) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  // 模擬分享邏輯
  const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  res.json({
    success: true,
    data: {
      reportId: reportId,
      shareToken: shareToken,
      shareUrl: `/analytics/reports/shared/${shareToken}`,
      shareWith: shareWith || [],
      permissions: permissions || 'view',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7天後過期
    },
    message: '報表分享連結生成成功'
  });
});

// 匯出報表
router.get('/reports/:reportId/export', (req, res) => {
  const { reportId } = req.params;
  const { format = 'json' } = req.query;
  
  const report = savedReports.find(r => r.id === reportId);
  
  if (!report) {
    return res.status(404).json({
      success: false,
      message: '報表不存在'
    });
  }
  
  // 模擬匯出功能
  const exportData = {
    report: report,
    exportedAt: new Date().toISOString(),
    format: format
  };
  
  res.json({
    success: true,
    data: exportData,
    downloadUrl: `/api/analytics/reports/${reportId}/download?format=${format}`,
    message: '報表匯出準備完成'
  });
});

module.exports = router; 