# MX 資料分析平台原型

高效資料分析平台，專為工程專案管理與施工監控設計。基於 IBM Maximo 風格的企業級介面，提供全面的專案管理、施工管理、監控通知、資料分析和系統管理功能。

## 功能特色

### 1. 工程專案管理
- **1.1 專案範疇** - 專案定義與範圍管理
- **1.2 人力資源** - 資源分配與利用率追蹤
- **1.3 時程管理** - 甘特圖與里程碑管理
- **1.4 成本管理** - 預算追蹤與成本分析
- **1.5 品質管理** - 品質檢查與標準管理
- **1.6 風險與工單環保** - 風險評估與環保管理

### 2. 施工管理
- **2.1 施工前計畫**
  - **2.1.1 會勘管理** - 現場勘察與記錄
  - **2.1.2 施工前會議管理** - 工具箱會議與安全會議
- **2.2 施工管制**
  - **2.2.1 施工申請管理** - 施工許可申請與審核
  - **2.2.2 施工紀錄管理** - 日報、週報與進度記錄
- **2.3 施工安全查核**
  - **2.3.1 施工巡檢管理** - 安全檢查與巡檢記錄
  - **2.3.2 施工缺失追蹤管理** - 問題追蹤與改善進度

### 3. 監控與通知
- **3.1 監控管理** - 即時監控與數據收集
- **3.2 通知管理** - 警報通知與訊息管理

### 4. 資料分析
- **4.1 分析管理** - 數據分析與報告生成
- **4.2 資料排程管理** - 自動化數據同步
- **4.3 AI問答** - 智能助手與業務諮詢
- **4.4 報表連結(PowerBI)** - 商業智能報表整合

### 5. 系統管理
- **5.1 系統整合監視** - 外部系統整合狀態監控
- **5.2 系統參數管理** - 系統配置與參數設定
- **5.3 權限管理** - 使用者權限與角色管理
- **5.4 教育訓練手冊** - 培訓資源與文件管理

## 技術架構

### 前端技術
- **React 18** - 現代化 React 框架
- **Material-UI (MUI)** - 企業級 UI 組件庫
- **React Router** - 單頁應用路由
- **React Query** - 數據狀態管理
- **Recharts** - 數據可視化圖表
- **Axios** - HTTP 請求處理

### 後端技術
- **Node.js + Express** - 後端伺服器框架
- **MySQL** - 關聯式資料庫
- **JWT** - 身份認證與授權
- **bcryptjs** - 密碼加密
- **Helmet** - 安全性中間件
- **CORS** - 跨域資源共享

### 部署與安全
- **Environment Variables** - 環境變數配置
- **Rate Limiting** - API 請求限制
- **Audit Logging** - 操作日誌記錄
- **Role-based Access Control** - 角色權限控制

## 快速開始

### 環境需求
- Node.js 16.0 或更高版本
- MySQL 8.0 或更高版本
- npm 或 yarn 套件管理器

### 安裝步驟

1. **克隆專案**
```bash
git clone <repository-url>
cd mx-data-platform-prototype
```

2. **安裝相依套件**
```bash
# 安裝後端與前端相依套件
npm run install-all
```

3. **資料庫設定**
```bash
# 建立資料庫
mysql -u root -p < database/schema.sql
```

4. **環境變數配置**
```bash
# 複製環境變數範本
cp .env.example .env
# 編輯 .env 檔案，設定資料庫連接等資訊
```

5. **啟動應用程式**
```bash
# 開發模式（同時啟動前後端）
npm run dev

# 或分別啟動
npm run server  # 後端伺服器
npm run client  # 前端應用程式
```

6. **存取應用程式**
- 前端應用：http://localhost:3000
- 後端 API：http://localhost:5000

### 預設帳號
- **系統管理員**
  - 帳號：admin
  - 密碼：admin123
  
- **專案經理**
  - 帳號：manager
  - 密碼：manager123

## API 文件

### 認證 API
- `POST /api/auth/login` - 使用者登入
- `POST /api/auth/register` - 使用者註冊
- `GET /api/auth/verify` - 驗證 JWT Token
- `POST /api/auth/logout` - 使用者登出

### 專案管理 API
- `GET /api/projects` - 取得專案列表
- `POST /api/projects` - 建立新專案
- `GET /api/projects/:id` - 取得專案詳細資料
- `PUT /api/projects/:id` - 更新專案資料
- `DELETE /api/projects/:id` - 刪除專案

### 施工管理 API
- `GET /api/construction/sites` - 取得施工現場列表
- `POST /api/construction/sites` - 建立施工現場
- `GET /api/construction/inspections` - 取得會勘記錄
- `POST /api/construction/inspections` - 建立會勘記錄

## 資料庫架構

### 核心資料表
- `users` - 使用者資料
- `roles` - 角色定義
- `projects` - 專案資料
- `construction_sites` - 施工現場
- `monitoring_points` - 監控點
- `notifications` - 通知記錄
- `analysis_jobs` - 分析工作
- `system_parameters` - 系統參數

詳細的資料庫結構請參考 `database/schema.sql`

## 開發指南

### 目錄結構
```
mx-data-platform-prototype/
├── client/                 # 前端應用程式
│   ├── src/
│   │   ├── components/    # React 組件
│   │   ├── pages/         # 頁面組件
│   │   ├── services/      # API 服務
│   │   └── utils/         # 工具函數
├── routes/                # 後端路由
├── middleware/            # 中間件
├── database/              # 資料庫相關
├── models/                # 資料模型
└── uploads/               # 檔案上傳目錄
```

### 程式碼風格
- 使用 ES6+ 語法
- 遵循 JSDoc 註解規範
- 使用 Prettier 格式化程式碼
- 遵循 ESLint 規則

### 測試
```bash
# 執行單元測試
npm test

# 執行整合測試
npm run test:integration
```

## 部署說明

### 生產環境部署
1. 建立生產環境資料庫
2. 設定環境變數
3. 建構前端應用程式
4. 啟動後端伺服器

```bash
# 建構前端
npm run build

# 啟動生產伺服器
npm start
```

### Docker 部署
```bash
# 建構 Docker 映像
docker build -t mx-data-platform .

# 執行容器
docker run -p 5000:5000 mx-data-platform
```

## 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 聯絡資訊

- 專案維護者：MX Data Platform Team
- Email：support@mx-platform.com
- 專案網站：https://mx-data-platform.com

## 更新日誌

### v1.0.0 (2024-01-22)
- 初始版本發布
- 完整的五大模組功能
- 基礎認證與授權系統
- 響應式 UI 設計
- API 文件與測試

---

## 注意事項

- 這是一個原型系統，用於概念驗證和功能展示
- 生產環境使用前請進行完整的安全性審查
- 定期更新相依套件以修補安全漏洞
- 建議使用 HTTPS 加密所有網路通信