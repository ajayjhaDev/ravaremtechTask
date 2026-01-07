import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setActiveMenu, setSidebarCollapsed } from '@/redux/slices/uiSlice';

import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AppSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeMenu, sidebarCollapsed } = useAppSelector((state) => state.ui);

  const getSelectedKey = () => {
    if (location.pathname === '/add-product') return 'product-list';
    if (location.pathname === '/send-product') return 'send-item';
    return activeMenu;
  };

  const handleMenuClick = (key: string) => {
    dispatch(setActiveMenu(key));
    // close sidebar on mobile after navigation
    if (window.innerWidth < 992) dispatch(setSidebarCollapsed(true));

    if (key === 'product-list') {
      navigate('/add-product');
    } else if (key === 'send-item') {
      navigate('/send-product');
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'catalog',
      label: 'CATALOG',
      type: 'group' as const,
      children: [
        {
          key: 'product-list',
          icon: <ShoppingOutlined />,
          label: 'Product List',
        },
        {
          key: 'send-item',
          icon: <ShoppingOutlined />,
          label: 'Send Item',
        },
        {
          key: 'order-list',
          icon: <OrderedListOutlined />,
          label: 'Order List',
        },
      ],
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Notifications',
    },
    {
      key: 'cart-items',
      icon: <ShoppingCartOutlined />,
      label: 'Cart Items',
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={0}
      collapsed={sidebarCollapsed}
      onBreakpoint={(broken) => dispatch(setSidebarCollapsed(broken))}
      width={220}
      className="app-sider"
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: '#52c41a',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShoppingOutlined style={{ color: '#fff', fontSize: 18 }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: 16 }}>SHOEBOX</span>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        style={{ borderRight: 0, padding: '8px 0' }}
        onClick={({ key }) => handleMenuClick(key)}
        items={menuItems}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          padding: '16px 20px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UserOutlined style={{ fontSize: 18, color: '#666' }} />
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Allie Smith</div>
            <div style={{ fontSize: 12, color: '#999' }}>Admin</div>
          </div>
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            cursor: 'pointer',
          }}
        >
          <LogoutOutlined />
          <span style={{ fontSize: 13 }}>Log Out</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 20px',
          borderTop: '1px solid #f0f0f0',
          fontSize: 11,
          color: '#999',
        }}
      >
        ©2025 Sensible. All Rights Reserved.{' '}
        <a href="#" style={{ color: '#52c41a' }}>
          Privacy Policy
        </a>{' '}
        ·{' '}
        <a href="#" style={{ color: '#52c41a' }}>
          Version 1.0.1
        </a>
      </div>
    </Sider>
  );
};

export default AppSidebar;
