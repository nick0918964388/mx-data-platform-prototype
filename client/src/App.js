import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { mantineTheme } from './theme/mantine-theme';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import ConstructionManagement from './pages/ConstructionManagement/ConstructionManagement';
import MonitoringNotifications from './pages/MonitoringNotifications/MonitoringNotifications';
import DataAnalytics from './pages/DataAnalytics/DataAnalytics';
import SystemManagement from './pages/SystemManagement/SystemManagement';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

function App() {
  return (
    <MantineProvider theme={mantineTheme}>
      <Notifications />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-management/*" element={<ProjectManagement />} />
          <Route path="/construction-management/*" element={<ConstructionManagement />} />
          <Route path="/monitoring/*" element={<MonitoringNotifications />} />
          <Route path="/analytics/*" element={<DataAnalytics />} />
          <Route path="/system/*" element={<SystemManagement />} />
        </Routes>
      </Layout>
    </MantineProvider>
  );
}

export default App;