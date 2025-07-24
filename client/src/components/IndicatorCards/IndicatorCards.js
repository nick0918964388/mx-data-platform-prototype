import React from 'react';
import { Grid, Card, Text, Box, Group, ThemeIcon } from '@mantine/core';

const IndicatorCards = ({ data }) => {
  const defaultData = [
    {
      id: 1,
      title: '專案配置',
      primaryValue: '8',
      primaryLabel: '',
      secondaryItems: [
        { label: '專案起始', value: '2025/05/01' },
        { label: '計畫實質', value: '2026/11/01' },
        { label: '專案天數', value: '78/d' },
        { label: '完工期數', value: '472 d' }
      ],
      bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconBg: '#047857'
    },
    {
      id: 2,
      title: '專案進度',
      primaryValue: '-%/-%',
      primaryLabel: 'actual / plan',
      secondaryItems: [
        { label: '總體比例', value: '0%' },
        { label: '付款比例', value: '0%' }
      ],
      bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      iconBg: '#0284c7'
    },
    {
      id: 3,
      title: '今日工',
      primaryValue: '0',
      primaryLabel: 'MD (今天總人數)',
      secondaryItems: [
        { label: '總表工人', value: '0 MD (今天總人數)' },
        { label: '專案契約', value: '0 MD (今天總人數)' }
      ],
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      iconBg: '#d97706'
    },
    {
      id: 4,
      title: '送審文件',
      primaryValue: '53/368',
      primaryLabel: 'compl. / total',
      secondaryItems: [
        { label: '急需文件', value: '41/41 pcs (compl. / total)' },
        { label: '最繁繁度', value: '2/3 pcs (repl. / total)' }
      ],
      bgColor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      iconBg: '#db2777'
    }
  ];

  const cards = data || defaultData;

  return (
    <Grid gutter="md" mb="xl">
      {cards.map((card) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={card.id}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              height: '240px',
              background: card.bgColor,
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            styles={{
              root: {
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                },
              },
            }}
          >
            {/* Header with icon */}
            <Group justify="space-between" mb="md" wrap="nowrap">
              <Box style={{ flexShrink: 1, minWidth: 0 }}>
                <Text 
                  size="lg" 
                  fw={500} 
                  opacity={0.9}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {card.title}
                </Text>
              </Box>
              <ThemeIcon
                size={48}
                radius="md"
                style={{
                  backgroundColor: card.iconBg,
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <Text fw={700} size="lg">
                  {card.id}
                </Text>
              </ThemeIcon>
            </Group>

            {/* Primary value */}
            <Box mb="md" style={{ flexShrink: 0 }}>
              <Text 
                size="3.2rem" 
                fw={700} 
                lh={0.9}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {card.primaryValue}
              </Text>
              {card.primaryLabel && (
                <Text 
                  size="md" 
                  opacity={0.8} 
                  mt={4}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {card.primaryLabel}
                </Text>
              )}
            </Box>

            {/* Secondary items */}
            <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {card.secondaryItems.map((item, index) => (
                <Group key={index} justify="space-between" mb={8} wrap="nowrap">
                  <Text 
                    size="sm" 
                    opacity={0.9} 
                    fw={500}
                    style={{ 
                      flexShrink: 0,
                      maxWidth: '55%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text 
                    size="sm" 
                    fw={600}
                    style={{ 
                      flexShrink: 1,
                      textAlign: 'right',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '45%'
                    }}
                  >
                    {item.value}
                  </Text>
                </Group>
              ))}
            </Box>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default IndicatorCards;