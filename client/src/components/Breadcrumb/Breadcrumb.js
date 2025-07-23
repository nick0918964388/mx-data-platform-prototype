import React from 'react';
import { Breadcrumbs, Anchor, Text, rem } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconHome, IconChevronRight } from '@tabler/icons-react';

// 路徑映射配置 - 對應側邊欄的選單項目
const pathMap = {
  '/': '首頁',
  '/dashboard': '啟動中心',
  '/project-management': '工程專案管理',
  '/project-management/scope': '專案範疇',
  '/project-management/resources': '人力資源',
  '/project-management/schedule': '時程管理',
  '/project-management/cost': '成本管理',
  '/project-management/quality': '品質管理',
  '/project-management/risk': '風險與工單環保',
  '/construction-management': '施工管理',
  '/construction-management/site-inspection': '會勘管理',
  '/construction-management/pre-meeting': '施工前會議管理',
  '/construction-management/application': '施工申請管理',
  '/construction-management/records': '施工紀錄管理',
  '/construction-management/inspection': '施工巡檢管理',
  '/construction-management/tracking': '施工缺失追蹤管理',
  '/monitoring': '監控與通知',
  '/monitoring/management': '監控管理',
  '/monitoring/notifications': '通知管理',
  '/analytics': '資料分析',
  '/analytics/analysis': '分析管理',
  '/analytics/scheduling': '資料排程管理',
  '/analytics/ai-qa': 'AI問答',
  '/analytics/powerbi': '報表連結(PowerBI)',
  '/system': '系統管理',
  '/system/integration': '系統整合監視',
  '/system/parameters': '系統參數管理',
  '/system/permissions': '權限管理',
  '/system/training': '教育訓練手冊',
};

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 生成麵包屑路徑
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // 添加首頁
    breadcrumbs.push({
      title: '首頁',
      path: '/dashboard',
      isHome: true,
    });

    // 如果當前就是首頁，只顯示首頁
    if (location.pathname === '/' || location.pathname === '/dashboard') {
      return breadcrumbs;
    }

    // 生成路徑階層
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const title = pathMap[currentPath];
      
      if (title) {
        breadcrumbs.push({
          title,
          path: currentPath,
          isLast: index === pathSegments.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const items = breadcrumbs.map((item, index) => {
    if (item.isLast) {
      // 最後一項顯示為文字，不可點擊
      return (
        <Text key={item.path} size="sm" c="dimmed" fw={500}>
          {item.title}
        </Text>
      );
    }

    return (
      <Anchor
        key={item.path}
        onClick={() => navigate(item.path)}
        size="sm"
        fw={500}
        c="blue.7"
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: rem(4),
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = 'underline';
          e.currentTarget.style.color = '#1c7ed6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = 'none';
          e.currentTarget.style.color = '#364fc7';
        }}
      >
        {item.isHome && <IconHome size={14} />}
        {item.title}
      </Anchor>
    );
  });

  return (
    <Breadcrumbs
      separator={<IconChevronRight size={12} color="#868e96" />}
      separatorMargin="xs"
      style={{
        backgroundColor: '#ffffff',
        padding: `${rem(16)} ${rem(24)}`,
        borderBottom: '1px solid #dee2e6',
        fontSize: rem(13),
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {items}
    </Breadcrumbs>
  );
};

export default Breadcrumb; 