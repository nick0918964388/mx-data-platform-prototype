import { 
  IconPlayerPlay, IconCheck, IconX, IconClock, IconPlayerPause,
  IconDoor, IconBuilding, IconCertificate, IconFileText, IconTools, IconDashboard, IconSettingsAutomation
} from '@tabler/icons-react';

// 狀態顏色映射
export const getStatusColor = (status) => {
  switch (status) {
    case 'running': return 'blue';
    case 'success': return 'green';
    case 'failed': return 'red';
    case 'waiting': return 'yellow';
    case 'disabled': return 'gray';
    default: return 'gray';
  }
};

// 狀態圖示映射
export const getStatusIcon = (status) => {
  switch (status) {
    case 'running': return IconPlayerPlay;
    case 'success': return IconCheck;
    case 'failed': return IconX;
    case 'waiting': return IconClock;
    case 'disabled': return IconPlayerPause;
    default: return IconClock;
  }
};

// 系統圖示映射
export const getSystemIcon = (iconName) => {
  switch (iconName) {
    case 'IconDoor': return IconDoor;
    case 'IconBuilding': return IconBuilding;
    case 'IconCertificate': return IconCertificate;
    case 'IconFileText': return IconFileText;
    case 'IconTools': return IconTools;
    case 'IconDashboard': return IconDashboard;
    default: return IconSettingsAutomation;
  }
};

// 格式化執行時間
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`;
}; 