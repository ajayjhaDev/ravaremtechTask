import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div
      style={{
        background: '#52c41a',
        padding: '20px 40px',
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h1
        style={{
          color: '#fff',
          fontSize: 28,
          fontWeight: 600,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
