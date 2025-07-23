import React, { useState } from 'react';
import { AppShell, Burger, Group, Title, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconSettings, IconUser } from '@tabler/icons-react';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const Layout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Header style={{ backgroundColor: '#1a1a1a' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger 
              opened={opened} 
              onClick={toggle} 
              hiddenFrom="sm" 
              size="sm"
              color="white"
              aria-label={opened ? '收合選單' : '展開選單'}
            />
            <Burger 
              opened={opened} 
              onClick={toggle} 
              visibleFrom="sm" 
              size="sm"
              color="white"
              aria-label={opened ? '收合選單' : '展開選單'}
            />
            <Title order={4} c="white" fw={500}>
              MX 資料分析平台
            </Title>
          </Group>
          
          <Group gap="sm">
            <ActionIcon variant="subtle" color="white" size="lg">
              <IconBell style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="white" size="lg">
              <IconSettings style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="white" size="lg">
              <IconUser style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: '#f8f9fa',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Breadcrumb />
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;