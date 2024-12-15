import React, { useState, useEffect } from 'react';
const revenueService = {
  // báo cáo theo ngày tháng năm 
  getRevenueReport: async (type) => {
    switch(type) {
      case 'daily':
        return [
          { date: '2024-02-01', total: 1500.50 },
          { date: '2024-02-02', total: 2300.75 },
          { date: '2024-02-03', total: 1800.25 }
        ];
      case 'monthly':
        return [
          { month: '01/2024', total: 45000.50 },
          { month: '02/2024', total: 52000.75 },
          { month: '03/2024', total: 48500.25 }
        ];
      case 'yearly':
        return [
          { year: '2023', total: 540000.50 },
          { year: '2024', total: 156000.75 }
        ];
      default:
        return [];
    }
  },

  // fake sp bán chạychạy
  getTopSellingProducts: async () => {
    return [
      { 
        product_id: 'SP001', 
        product_name: 'Sách Lập Trình Python', 
        total_quantity: 150, 
        total_revenue: 22500.50 
      },
      { 
        product_id: 'SP002', 
        product_name: 'Sách Thiết Kế Web', 
        total_quantity: 120, 
        total_revenue: 18000.75 
      },
      { 
        product_id: 'SP003', 
        product_name: 'Sách Trí Tuệ Nhân Tạo', 
        total_quantity: 100, 
        total_revenue: 15000.25 
      }
    ];
  }
};

const RevenueManagement = () => {
  const [revenueType, setRevenueType] = useState('monthly');
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // bc doanh thu 
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const data = await revenueService.getRevenueReport(revenueType);
        setRevenueData(data);
      } catch (error) {
        console.error('Lỗi tải báo cáo doanh thu:', error);
      }
    };

    fetchRevenueData();
  }, [revenueType]);

  // Fetch sản phẩm bán chạy 
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const products = await revenueService.getTopSellingProducts();
        setTopProducts(products);
      } catch (error) {
        console.error('Lỗi tải sản phẩm bán chạy:', error);
      }
    };

    fetchTopProducts();
  }, []);

  // báo cáo doanh thu 
  const renderRevenueTable = () => {
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>
              {revenueType === 'daily' ? 'Ngày' : 
               revenueType === 'monthly' ? 'Tháng' : 'Năm'}
            </th>
            <th style={tableHeaderStyle}>Tổng Doanh Thu</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((item, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>
                {revenueType === 'daily' ? item.date : 
                 revenueType === 'monthly' ? item.month : item.year}
              </td>
              <td style={tableCellStyle}>
                {item.total.toLocaleString()}đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // lấy sản phẩm bán chạychạy
  const renderTopProductsTable = () => {
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Mã SP</th>
            <th style={tableHeaderStyle}>Tên Sản Phẩm</th>
            <th style={tableHeaderStyle}>Số Lượng Bán</th>
            <th style={tableHeaderStyle}>Tổng Doanh Thu</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>{product.product_id}</td>
              <td style={tableCellStyle}>{product.product_name}</td>
              <td style={tableCellStyle}>{product.total_quantity}</td>
              <td style={tableCellStyle}>
                {product.total_revenue.toLocaleString()}đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Quản Lý Doanh Thu</h2>
      <div style={sectionStyle}>
        <h3 style={subtitleStyle}>Báo Cáo Doanh Thu</h3>
        
        <div style={controlStyle}>
          <button 
            style={{
              ...buttonStyle, 
              backgroundColor: revenueType === 'daily' ? '#007bff' : '#6c757d'
            }}
            onClick={() => setRevenueType('daily')}
          >
            Theo Ngày
          </button>
          <button 
            style={{
              ...buttonStyle, 
              backgroundColor: revenueType === 'monthly' ? '#007bff' : '#6c757d'
            }}
            onClick={() => setRevenueType('monthly')}
          >
            Theo Tháng
          </button>
          <button 
            style={{
              ...buttonStyle, 
              backgroundColor: revenueType === 'yearly' ? '#007bff' : '#6c757d'
            }}
            onClick={() => setRevenueType('yearly')}
          >
            Theo Năm
          </button>
        </div>

        {renderRevenueTable()}
      </div>
      <div style={sectionStyle}>
        <h3 style={subtitleStyle}>Top Sản Phẩm Bán Chạy</h3>
        {renderTopProductsTable()}
      </div>
    </div>
  );
};


const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  backgroundColor: '#f4f4f4'
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  borderBottom: '2px solid #333',
  paddingBottom: '10px'
};

const subtitleStyle = {
  fontSize: '18px',
  marginBottom: '15px'
};

const sectionStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const controlStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '15px'
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left'
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px'
};

export default RevenueManagement;