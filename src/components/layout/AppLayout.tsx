import React from 'react';
import { Layout, Select, Input } from 'antd';
import { SearchOutlined, GlobalOutlined } from '@ant-design/icons';
import AppSidebar from '@/components/layout/AppSidebar';

const { Content, Header } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />
      <Layout style={{ marginLeft: 220, background: '#fafafa' }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: '1px solid #f0f0f0',
            height: 56,
            gap: 16,
          }}
        >
          <Input
            placeholder="Search items..."
            prefix={<SearchOutlined style={{ color: '#bbb' }} />}
            style={{ width: 200, borderRadius: 6 }}
          />
          <Select
            defaultValue="english"
            style={{ width: 100 }}
            options={[{ value: 'english', label: 'English' }]}
            suffixIcon={<GlobalOutlined />}
          />
        </Header>
        <Content style={{ padding: '24px', minHeight: 'calc(100vh - 56px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
