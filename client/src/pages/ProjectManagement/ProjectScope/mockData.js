// 工種資料
export const mockJobTypes = [
  { id: 'job-001', name: '土木工程師', category: '工程類', description: '負責土木建設相關工作' },
  { id: 'job-002', name: '機電工程師', category: '工程類', description: '負責機電設備安裝維護' },
  { id: 'job-003', name: '結構工程師', category: '工程類', description: '負責結構設計與分析' },
  { id: 'job-004', name: '焊接技師', category: '技術類', description: '專業焊接作業' },
  { id: 'job-005', name: '起重機操作員', category: '技術類', description: '大型起重設備操作' },
  { id: 'job-006', name: '電氣技師', category: '技術類', description: '電氣設備安裝維護' },
  { id: 'job-007', name: '品管檢驗員', category: '品管類', description: '品質檢驗與管控' },
  { id: 'job-008', name: '安全管理員', category: '管理類', description: '工地安全管理' },
  { id: 'job-009', name: '專案協調員', category: '管理類', description: '專案進度協調' },
  { id: 'job-010', name: '水電技師', category: '技術類', description: '水電工程施工' }
];

// 廠商資料
export const mockVendors = [
  {
    id: 'vendor-001',
    name: '台灣建設股份有限公司',
    type: '主要承包商',
    specialty: '土木工程',
    contact: {
      person: '張總經理',
      phone: '02-2345-6789',
      email: 'manager@taiwan-construction.com'
    },
    address: '台北市信義區信義路五段7號',
    established: '1985-03-15',
    employees: 850,
    certification: ['營造業甲等', 'ISO 9001', 'ISO 14001']
  },
  {
    id: 'vendor-002', 
    name: '精密機電工程有限公司',
    type: '專業分包商',
    specialty: '機電設備',
    contact: {
      person: '李工程師',
      phone: '03-3456-7890',
      email: 'engineer@precision-me.com'
    },
    address: '桃園市中壢區中北路200號',
    established: '1992-08-20',  
    employees: 320,
    certification: ['機電工程甲等', 'ISO 9001']
  },
  {
    id: 'vendor-003',
    name: '鋼構專業股份有限公司', 
    type: '專業分包商',
    specialty: '鋼構工程',
    contact: {
      person: '王技師',
      phone: '07-7654-3210',
      email: 'tech@steel-pro.com'
    },
    address: '高雄市左營區博愛二路777號',
    established: '1988-12-10',
    employees: 180,
    certification: ['鋼構工程專業', 'CNS認證']
  },
  {
    id: 'vendor-004',
    name: '環保科技工程股份有限公司',
    type: '專業分包商', 
    specialty: '環保工程',
    contact: {
      person: '陳環工',
      phone: '04-2234-5678',
      email: 'env@eco-tech.com'
    },
    address: '台中市西屯區台灣大道三段99號',
    established: '1995-06-30',
    employees: 120,
    certification: ['環保工程甲等', 'ISO 14001', '廢水處理專業']
  },
  {
    id: 'vendor-005',
    name: '品質檢測顧問有限公司',
    type: '顧問公司',
    specialty: '品質檢測',
    contact: {
      person: '劉品管',
      phone: '02-8765-4321', 
      email: 'qa@quality-test.com'
    },
    address: '新北市板橋區文化路一段188號',
    established: '2000-02-14',
    employees: 65,
    certification: ['TAF認證', 'CNS檢測資格', 'ISO/IEC 17025']
  }
];

// 里程碑資料
export const mockMilestones = [
  {
    id: 'milestone-001',
    name: '土地取得完成',
    description: '完成所有土地徵收及使用權取得作業',
    plannedDate: '2024-03-15',
    actualDate: '2024-03-10',
    status: 'completed',
    responsible: '法務部',
    deliverables: ['土地使用權狀', '環評核准文件', '建築許可證']
  },
  {
    id: 'milestone-002', 
    name: '基礎工程完工',
    description: '完成廠區基礎建設，包含地基、排水系統',
    plannedDate: '2024-06-30',
    actualDate: '2024-06-25',
    status: 'completed', 
    responsible: '台灣建設股份有限公司',
    deliverables: ['基礎工程竣工報告', '地基檢測報告', '排水系統測試報告']
  },
  {
    id: 'milestone-003',
    name: '主體結構完工',
    description: '完成廠房主體結構建設',
    plannedDate: '2024-09-15',
    actualDate: null,
    status: 'in_progress',
    responsible: '鋼構專業股份有限公司', 
    deliverables: ['結構竣工報告', '安全檢測證明', '建築結構圖']
  },
  {
    id: 'milestone-004',
    name: '機電設備安裝',
    description: '完成所有機電設備安裝與測試',
    plannedDate: '2024-12-20',
    actualDate: null,
    status: 'planned',
    responsible: '精密機電工程有限公司',
    deliverables: ['設備安裝報告', '系統測試報告', '操作手冊']
  },
  {
    id: 'milestone-005',
    name: '試車及驗收',
    description: '進行設備試車、系統整合測試及最終驗收',
    plannedDate: '2025-02-28', 
    actualDate: null,
    status: 'planned',
    responsible: '品質檢測顧問有限公司',
    deliverables: ['試車報告', '驗收證書', '使用許可證']
  }
];

