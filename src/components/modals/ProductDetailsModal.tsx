import React, { useState } from 'react';
import { Modal, Button, Radio, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined, HeartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setProductDetailsModalOpen,
  setRecipientDetailsModalOpen,
} from '@/redux/slices/uiSlice';
import { addItemToOrder } from '@/redux/slices/orderSlice';

const ProductDetailsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productDetailsModalOpen } = useAppSelector((state) => state.ui);
  const { selectedProduct } = useAppSelector((state) => state.product);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    dispatch(setProductDetailsModalOpen(false));
    setSelectedColor('');
    setSelectedSize('');
    setQuantity(1);
  };

  const handleSendItem = () => {
    if (selectedProduct && selectedColor && selectedSize) {
      dispatch(
        addItemToOrder({
          product: selectedProduct,
          quantity,
          selectedColor,
          selectedSize,
        })
      );
      dispatch(setProductDetailsModalOpen(false));
      dispatch(setRecipientDetailsModalOpen(true));
    }
  };

  if (!selectedProduct) return null;

  return (
    <Modal
      title={null}
      open={productDetailsModalOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
      styles={{
        body: { padding: 0 },
      }}
    >
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
          Item Details
        </h3>
        <p style={{ margin: '4px 0 0', color: '#888', fontSize: 13 }}>
          Review product information, pricing, and specifications and select details wisely.
        </p>
      </div>

      <div style={{ display: 'flex', padding: 24, gap: 32 }}>
        <div style={{ width: 300 }}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>
            {selectedProduct.name}
          </h2>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#52c41a' }}>
            ${selectedProduct.price}
          </div>

          <div style={{ marginTop: 16 }}>
            <div
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 13,
                color: '#666',
              }}
            >
              Description
            </div>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Product Options Available
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 13,
                  color: '#666',
                  marginBottom: 8,
                }}
              >
                Select Colors
              </div>
              <Radio.Group
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                optionType="button"
                buttonStyle="solid"
              >
                {selectedProduct.colors.map((color) => (
                  <Radio.Button key={color} value={color}>
                    {color}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 13,
                  color: '#666',
                  marginBottom: 8,
                }}
              >
                Select Size
              </div>
              <Radio.Group
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                optionType="button"
                buttonStyle="solid"
              >
                {selectedProduct.sizes.map((size) => (
                  <Radio.Button key={size} value={size}>
                    {size}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#666' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Button
                  size="small"
                  icon={<MinusOutlined />}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                />
                <InputNumber
                  value={quantity}
                  min={1}
                  onChange={(val) => setQuantity(val || 1)}
                  style={{ width: 60 }}
                  controls={false}
                />
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
            }}
          >
            <HeartOutlined style={{ fontSize: 16, color: '#999' }} />
            <span style={{ fontSize: 13, color: '#999' }}>Add to Favorites</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12,
          padding: '16px 24px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <Button onClick={handleClose}>Back</Button>
        <Button
          type="primary"
          onClick={handleSendItem}
          disabled={!selectedColor || !selectedSize}
          style={{
            background: '#52c41a',
            borderColor: '#52c41a',
          }}
        >
          Send Item
        </Button>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
