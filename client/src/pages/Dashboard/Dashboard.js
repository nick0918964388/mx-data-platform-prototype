import React, { useState } from 'react';
import { 
  Box, Grid, Paper, Title, Text, Card, Badge, 
  Progress, Group, Stack, Divider, ThemeIcon, Select
} from '@mantine/core';
import {
  IconClipboardList, IconTool, IconAlertTriangle,
  IconCheck, IconCalendar, IconUsers, IconBuilding,
  IconTrendingUp
} from '@tabler/icons-react';
import { BarChart, LineChart, CompositeChart } from '@mantine/charts';
import IndicatorCards from '../../components/IndicatorCards/IndicatorCards';

const Dashboard = () => {
  // 廠區篩選狀態
  const [selectedPlant, setSelectedPlant] = useState('ALL');

  // Mock data for dashboard
  const stats = [
    { title: '進行中專案', value: 12, icon: <IconClipboardList />, color: '#6366f1', bgColor: '#f8fafc' },
    { title: '施工現場', value: 8, icon: <IconTool />, color: '#059669', bgColor: '#f0fdf4' },
    { title: '待處理工單', value: 23, icon: <IconAlertTriangle />, color: '#ea580c', bgColor: '#fef3e2' },
    { title: '完成任務', value: 156, icon: <IconCheck />, color: '#0d9488', bgColor: '#f0fdfa' },
  ];

  const recentProjects = [
    { id: 1, name: 'AP5建廠工程', progress: 65, status: '進行中', manager: '王工程師' },
    { id: 2, name: 'AP6建廠工程', progress: 42, status: '進行中', manager: '李工程師' },
  ];

  const workerData = [
    { plant: 'AP7廠區', workers: 156 },
    { plant: 'AP4廠區', workers: 225 },
    { plant: 'AP3廠區', workers: 198 },
    { plant: 'AP6廠區', workers: 342 },
    { plant: 'AP5廠區', workers: 285 },
  ];

  // 近30日廠商入廠次數數據
  const vendorEntryData = [
    { date: '11/01', 機電廠商: 12, 土木廠商: 8, 材料供應商: 15, 總計: 35 },
    { date: '11/05', 機電廠商: 15, 土木廠商: 12, 材料供應商: 18, 總計: 45 },
    { date: '11/10', 機電廠商: 18, 土木廠商: 15, 材料供應商: 22, 總計: 55 },
    { date: '11/15', 機電廠商: 22, 土木廠商: 18, 材料供應商: 25, 總計: 65 },
    { date: '11/20', 機電廠商: 20, 土木廠商: 16, 材料供應商: 20, 總計: 56 },
    { date: '11/25', 機電廠商: 25, 土木廠商: 20, 材料供應商: 28, 總計: 73 },
    { date: '11/30', 機電廠商: 28, 土木廠商: 22, 材料供應商: 30, 總計: 80 },
  ];

  // 廠區選項
  const plantOptions = [
    { value: 'ALL', label: '全廠區' },
    { value: 'F20', label: 'F20廠區' },
    { value: 'F18', label: 'F18廠區' },
    { value: 'AP6', label: 'AP6廠區' },
    { value: 'AP8', label: 'AP8廠區' },
  ];

  // 各廠區總出工趨勢數據
  const plantWorkerData = {
    ALL: [
    // 已發生（實際數據）- 前60個數據點
    { date: '10/01', 實際出工: 950, 計畫人數: 915, 預測人數: 970 },
    { date: '10/02', 實際出工: 945, 計畫人數: 925, 預測人數: 965 },
    { date: '10/03', 實際出工: 940, 計畫人數: 930, 預測人數: 960 },
    { date: '10/04', 實際出工: 935, 計畫人數: 945, 預測人數: 955 },
    { date: '10/05', 實際出工: 930, 計畫人數: 945, 預測人數: 950 },
    { date: '10/06', 實際出工: 925, 計畫人數: 945, 預測人數: 945 },
    { date: '10/07', 實際出工: 920, 計畫人數: 955, 預測人數: 940 },
    { date: '10/08', 實際出工: 903, 計畫人數: 932, 預測人數: 935 },
    { date: '10/09', 實際出工: 925, 計畫人數: 955, 預測人數: 930 },
    { date: '10/10', 實際出工: 905, 計畫人數: 915, 預測人數: 925 },
    { date: '10/11', 實際出工: 911, 計畫人數: 920, 預測人數: 930 },
    { date: '10/12', 實際出工: 915, 計畫人數: 925, 預測人數: 935 },
    { date: '10/13', 實際出工: 955, 計畫人數: 930, 預測人數: 940 },
    { date: '10/14', 實際出工: 933, 計畫人數: 935, 預測人數: 945 },
    { date: '10/15', 實際出工: 930, 計畫人數: 940, 預測人數: 950 },
    { date: '10/16', 實際出工: 935, 計畫人數: 945, 預測人數: 955 },
    { date: '10/17', 實際出工: 940, 計畫人數: 950, 預測人數: 960 },
    { date: '10/18', 實際出工: 923, 計畫人數: 955, 預測人數: 965 },
    { date: '10/19', 實際出工: 950, 計畫人數: 960, 預測人數: 970 },
    { date: '10/20', 實際出工: 999, 計畫人數: 965, 預測人數: 975 },
    { date: '10/21', 實際出工: 923, 計畫人數: 970, 預測人數: 980 },
    { date: '10/22', 實際出工: 965, 計畫人數: 975, 預測人數: 985 },
    { date: '10/23', 實際出工: 945, 計畫人數: 980, 預測人數: 990 },
    { date: '10/24', 實際出工: 976, 計畫人數: 985, 預測人數: 995 },
    { date: '10/25', 實際出工: 980, 計畫人數: 990, 預測人數: 1000 },
    { date: '10/26', 實際出工: 985, 計畫人數: 995, 預測人數: 1005 },
    { date: '10/27', 實際出工: 990, 計畫人數: 1000, 預測人數: 1010 },
    { date: '10/28', 實際出工: 995, 計畫人數: 1005, 預測人數: 1015 },
    { date: '10/29', 實際出工: 1000, 計畫人數: 1010, 預測人數: 1020 },
    { date: '10/30', 實際出工: 1005, 計畫人數: 1015, 預測人數: 1025 },
    { date: '10/31', 實際出工: 1010, 計畫人數: 1020, 預測人數: 1030 },
    { date: '11/01', 實際出工: 1015, 計畫人數: 1025, 預測人數: 1035 },
    { date: '11/02', 實際出工: 1020, 計畫人數: 1030, 預測人數: 1040 },
    { date: '11/03', 實際出工: 996, 計畫人數: 1035, 預測人數: 1045 },
    { date: '11/04', 實際出工: 995, 計畫人數: 1040, 預測人數: 1050 },
    { date: '11/05', 實際出工: 1035, 計畫人數: 1045, 預測人數: 1055 },
    { date: '11/06', 實際出工: 1040, 計畫人數: 1050, 預測人數: 1060 },
    { date: '11/07', 實際出工: 1045, 計畫人數: 1055, 預測人數: 1065 },
    { date: '11/08', 實際出工: 1050, 計畫人數: 1060, 預測人數: 1070 },
    { date: '11/09', 實際出工: 1055, 計畫人數: 1065, 預測人數: 1075 },
    { date: '11/10', 實際出工: 1060, 計畫人數: 1070, 預測人數: 1080 },
    { date: '11/11', 實際出工: 1065, 計畫人數: 1075, 預測人數: 1085 },
    { date: '11/12', 實際出工: 1070, 計畫人數: 1080, 預測人數: 1090 },
    { date: '11/13', 實際出工: 1075, 計畫人數: 1085, 預測人數: 1095 },
    { date: '11/14', 實際出工: 1080, 計畫人數: 1090, 預測人數: 1100 },
    { date: '11/15', 實際出工: 1085, 計畫人數: 1095, 預測人數: 1105 },
    { date: '11/16', 實際出工: 1090, 計畫人數: 1100, 預測人數: 1110 },
    { date: '11/17', 實際出工: 999, 計畫人數: 1105, 預測人數: 1115 },
    { date: '11/18', 實際出工: 999, 計畫人數: 1110, 預測人數: 1120 },
    { date: '11/19', 實際出工: 903, 計畫人數: 1115, 預測人數: 1125 },
    { date: '11/20', 實際出工: 924, 計畫人數: 1120, 預測人數: 1130 },
    { date: '11/21', 實際出工: 945, 計畫人數: 1125, 預測人數: 1135 },
    { date: '11/22', 實際出工: 955, 計畫人數: 1130, 預測人數: 1140 },
    { date: '11/23', 實際出工: 996, 計畫人數: 1135, 預測人數: 1145 },
    { date: '11/24', 實際出工: 1130, 計畫人數: 1140, 預測人數: 1150 },
    { date: '11/25', 實際出工: 1135, 計畫人數: 1145, 預測人數: 1155 },
    { date: '11/26', 實際出工: 1140, 計畫人數: 1150, 預測人數: 1160 },
    { date: '11/27', 實際出工: 1145, 計畫人數: 1155, 預測人數: 1165 },
    { date: '11/28', 實際出工: 1150, 計畫人數: 1160, 預測人數: 1170 },
    { date: '11/29', 實際出工: 1155, 計畫人數: 1165, 預測人數: 1175 },
    { date: '11/30', 實際出工: 789, 計畫人數: 1170, 預測人數: 1180 },
    // 未來（預測數據）- 後60個數據點
    { date: '12/01', 實際出工: null, 計畫人數: 1175, 預測人數: 1185 },
    { date: '12/02', 實際出工: null, 計畫人數: 1180, 預測人數: 1190 },
    { date: '12/03', 實際出工: null, 計畫人數: 1185, 預測人數: 1195 },
    { date: '12/04', 實際出工: null, 計畫人數: 1190, 預測人數: 1200 },
    { date: '12/05', 實際出工: null, 計畫人數: 1195, 預測人數: 1205 },
    { date: '12/06', 實際出工: null, 計畫人數: 1200, 預測人數: 1210 },
    { date: '12/07', 實際出工: null, 計畫人數: 1205, 預測人數: 1215 },
    { date: '12/08', 實際出工: null, 計畫人數: 1210, 預測人數: 1220 },
    { date: '12/09', 實際出工: null, 計畫人數: 1215, 預測人數: 1225 },
    { date: '12/10', 實際出工: null, 計畫人數: 1220, 預測人數: 1230 },
    { date: '12/11', 實際出工: null, 計畫人數: 1225, 預測人數: 1235 },
    { date: '12/12', 實際出工: null, 計畫人數: 1230, 預測人數: 1240 },
    { date: '12/13', 實際出工: null, 計畫人數: 1235, 預測人數: 1245 },
    { date: '12/14', 實際出工: null, 計畫人數: 1240, 預測人數: 1250 },
    { date: '12/15', 實際出工: null, 計畫人數: 1245, 預測人數: 1255 },
    { date: '12/16', 實際出工: null, 計畫人數: 1250, 預測人數: 1260 },
    { date: '12/17', 實際出工: null, 計畫人數: 1255, 預測人數: 1265 },
    { date: '12/18', 實際出工: null, 計畫人數: 1260, 預測人數: 1270 },
    { date: '12/19', 實際出工: null, 計畫人數: 1265, 預測人數: 1275 },
    { date: '12/20', 實際出工: null, 計畫人數: 1270, 預測人數: 1280 },
    { date: '12/21', 實際出工: null, 計畫人數: 1275, 預測人數: 1285 },
    { date: '12/22', 實際出工: null, 計畫人數: 1280, 預測人數: 1290 },
    { date: '12/23', 實際出工: null, 計畫人數: 1285, 預測人數: 1295 },
    { date: '12/24', 實際出工: null, 計畫人數: 1290, 預測人數: 1300 },
    { date: '12/25', 實際出工: null, 計畫人數: 1295, 預測人數: 1305 },
    { date: '12/26', 實際出工: null, 計畫人數: 1295, 預測人數: 1310 },
    { date: '12/27', 實際出工: null, 計畫人數: 1250, 預測人數: 1315 },
    { date: '12/28', 實際出工: null, 計畫人數: 1235, 預測人數: 1320 },
    { date: '12/29', 實際出工: null, 計畫人數: 1320, 預測人數: 1325 },
    { date: '12/30', 實際出工: null, 計畫人數: 1335, 預測人數: 1330 },
    { date: '12/31', 實際出工: null, 計畫人數: 1332, 預測人數: 1335 },
    { date: '01/01', 實際出工: null, 計畫人數: 1234, 預測人數: 1340 },
    { date: '01/02', 實際出工: null, 計畫人數: 1234, 預測人數: 1345 },
    { date: '01/03', 實際出工: null, 計畫人數: 1123, 預測人數: 1350 },
    { date: '01/04', 實際出工: null, 計畫人數: 1123, 預測人數: 1355 },
    { date: '01/05', 實際出工: null, 計畫人數: 1123, 預測人數: 1360 },
    { date: '01/06', 實際出工: null, 計畫人數: 1123, 預測人數: 1365 },
    { date: '01/07', 實際出工: null, 計畫人數: 1360, 預測人數: 1370 },
    { date: '01/08', 實際出工: null, 計畫人數: 1123, 預測人數: 1375 },
    { date: '01/09', 實際出工: null, 計畫人數: 1123, 預測人數: 1380 },
    { date: '01/10', 實際出工: null, 計畫人數: 1123, 預測人數: 1385 },
    { date: '01/11', 實際出工: null, 計畫人數: 1023, 預測人數: 1390 },
    { date: '01/12', 實際出工: null, 計畫人數: 1023, 預測人數: 1395 },
    { date: '01/13', 實際出工: null, 計畫人數: 1023, 預測人數: 1400 },
    { date: '01/14', 實際出工: null, 計畫人數: 1023, 預測人數: 1405 },
    { date: '01/15', 實際出工: null, 計畫人數: 1023, 預測人數: 1410 },
    { date: '01/16', 實際出工: null, 計畫人數: 1023, 預測人數: 1415 },
    { date: '01/17', 實際出工: null, 計畫人數: 999, 預測人數: 1420 },
    { date: '01/18', 實際出工: null, 計畫人數: 999, 預測人數: 1425 },
    { date: '01/19', 實際出工: null, 計畫人數: 999, 預測人數: 1430 },
    { date: '01/20', 實際出工: null, 計畫人數: 1425, 預測人數: 1435 },
    { date: '01/21', 實際出工: null, 計畫人數: 999, 預測人數: 1440 },
    { date: '01/22', 實際出工: null, 計畫人數: 999, 預測人數: 1445 },
    { date: '01/23', 實際出工: null, 計畫人數: 999, 預測人數: 1450 },
    { date: '01/24', 實際出工: null, 計畫人數: 999, 預測人數: 1455 },
    { date: '01/25', 實際出工: null, 計畫人數: 999, 預測人數: 1460 },
    { date: '01/26', 實際出工: null, 計畫人數: 850, 預測人數: 1465 },
    { date: '01/27', 實際出工: null, 計畫人數: 700, 預測人數: 1470 },
    { date: '01/28', 實際出工: null, 計畫人數: 700, 預測人數: 1475 },
    { date: '01/29', 實際出工: null, 計畫人數: 500, 預測人數: 1480 },
    { date: '01/30', 實際出工: null, 計畫人數: 300, 預測人數: 1485 },
         { date: '01/31', 實際出工: null, 計畫人數: 250, 預測人數: 1490 },
    ],
    F20: [
      // F20廠區數據（簡化版）
      { date: '10/01', 實際出工: 320, 計畫人數: 315, 預測人數: 325 },
      { date: '10/05', 實際出工: 315, 計畫人數: 320, 預測人數: 330 },
      { date: '10/10', 實際出工: 325, 計畫人數: 330, 預測人數: 335 },
      { date: '10/15', 實際出工: 330, 計畫人數: 335, 預測人數: 340 },
      { date: '10/20', 實際出工: 335, 計畫人數: 340, 預測人數: 345 },
      { date: '10/25', 實際出工: 340, 計畫人數: 345, 預測人數: 350 },
      { date: '10/30', 實際出工: 320, 計畫人數: 350, 預測人數: 355 },
      { date: '11/01', 實際出工: 345, 計畫人數: 355, 預測人數: 360 },
      { date: '11/05', 實際出工: 350, 計畫人數: 360, 預測人數: 365 },
      { date: '11/10', 實際出工: 355, 計畫人數: 365, 預測人數: 370 },
      { date: '11/15', 實際出工: 340, 計畫人數: 370, 預測人數: 375 },
      { date: '11/20', 實際出工: 365, 計畫人數: 375, 預測人數: 380 },
      { date: '11/25', 實際出工: 370, 計畫人數: 380, 預測人數: 385 },
      { date: '11/30', 實際出工: 260, 計畫人數: 385, 預測人數: 390 },
      // 未來預測
      { date: '12/01', 實際出工: null, 計畫人數: 390, 預測人數: 395 },
      { date: '12/05', 實際出工: null, 計畫人數: 395, 預測人數: 400 },
      { date: '12/10', 實際出工: null, 計畫人數: 400, 預測人數: 405 },
      { date: '12/15', 實際出工: null, 計畫人數: 405, 預測人數: 410 },
      { date: '12/20', 實際出工: null, 計畫人數: 410, 預測人數: 415 },
      { date: '12/25', 實際出工: null, 計畫人數: 415, 預測人數: 420 },
      { date: '12/30', 實際出工: null, 計畫人數: 420, 預測人數: 425 },
    ],
    F18: [
      // F18廠區數據
      { date: '10/01', 實際出工: 280, 計畫人數: 275, 預測人數: 285 },
      { date: '10/05', 實際出工: 275, 計畫人數: 280, 預測人數: 290 },
      { date: '10/10', 實際出工: 285, 計畫人數: 290, 預測人數: 295 },
      { date: '10/15', 實際出工: 290, 計畫人數: 295, 預測人數: 300 },
      { date: '10/20', 實際出工: 295, 計畫人數: 300, 預測人數: 305 },
      { date: '10/25', 實際出工: 300, 計畫人數: 305, 預測人數: 310 },
      { date: '10/30', 實際出工: 280, 計畫人數: 310, 預測人數: 315 },
      { date: '11/01', 實際出工: 305, 計畫人數: 315, 預測人數: 320 },
      { date: '11/05', 實際出工: 310, 計畫人數: 320, 預測人數: 325 },
      { date: '11/10', 實際出工: 315, 計畫人數: 325, 預測人數: 330 },
      { date: '11/15', 實際出工: 300, 計畫人數: 330, 預測人數: 335 },
      { date: '11/20', 實際出工: 325, 計畫人數: 335, 預測人數: 340 },
      { date: '11/25', 實際出工: 330, 計畫人數: 340, 預測人數: 345 },
      { date: '11/30', 實際出工: 220, 計畫人數: 345, 預測人數: 350 },
      // 未來預測
      { date: '12/01', 實際出工: null, 計畫人數: 350, 預測人數: 355 },
      { date: '12/05', 實際出工: null, 計畫人數: 355, 預測人數: 360 },
      { date: '12/10', 實際出工: null, 計畫人數: 360, 預測人數: 365 },
      { date: '12/15', 實際出工: null, 計畫人數: 365, 預測人數: 370 },
      { date: '12/20', 實際出工: null, 計畫人數: 370, 預測人數: 375 },
      { date: '12/25', 實際出工: null, 計畫人數: 375, 預測人數: 380 },
      { date: '12/30', 實際出工: null, 計畫人數: 380, 預測人數: 385 },
    ],
    AP6: [
      // AP6廠區數據
      { date: '10/01', 實際出工: 180, 計畫人數: 175, 預測人數: 185 },
      { date: '10/05', 實際出工: 175, 計畫人數: 180, 預測人數: 190 },
      { date: '10/10', 實際出工: 185, 計畫人數: 190, 預測人數: 195 },
      { date: '10/15', 實際出工: 190, 計畫人數: 195, 預測人數: 200 },
      { date: '10/20', 實際出工: 195, 計畫人數: 200, 預測人數: 205 },
      { date: '10/25', 實際出工: 200, 計畫人數: 205, 預測人數: 210 },
      { date: '10/30', 實際出工: 180, 計畫人數: 210, 預測人數: 215 },
      { date: '11/01', 實際出工: 205, 計畫人數: 215, 預測人數: 220 },
      { date: '11/05', 實際出工: 210, 計畫人數: 220, 預測人數: 225 },
      { date: '11/10', 實際出工: 215, 計畫人數: 225, 預測人數: 230 },
      { date: '11/15', 實際出工: 200, 計畫人數: 230, 預測人數: 235 },
      { date: '11/20', 實際出工: 225, 計畫人數: 235, 預測人數: 240 },
      { date: '11/25', 實際出工: 230, 計畫人數: 240, 預測人數: 245 },
      { date: '11/30', 實際出工: 170, 計畫人數: 245, 預測人數: 250 },
      // 未來預測
      { date: '12/01', 實際出工: null, 計畫人數: 250, 預測人數: 255 },
      { date: '12/05', 實際出工: null, 計畫人數: 255, 預測人數: 260 },
      { date: '12/10', 實際出工: null, 計畫人數: 260, 預測人數: 265 },
      { date: '12/15', 實際出工: null, 計畫人數: 265, 預測人數: 270 },
      { date: '12/20', 實際出工: null, 計畫人數: 270, 預測人數: 275 },
      { date: '12/25', 實際出工: null, 計畫人數: 275, 預測人數: 280 },
      { date: '12/30', 實際出工: null, 計畫人數: 280, 預測人數: 285 },
    ],
    AP8: [
      // AP8廠區數據
      { date: '10/01', 實際出工: 170, 計畫人數: 165, 預測人數: 175 },
      { date: '10/05', 實際出工: 165, 計畫人數: 170, 預測人數: 180 },
      { date: '10/10', 實際出工: 175, 計畫人數: 180, 預測人數: 185 },
      { date: '10/15', 實際出工: 180, 計畫人數: 185, 預測人數: 190 },
      { date: '10/20', 實際出工: 185, 計畫人數: 190, 預測人數: 195 },
      { date: '10/25', 實際出工: 190, 計畫人數: 195, 預測人數: 200 },
      { date: '10/30', 實際出工: 170, 計畫人數: 200, 預測人數: 205 },
      { date: '11/01', 實際出工: 195, 計畫人數: 205, 預測人數: 210 },
      { date: '11/05', 實際出工: 200, 計畫人數: 210, 預測人數: 215 },
      { date: '11/10', 實際出工: 205, 計畫人數: 215, 預測人數: 220 },
      { date: '11/15', 實際出工: 190, 計畫人數: 220, 預測人數: 225 },
      { date: '11/20', 實際出工: 215, 計畫人數: 225, 預測人數: 230 },
      { date: '11/25', 實際出工: 220, 計畫人數: 230, 預測人數: 235 },
      { date: '11/30', 實際出工: 160, 計畫人數: 235, 預測人數: 240 },
      // 未來預測
      { date: '12/01', 實際出工: null, 計畫人數: 240, 預測人數: 245 },
      { date: '12/05', 實際出工: null, 計畫人數: 245, 預測人數: 250 },
      { date: '12/10', 實際出工: null, 計畫人數: 250, 預測人數: 255 },
      { date: '12/15', 實際出工: null, 計畫人數: 255, 預測人數: 260 },
      { date: '12/20', 實際出工: null, 計畫人數: 260, 預測人數: 265 },
      { date: '12/25', 實際出工: null, 計畫人數: 265, 預測人數: 270 },
      { date: '12/30', 實際出工: null, 計畫人數: 270, 預測人數: 275 },
    ]
  };

  // 根據選中廠區獲取數據
  const workerTrendData = plantWorkerData[selectedPlant];

  return (
    <Box p="lg">
      {/* Header */}
      <Box mb="xl">
        
        
      </Box>

      {/* Statistics Cards */}
      <Grid gutter="md" mb="xl">
        {stats.map((stat, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              style={{
                backgroundColor: stat.bgColor,
                border: `1px solid #e5e7eb`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
              }}
              styles={{
                root: {
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderColor: stat.color,
                  },
                },
              }}
            >
              <Group justify="space-between">
                <Box>
                  <Title order={3} fw={600} c={stat.color} mb={4}>
                    {stat.value}
                  </Title>
                  <Text size="sm" c="gray.6">
                    {stat.title}
                  </Text>
                </Box>
                <ThemeIcon
                  size={48}
                  radius="md"
                  style={{
                    backgroundColor: stat.color + '15',
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid gutter="md" mb="xl">
        {/* Recent Projects */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper shadow="sm" p="lg" radius="md" h={400} style={{ display: 'flex', flexDirection: 'column' }}>
            <Title order={4} fw={600} c="dark.8" mb="md">
              近期專案
            </Title>
            <Stack gap="lg" style={{ flex: 1, overflowY: 'auto' }}>
              {recentProjects.map((project) => (
                <Box key={project.id}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="md">
                      {project.name}
                    </Text>
                    <Badge
                      color={project.status === '進行中' ? 'blue' : 'green'}
                      variant="light"
                      size="sm"
                    >
                      {project.status}
                    </Badge>
                  </Group>
                  
                  <Group mb="xs" gap="xs">
                    <IconUsers size={16} color="#6c757d" />
                    <Text size="sm" c="gray.6">
                      {project.manager}
                    </Text>
                  </Group>
                  
                  <Group align="center" gap="md">
                    <Text size="sm" c="gray.6" style={{ minWidth: 60 }}>
                      進度: {project.progress}%
                    </Text>
                    <Progress 
                      value={project.progress} 
                      size="sm"
                      radius="md"
                      style={{ flex: 1 }}
                    />
                  </Group>
                  
                  {project.id !== recentProjects.length && <Divider mt="md" />}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Worker Count Chart */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper shadow="sm" p="lg" radius="md" h={400} style={{ display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" mb="md">
              <Title order={4} fw={600} c="dark.8">
                各廠區總出工人數
              </Title>
              <Badge
                size="sm"
                style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                }}
              >
                總計: {workerData.reduce((sum, item) => sum + item.workers, 0)}人
              </Badge>
            </Group>
            
            <BarChart
              h={300}
              data={workerData}
              dataKey="plant"
              orientation="vertical"
              withTooltip
              gridColor="gray.3"
              textColor="gray.7"
              tooltipProps={{
                formatter: (value) => [`${value}人`, '出工人數'],
                contentStyle: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                },
                labelStyle: { color: '#374151', fontWeight: 500 }
              }}
              yAxisProps={{ 
                width: 70,
                tick: { fontSize: 11 }
              }}
              xAxisProps={{
                domain: [0, 400],
                tick: { fontSize: 11 }
              }}
              series={[
                { name: 'workers', color: 'indigo.6', label: '出工人數' }
              ]}
            />
          </Paper>
        </Grid.Col>

        {/* Vendor Entry Chart */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper shadow="sm" p="lg" radius="md" h={400} style={{ display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" mb="md">
              <Title order={4} fw={600} c="dark.8">
                近30日廠商入廠次數
              </Title>
              <Group gap="xs">
                <IconBuilding size={16} color="#6c757d" />
                <Text size="sm" c="gray.6">
                  依廠商類別
                </Text>
              </Group>
            </Group>
            
            <CompositeChart
              h={300}
              data={vendorEntryData}
              dataKey="date"
              withTooltip
              withLegend
              legendProps={{ 
                verticalAlign: 'bottom',
                height: 30
              }}
              gridColor="gray.3"
              textColor="gray.7"
              tooltipProps={{
                contentStyle: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                },
                labelStyle: { color: '#374151', fontWeight: 500 }
              }}
              xAxisProps={{
                tick: { fontSize: 11 }
              }}
              yAxisProps={{
                tick: { fontSize: 11 }
              }}
              series={[
                { 
                  name: '總計', 
                  color: 'gray.4', 
                  type: 'bar',
                  opacity: 0.6
                },
                { 
                  name: '機電廠商', 
                  color: 'blue.6', 
                  type: 'line',
                  strokeWidth: 2
                },
                { 
                  name: '土木廠商', 
                  color: 'green.6', 
                  type: 'line',
                  strokeWidth: 2
                },
                { 
                  name: '材料供應商', 
                  color: 'red.6', 
                  type: 'line',
                  strokeWidth: 2
                }
              ]}
            />
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Worker Trend Chart */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={12}>
          <Paper shadow="sm" p="lg" radius="md" h={350} style={{ display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" mb="md">
              <Group gap="md">
                <Title order={4} fw={600} c="dark.8">
                  總出工趨勢圖
                </Title>
                <Select
                  data={plantOptions}
                  value={selectedPlant}
                  onChange={setSelectedPlant}
                  size="sm"
                  w={120}
                  styles={{
                    input: {
                      fontSize: '12px',
                      height: '32px',
                    },
                  }}
                />
              </Group>
              <Group gap="xs">
                <IconTrendingUp size={16} color="#6c757d" />
                <Text size="sm" c="gray.6">
                  實際 vs 計畫 vs 預測
                </Text>
              </Group>
            </Group>
            
            <CompositeChart
              h={280}
              data={workerTrendData}
              dataKey="date"
              withTooltip
              withLegend
              legendProps={{ 
                verticalAlign: 'bottom',
                height: 30
              }}
              gridColor="gray.3"
              textColor="gray.7"
              tooltipProps={{
                contentStyle: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                },
                labelStyle: { color: '#374151', fontWeight: 500 },
                formatter: (value, name) => [`${value}人`, name]
              }}
              xAxisProps={{
                tick: { fontSize: 11 }
              }}
              yAxisProps={{
                tick: { fontSize: 11 },
                domain: selectedPlant === 'ALL' ? [800, 1500] : 'auto'
              }}
              series={[
                { 
                  name: '實際出工', 
                  color: 'orange.6',
                  type: 'bar',
                  opacity: 0.8
                },
                { 
                  name: '計畫人數', 
                  color: 'blue.6',
                  type: 'line',
                  strokeWidth: 2
                },
                { 
                  name: '預測人數', 
                  color: 'red.6',
                  type: 'line',
                  strokeWidth: 2,
                  strokeDasharray: '8 4'
                }
              ]}
            />
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Tasks Section */}
      <Paper shadow="sm" p="lg" radius="md">
        <Title order={4} fw={600} c="dark.8" mb="md">
          收件箱 / 工作指派
        </Title>
        
        <Box
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size="md" c="gray.5">
            尚未設定此 Portlet。若要設定，請在 Portlet 標頭中選取編輯圖示。
          </Text>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;