import React from 'react';
import { Input, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOrderSuccessModalOpen } from '@/redux/slices/uiSlice';
import PageHeader from '@/components/layout/PageHeader';
import ProductFilters from '@/components/filters/ProductFilters';
import ProductCard from '@/components/cards/ProductCard';
import ProductDetailsModal from '@/components/modals/ProductDetailsModal';
import RecipientDetailsModal from '@/components/modals/RecipientDetailsModal';
import SuccessModal from '@/components/modals/SuccessModal';

const SendProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts } = useAppSelector((state) => state.product);
  const { orderSuccessModalOpen } = useAppSelector((state) => state.ui);

  return (
    <div>
      <PageHeader title="Send Product" />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          padding: '12px 16px',
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Send Item</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Input
            placeholder="Search items..."
            prefix={<SearchOutlined style={{ color: '#bbb' }} />}
            style={{ width: 200 }}
          />
          <Select
            defaultValue="sort"
            style={{ width: 100 }}
            options={[
              { value: 'sort', label: 'Sort' },
              { value: 'price-asc', label: 'Price ↑' },
              { value: 'price-desc', label: 'Price ↓' },
            ]}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220, flexShrink: 0 }}>
          <ProductFilters />
        </div>

        <div style={{ flex: 1 }}>
          <Row gutter={[16, 16]}>
            {filteredProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <ProductDetailsModal />
      <RecipientDetailsModal />
      <SuccessModal
        open={orderSuccessModalOpen}
        onClose={() => dispatch(setOrderSuccessModalOpen(false))}
        title="Order Sent Successfully!"
        subtitle="Your Order has been successfully created."
      />
    </div>
  );
};

export default SendProductPage;
