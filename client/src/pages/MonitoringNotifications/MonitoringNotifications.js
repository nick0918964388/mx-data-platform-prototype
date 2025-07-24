import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mantine/core';
import MonitoringManagement from './MonitoringManagement';
import NotificationManagement from './NotificationManagement';

const MonitoringNotifications = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<MonitoringManagement />} />
        <Route path="/management" element={<MonitoringManagement />} />
        <Route path="/notifications" element={<NotificationManagement />} />
      </Routes>
    </Box>
  );
};

export default MonitoringNotifications;