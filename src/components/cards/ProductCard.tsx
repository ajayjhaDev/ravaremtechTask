import React from 'react';
import { Card, Button } from 'antd';
import { useAppDispatch } from '@/redux/hooks';
import { selectProduct } from '@/redux/slices/productSlice';
import { setProductDetailsModalOpen } from '@/redux/slices/uiSlice';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleSendItem = () => {
    dispatch(selectProduct(product));
    dispatch(setProductDetailsModalOpen(true));
  };

  return (
    <Card
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
      styles={{
        body: { padding: 12 },
      }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{
            height: 160,
            objectFit: 'cover',
          }}
        />
      }
    >
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontWeight: 500, fontSize: 14 }}>{product.name}</span>
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: '#52c41a', fontWeight: 600, fontSize: 14 }}>
          ${product.price}
        </span>
      </div>
      <Button
        type="link"
        style={{
          padding: 0,
          height: 'auto',
          color: '#a855f7',
          fontSize: 12,
        }}
        onClick={handleSendItem}
      >
        ➤ Send Item
      </Button>
    </Card>
  );
};

export default ProductCard;
