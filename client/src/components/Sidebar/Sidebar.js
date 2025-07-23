import React, { useState } from 'react';
import { NavLink, Collapse, Box, Text, Group, rem, Divider, Stack } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard,
  IconBriefcase,
  IconTool,
  IconHeartRateMonitor,
  IconChartBar,
  IconSettings,
  IconChevronRight,
  IconFolder,
  IconUsers,
  IconCalendar,
  IconCurrency,
  IconShield,
  IconAlertTriangle,
  IconClipboardList,
  IconHammer,
  IconLock,
  IconSearch,
  IconBell,
  IconChartLine,
  IconCalendarEvent,
  IconMessageQuestion,
  IconTable,
  IconPlug,
  IconTool as IconToolSettings,
  IconUserCheck,
  IconBook,
} from '@tabler/icons-react';

const menuItems = [
  {
    id: 'dashboard',
    title: '啟動中心',
    icon: <IconDashboard />,
    path: '/dashboard'
  },
  {
    id: 'project-management',
    title: '工程專案管理',
    icon: <IconBriefcase />,
    path: '/project-management',
    submenu: [
      { id: 'scope', title: '專案範疇', icon: <IconFolder />, path: '/project-management/scope' },
      { id: 'resources', title: '人力資源', icon: <IconUsers />, path: '/project-management/resources' },
      { id: 'schedule', title: '時程管理', icon: <IconCalendar />, path: '/project-management/schedule' },
      { id: 'cost', title: '成本管理', icon: <IconCurrency />, path: '/project-management/cost' },
      { id: 'quality', title: '品質管理', icon: <IconShield />, path: '/project-management/quality' },
      { id: 'risk', title: '風險與工單環保', icon: <IconAlertTriangle />, path: '/project-management/risk' },
    ]
  },
  {
    id: 'construction-management',
    title: '施工管理',
    icon: <IconTool />,
    path: '/construction-management',
    submenu: [
      { 
        id: 'pre-construction', 
        title: '施工前計畫', 
        icon: <IconClipboardList />,
        submenu: [
          { id: 'site-inspection', title: '會勘管理', path: '/construction-management/site-inspection' },
          { id: 'pre-meeting', title: '施工前會議管理', path: '/construction-management/pre-meeting' },
        ]
      },
      { 
        id: 'construction-control', 
        title: '施工管制', 
        icon: <IconHammer />,
        submenu: [
          { id: 'application', title: '施工申請管理', path: '/construction-management/application' },
          { id: 'records', title: '施工紀錄管理', path: '/construction-management/records' },
        ]
      },
      { 
        id: 'safety-audit', 
        title: '施工安全查核', 
        icon: <IconLock />,
        submenu: [
          { id: 'inspection', title: '施工巡檢管理', path: '/construction-management/inspection' },
          { id: 'tracking', title: '施工缺失追蹤管理', path: '/construction-management/tracking' },
        ]
      },
    ]
  },
  {
    id: 'monitoring',
    title: '監控與通知',
    icon: <IconHeartRateMonitor />,
    path: '/monitoring',
    submenu: [
      { id: 'monitoring-mgmt', title: '監控管理', icon: <IconSearch />, path: '/monitoring/management' },
      { id: 'notification-mgmt', title: '通知管理', icon: <IconBell />, path: '/monitoring/notifications' },
    ]
  },
  {
    id: 'analytics',
    title: '資料分析',
    icon: <IconChartBar />,
    path: '/analytics',
    submenu: [
      { id: 'analysis', title: '分析管理', icon: <IconChartLine />, path: '/analytics/analysis' },
      { id: 'scheduling', title: '資料排程管理', icon: <IconCalendarEvent />, path: '/analytics/scheduling' },
      { id: 'ai-qa', title: 'AI問答', icon: <IconMessageQuestion />, path: '/analytics/ai-qa' },
      { id: 'powerbi', title: '報表連結(PowerBI)', icon: <IconTable />, path: '/analytics/powerbi' },
    ]
  },
  {
    id: 'system',
    title: '系統管理',
    icon: <IconSettings />,
    path: '/system',
    submenu: [
      { id: 'integration', title: '系統整合監視', icon: <IconPlug />, path: '/system/integration' },
      { id: 'parameters', title: '系統參數管理', icon: <IconToolSettings />, path: '/system/parameters' },
      { id: 'permissions', title: '權限管理', icon: <IconUserCheck />, path: '/system/permissions' },
      { id: 'training', title: '教育訓練手冊', icon: <IconBook />, path: '/system/training' },
    ]
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});

  const handleItemClick = (item) => {
    if (item.submenu) {
      setOpenItems(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderMenuItem = (item, level = 0) => {
    const isActive = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = openItems[item.id];

    if (hasSubmenu) {
      return (
        <div key={item.id}>
          <NavLink
            label={item.title}
            leftSection={item.icon}
            rightSection={
              <IconChevronRight
                style={{ 
                  width: rem(16), 
                  height: rem(16),
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            }
            onClick={() => handleItemClick(item)}
            variant="subtle"
            style={{
              marginLeft: level * 16,
              borderRadius: 8,
            }}
          />
          <Collapse in={isOpen}>
            <Box pl="lg">
              {item.submenu.map(subItem => renderMenuItem(subItem, level + 1))}
            </Box>
          </Collapse>
        </div>
      );
    }

    return (
      <NavLink
        key={item.id}
        label={item.title}
        leftSection={item.icon}
        onClick={() => handleItemClick(item)}
        active={isActive}
        variant="subtle"
        style={{
          marginLeft: level * 16,
          borderRadius: 8,
        }}
      />
    );
  };

  return (
    <Box p="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack gap="xs" style={{ flex: 1, overflow: 'auto' }}>
        {menuItems.map(item => renderMenuItem(item))}
      </Stack>
      
      <Divider my="md" />
      
      <Text size="xs" c="dimmed" ta="center">
        © 2024 MX Data Platform
      </Text>
    </Box>
  );
};

export default Sidebar;