import React from 'react';
import { Modal } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={340}
      centered
      closable={false}
      styles={{
        body: { padding: '40px 24px', textAlign: 'center' },
      }}
    >
      <CheckCircleFilled
        style={{ fontSize: 64, color: '#52c41a', marginBottom: 20 }}
      />
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>{subtitle}</p>
      )}
    </Modal>
  );
};

export default SuccessModal;
