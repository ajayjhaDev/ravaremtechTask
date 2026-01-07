import React from 'react';
import { Card, Checkbox, Slider, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFilters } from '@/redux/slices/productSlice';

const categories = [
  'Tems',
  'Sema',
  'Tema',
  'Sema',
  'Tema',
  'Sema',
  'Semai',
];

const vendors = [
  'Nike',
  'Adidas',
  'Puma',
  'Reebok',
  'New Balance',
  'Converse',
  'Vans',
];

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.product);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    dispatch(setFilters({ categories: newCategories }));
  };

  const handleVendorChange = (vendor: string, checked: boolean) => {
    const newVendors = checked
      ? [...filters.vendors, vendor]
      : filters.vendors.filter((v) => v !== vendor);
    dispatch(setFilters({ vendors: newVendors }));
  };

  const handlePriceChange = (value: number[]) => {
    dispatch(setFilters({ priceRange: [value[0], value[1]] }));
  };

  return (
    <Card
      style={{
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        height: 'fit-content',
      }}
      styles={{
        body: { padding: '16px' },
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 14 }}>Filters</span>
          <span
            style={{
              fontSize: 12,
              color: '#a855f7',
              cursor: 'pointer',
            }}
          >
            Clear All
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 12,
            color: '#333',
          }}
        >
          Categories
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categories.map((category, index) => (
            <Checkbox
              key={index}
              checked={filters.categories.includes(category)}
              onChange={(e) => handleCategoryChange(category, e.target.checked)}
              style={{ fontSize: 13 }}
            >
              {category}
            </Checkbox>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 12,
            color: '#333',
          }}
        >
          Price Range
        </div>
        <Slider
          range
          min={0}
          max={5000}
          value={filters.priceRange}
          onChange={handlePriceChange}
          trackStyle={[{ backgroundColor: '#52c41a' }]}
          handleStyle={[
            { borderColor: '#52c41a' },
            { borderColor: '#52c41a' },
          ]}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#666',
          }}
        >
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 12,
            color: '#333',
          }}
        >
          Vendors
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined style={{ color: '#bbb' }} />}
          style={{ marginBottom: 12 }}
          size="small"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {vendors.map((vendor, index) => (
            <Checkbox
              key={index}
              checked={filters.vendors.includes(vendor)}
              onChange={(e) => handleVendorChange(vendor, e.target.checked)}
              style={{ fontSize: 13 }}
            >
              {vendor}
            </Checkbox>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;