// 專案範疇管理資料
export const mockProjects = [
  {
    id: 'AP5-001',
    name: 'AP5建廠工程專案',
    description: '新建AP5廠區，包含生產設備、公用設施及環保設施，預計年產能達到50萬噸',
    scope: {
      inclusions: [
        '廠房建築工程（生產廠房、倉庫、辦公大樓）',
        '生產設備採購與安裝',
        '公用設施建設（電力、給排水、蒸汽、壓縮空氣）',
        '環保設施建設（廢水處理、廢氣處理、噪音防制）',
        '道路及停車場建設',
        '綠化景觀工程',
        '消防安全系統',
        '資訊系統建置'
      ],
      exclusions: [
        '土地取得費用（已由集團總部處理）',
        '營運階段的人員訓練',
        '原料採購',
        '產品銷售與行銷'
      ]
    },
    manager: {
      id: 'manager-001',
      name: '王工程師',
      title: '專案經理',
      department: '工程部',
      phone: '02-1234-5678',
      email: 'wang.engineer@company.com'
    },
    milestones: ['milestone-001', 'milestone-002', 'milestone-003', 'milestone-004', 'milestone-005'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2025-06-30',
      duration: 548, // 天數
      currentPhase: '主體結構施工'
    },
    vendors: ['vendor-001', 'vendor-002', 'vendor-003', 'vendor-004', 'vendor-005'],
    requiredJobTypes: [
      { jobTypeId: 'job-001', quantity: 15, duration: 400, notes: '負責基礎工程及結構施工監督' },
      { jobTypeId: 'job-002', quantity: 12, duration: 300, notes: '機電設備安裝與調試' },
      { jobTypeId: 'job-003', quantity: 8, duration: 200, notes: '結構設計審查與施工監督' },
      { jobTypeId: 'job-004', quantity: 25, duration: 350, notes: '鋼構焊接作業' },
      { jobTypeId: 'job-005', quantity: 6, duration: 300, notes: '大型設備吊裝作業' },
      { jobTypeId: 'job-006', quantity: 18, duration: 280, notes: '電氣系統安裝' },
      { jobTypeId: 'job-007', quantity: 10, duration: 500, notes: '全程品質檢驗' },
      { jobTypeId: 'job-008', quantity: 5, duration: 548, notes: '工地安全管理' },
      { jobTypeId: 'job-009', quantity: 3, duration: 548, notes: '專案協調與進度管控' }
    ],
    budget: {
      total: 5000000000, // 50億
      allocated: 2800000000, // 28億
      spent: 1200000000, // 12億
      currency: 'TWD'
    },
    status: 'in_progress',
    progress: 65,
    plantArea: 'AP5廠區',
    notes: '本專案為集團重點投資項目，採用最新環保技術，符合國際標準。預計完工後將成為亞洲地區最先進的生產基地之一。'
  },
  {
    id: 'AP6-001', 
    name: 'AP6建廠工程專案',
    description: '新建AP6廠區，專注於高階產品生產，整合智慧製造技術，預計年產能30萬噸',
    scope: {
      inclusions: [
        '智慧化廠房建築工程',
        '自動化生產線設備',
        '智慧倉儲系統',
        '綠能發電設施（太陽能、風力）',
        '智慧化公用設施',
        '先進環保處理設施',
        '智慧停車系統',
        '數位化管理系統'
      ],
      exclusions: [
        '既有設備搬遷費用',
        '專利技術授權費',
        '軟體客製化開發',
        '國外專家顧問費'
      ]
    },
    manager: {
      id: 'manager-002',
      name: '李工程師', 
      title: '資深專案經理',
      department: '智慧製造部',
      phone: '03-2345-6789',
      email: 'li.engineer@company.com'
    },
    milestones: [
      {
        id: 'milestone-ap6-001',
        name: '智慧製造規劃完成',
        description: '完成智慧製造系統設計與規劃',
        plannedDate: '2024-04-30',
        actualDate: '2024-04-28',
        status: 'completed',
        responsible: '智慧製造部',
        deliverables: ['智慧製造設計圖', '系統架構說明書', '設備規格書']
      },
      {
        id: 'milestone-ap6-002',
        name: '基礎建設完工',
        description: '完成廠區基礎建設與智慧化基礎設施',
        plannedDate: '2024-08-15',
        actualDate: null,
        status: 'in_progress', 
        responsible: '台灣建設股份有限公司',
        deliverables: ['基礎工程報告', '智慧基礎設施測試報告']
      },
      {
        id: 'milestone-ap6-003',
        name: '自動化設備安裝',
        description: '完成自動化生產線及輔助設備安裝',
        plannedDate: '2025-01-30',
        actualDate: null,
        status: 'planned',
        responsible: '精密機電工程有限公司',
        deliverables: ['設備安裝報告', '自動化系統測試報告']
      }
    ],
    schedule: {
      startDate: '2024-02-01',
      endDate: '2025-08-31',
      duration: 577, // 天數
      currentPhase: '基礎建設施工'
    },
    vendors: ['vendor-001', 'vendor-002', 'vendor-004'], 
    requiredJobTypes: [
      { jobTypeId: 'job-001', quantity: 10, duration: 300, notes: '智慧化基礎設施建設' },
      { jobTypeId: 'job-002', quantity: 20, duration: 400, notes: '自動化設備安裝調試' },
      { jobTypeId: 'job-003', quantity: 6, duration: 150, notes: '結構設計與審查' },
      { jobTypeId: 'job-006', quantity: 15, duration: 350, notes: '智慧化電氣系統' },
      { jobTypeId: 'job-007', quantity: 8, duration: 577, notes: '品質控制與檢驗' },
      { jobTypeId: 'job-008', quantity: 4, duration: 577, notes: '安全管理' },
      { jobTypeId: 'job-009', quantity: 2, duration: 577, notes: '專案協調' }
    ],
    budget: {
      total: 3500000000, // 35億
      allocated: 1800000000, // 18億  
      spent: 750000000, // 7.5億
      currency: 'TWD'
    },
    status: 'in_progress',
    progress: 42,
    plantArea: 'AP6廠區',
    notes: '本專案重點發展智慧製造，導入Industry 4.0概念，預計將成為智慧工廠的標竿案例。'
  },
  {
    id: 'AP5-002',
    name: 'AP5設備升級專案',
    description: 'AP5廠區既有設備升級改造，提升生產效率與環保標準',
    scope: {
      inclusions: [
        '舊設備拆除與更新',
        '新型環保設備安裝', 
        '控制系統升級',
        '管線重新配置',
        '電氣系統改善'
      ],
      exclusions: [
        '原有設備殘值處理',
        '停產損失補償',
        '員工重新訓練'
      ]
    },
    manager: {
      id: 'manager-003',
      name: '陳經理',
      title: '設備專案經理',
      department: '設備部',
      phone: '04-3456-7890', 
      email: 'chen.manager@company.com'
    },
    milestones: [
      {
        id: 'milestone-ap5-upgrade-001',
        name: '設備評估完成',
        description: '完成現有設備狀況評估與升級方案確認',
        plannedDate: '2024-05-31',
        actualDate: '2024-05-29',
        status: 'completed',
        responsible: '設備部',
        deliverables: ['設備評估報告', '升級改造方案', '成本效益分析']
      }
    ],
    schedule: {
      startDate: '2024-03-01',
      endDate: '2024-10-31', 
      duration: 245,
      currentPhase: '設備採購'
    },
    vendors: ['vendor-002', 'vendor-004'],
    requiredJobTypes: [
      { jobTypeId: 'job-002', quantity: 8, duration: 180, notes: '設備安裝與調試' },
      { jobTypeId: 'job-006', quantity: 5, duration: 120, notes: '電氣系統升級' },
      { jobTypeId: 'job-007', quantity: 3, duration: 245, notes: '升級過程品質管控' }
    ],
    budget: {
      total: 800000000, // 8億
      allocated: 600000000, // 6億
      spent: 320000000, // 3.2億  
      currency: 'TWD'
    },
    status: 'in_progress',
    progress: 78,
    plantArea: 'AP5廠區', 
    notes: '此專案為提升既有產能，預計完成後產能將提升25%，並符合最新環保法規要求。'
  }
];