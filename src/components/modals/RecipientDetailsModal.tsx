import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setRecipientDetailsModalOpen,
  setOrderSuccessModalOpen,
} from '@/redux/slices/uiSlice';
import { setRecipientDetails, confirmOrder } from '@/redux/slices/orderSlice';
import { RecipientDetails } from '@/types';

const RecipientDetailsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recipientDetailsModalOpen } = useAppSelector((state) => state.ui);
  const { currentOrder } = useAppSelector((state) => state.order);
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    dispatch(setRecipientDetailsModalOpen(false));
  };

  const handleSubmit = (values: RecipientDetails) => {
    dispatch(setRecipientDetails(values));
    dispatch(confirmOrder());
    form.resetFields();
    dispatch(setRecipientDetailsModalOpen(false));
    dispatch(setOrderSuccessModalOpen(true));
  };

  const selectedItem = currentOrder.items[0];

  return (
    <Modal
      title={null}
      open={recipientDetailsModalOpen}
      onCancel={handleClose}
      footer={null}
      width={900}
      styles={{
        body: { padding: 0 },
      }}
    >
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Send Gift</h3>
        <p style={{ margin: '4px 0 0', color: '#888', fontSize: 13 }}>
          Send a gift surprise to your recipient through filling out the details in the system.
        </p>
      </div>

      <div style={{ display: 'flex', padding: 24, gap: 32 }}>
        <div style={{ width: 200 }}>
          <div
            style={{
              fontWeight: 600,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            Selected Item
          </div>
          {selectedItem && (
            <div
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                padding: 12,
              }}
            >
              <img
                src={selectedItem.product.image}
                alt={selectedItem.product.name}
                style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <div style={{ fontWeight: 500, fontSize: 13 }}>
                {selectedItem.product.name}
              </div>
              <div style={{ fontSize: 12, color: '#52c41a' }}>
                ${selectedItem.product.price}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                {selectedItem.selectedColor}, {selectedItem.selectedSize} x{' '}
                {selectedItem.quantity}
              </div>
            </div>
          )}
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ flex: 1 }}
        >
          <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>
            Recipient Details
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Form.Item
              name="name"
              label="Recipient Name *"
              style={{ flex: '1 1 45%' }}
              rules={[
                { required: true, message: 'Please enter recipient name' },
              ]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Recipient Email *"
              style={{ flex: '1 1 45%' }}
              rules={[
                { required: true, message: 'Please enter recipient email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="yourmail@gmail.com" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Recipient Phone *"
              style={{ flex: '1 1 45%' }}
              rules={[
                { required: true, message: 'Please enter recipient phone' },
              ]}
            >
              <Input placeholder="+0 000 000 0000" />
            </Form.Item>

            <Form.Item
              name="addressLine1"
              label="Recipient Deliveries *"
              style={{ flex: '1 1 45%' }}
              rules={[
                { required: true, message: 'Please enter delivery address' },
              ]}
            >
              <Input placeholder="Delivery option" />
            </Form.Item>
          </div>

          <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>
            Address Details
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Form.Item
              name="addressLine2"
              label="Address Line 1"
              style={{ flex: '1 1 45%' }}
            >
              <Input placeholder="Address Line 1" />
            </Form.Item>

            <Form.Item
              name="city"
              label="Address Line 2"
              style={{ flex: '1 1 45%' }}
            >
              <Input placeholder="Address Line 2" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country *"
              style={{ flex: '1 1 45%' }}
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <Select
                placeholder="Select Country"
                options={[
                  { value: 'US', label: 'United States' },
                  { value: 'UK', label: 'United Kingdom' },
                  { value: 'CA', label: 'Canada' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="zipCode"
              label="Zip Code *"
              style={{ flex: '1 1 45%' }}
              rules={[{ required: true, message: 'Please enter zip code' }]}
            >
              <Input placeholder="Enter Zip Code" />
            </Form.Item>

            <Form.Item
              name="state"
              label="City *"
              style={{ flex: '1 1 45%' }}
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input placeholder="Enter City" />
            </Form.Item>

            <Form.Item
              name="stateRegion"
              label="State *"
              style={{ flex: '1 1 45%' }}
              rules={[{ required: true, message: 'Please enter state' }]}
            >
              <Input placeholder="Enter State" />
            </Form.Item>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <Button onClick={handleClose}>Back</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: '#52c41a',
                borderColor: '#52c41a',
              }}
            >
              Confirm Order
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default RecipientDetailsModal;
