import React from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setAddProductModalOpen,
  setAddProductSuccessModalOpen,
} from '@/redux/slices/uiSlice';
import { addProduct } from '@/redux/slices/productSlice';
import { ProductFormData } from '@/types';

const { TextArea } = Input;
const { Dragger } = Upload;

const AddProductModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { addProductModalOpen } = useAppSelector((state) => state.ui);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    dispatch(setAddProductModalOpen(false));
  };

  const handleSubmit = (values: ProductFormData) => {
    dispatch(addProduct(values));
    form.resetFields();
    dispatch(setAddProductModalOpen(false));
    dispatch(setAddProductSuccessModalOpen(true));
  };

  return (
    <Modal
      title={null}
      open={addProductModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={720}
      styles={{
        body: { padding: 0 },
      }}
    >
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Add Product</h3>
        <p style={{ margin: '4px 0 0', color: '#888', fontSize: 13 }}>
          Provide product details, images, and pricing to make your Product available on the platform.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ padding: 24 }}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#52c41a',
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                General Information
              </span>
            </div>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea
                rows={4}
                placeholder="Type something about the item..."
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select
                placeholder="Enter the category"
                options={[
                  { value: 'Footwear', label: 'Footwear' },
                  { value: 'Clothing', label: 'Clothing' },
                  { value: 'Accessories', label: 'Accessories' },
                ]}
              />
            </Form.Item>

            <div style={{ fontWeight: 600, marginBottom: 12 }}>Pricing</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="purchasingPrice"
                label="Purchasing Price *"
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: 'Please enter purchasing price' },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="$100.00"
                  prefix="$"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price *"
                style={{ flex: 1 }}
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="$140.00"
                  prefix="$"
                  min={0}
                />
              </Form.Item>
            </div>
          </div>

          <div style={{ width: 280 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                Product Media
              </span>
            </div>

            <Form.Item name="media" label="Product Photos *">
              <Dragger
                beforeUpload={() => false}
                style={{
                  background: '#fafafa',
                  border: '1px dashed #d9d9d9',
                  borderRadius: 8,
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#52c41a', fontSize: 36 }} />
                </p>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                  Drop your images, or{' '}
                  <span style={{ color: '#52c41a', cursor: 'pointer' }}>
                    Click to Browse
                  </span>
                </p>
                <p style={{ fontSize: 11, color: '#999', margin: '4px 0 0' }}>
                  1600 x 1200 (4:3) recommended, up to 10MB
                </p>
              </Dragger>
            </Form.Item>
          </div>
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: '#a855f7',
              borderColor: '#a855f7',
            }}
          >
            Add Product
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
