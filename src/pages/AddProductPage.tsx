import React from 'react';
import {
  Card,
  Table,
  Button,
  Select,
  Tabs,
  Space,
  Tag,
  Pagination,
  Input,
} from 'antd';
import {
  FilterOutlined,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAddProductModalOpen, setAddProductSuccessModalOpen } from '@/redux/slices/uiSlice';
import { Product } from '@/types';
import PageHeader from '@/components/layout/PageHeader';
import AddProductModal from '@/components/modals/AddProductModal';
import SuccessModal from '@/components/modals/SuccessModal';

const AddProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { addProductSuccessModalOpen } = useAppSelector((state) => state.ui);

  const columns: ColumnsType<Product> = [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      width: 60,
      render: (image: string) => (
        <img
          src={image}
          alt="Product"
          style={{
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Product) => (
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#52c41a' }}>${record.price}</div>
        </div>
      ),
    },
    {
      title: 'Product Variant',
      dataIndex: 'colors',
      key: 'variant',
      render: (colors: string[]) => (
        <span style={{ color: '#666' }}>{colors.join(', ')}</span>
      ),
    },
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span style={{ color: '#666' }}>{id}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: () => (
        <Button
          type="link"
          style={{ color: '#a855f7', padding: 0 }}
        >
          Low on stock
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Add Product" />

      <Card
        style={{
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
              Product List
            </h3>
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              size="small"
              options={[{ value: 'all', label: 'All Categories' }]}
            />
          </div>

          <Space>
            <Tabs
              defaultActiveKey="all"
              size="small"
              items={[
                { key: 'all', label: 'All' },
                { key: 'active', label: 'Active 50' },
                { key: 'inactive', label: 'Inactive 21' },
              ]}
              style={{ marginBottom: 0 }}
            />
          </Space>
        </div>

        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            placeholder="Search Products..."
            prefix={<SearchOutlined style={{ color: '#bbb' }} />}
            style={{ width: 200 }}
          />

          <Space>
            <Button icon={<FilterOutlined />}>Bulk Action</Button>
            <Button>Sort</Button>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => dispatch(setAddProductModalOpen(true))}
              style={{
                background: '#52c41a',
                borderColor: '#52c41a',
              }}
            >
              Add Product
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={false}
          style={{ borderRadius: 0 }}
        />

        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pagination
            defaultCurrent={1}
            total={50}
            size="small"
            showSizeChanger={false}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#666' }}>See All Products</span>
            <Select
              defaultValue="10"
              size="small"
              style={{ width: 80 }}
              options={[
                { value: '10', label: '10 / page' },
                { value: '20', label: '20 / page' },
              ]}
            />
          </div>
        </div>
      </Card>

      <AddProductModal />
      <SuccessModal
        open={addProductSuccessModalOpen}
        onClose={() => dispatch(setAddProductSuccessModalOpen(false))}
        title="Product added Successfully"
        subtitle="Your request has been completed."
      />
    </div>
  );
};

export default AddProductPage;
