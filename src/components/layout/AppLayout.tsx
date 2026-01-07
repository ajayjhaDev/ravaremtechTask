import React from 'react';
import { Layout, Select, Input, Button } from 'antd';
import { SearchOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import AppSidebar from '@/components/layout/AppSidebar';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setSidebarCollapsed } from '@/redux/slices/uiSlice';

const { Content, Header } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />
      <Layout style={{ marginLeft: sidebarCollapsed ? 0 : 220, background: '#fafafa', transition: 'margin-left 200ms' }} className="app-main">
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            height: 56,
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => dispatch(setSidebarCollapsed(false))}
              className="mobile-menu-btn"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Input
              placeholder="Search items..."
              prefix={<SearchOutlined style={{ color: '#bbb' }} />}
              style={{ width: 200, borderRadius: 6 }}
              className="desktop-only"
            />
            <Select
              defaultValue="english"
              style={{ width: 100 }}
              options={[{ value: 'english', label: 'English' }]}
              suffixIcon={<GlobalOutlined />}
              className="desktop-only"
            />
          </div>
        </Header>
        <Content style={{ padding: '24px', minHeight: 'calc(100vh - 56px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
