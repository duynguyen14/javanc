import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@mui/material'; // Sử dụng Button từ Material-UI
import { Eye, Trash2 } from 'lucide-react';

// Mock data service (replace with actual API calls)
const billService = {
  getBills: async () => {
    return [
      {
        id: 1,
        user: { fullname: 'John Doe' },
        total: 250.50,
        methodPay: 'Credit Card',
        doe: '2024-02-15'
      },
      {
        id: 2,
        user: { fullname: 'Jane Smith' },
        total: 150.75,
        methodPay: 'PayPal',
        doe: '2024-02-16'
      }
    ];
  },

  getBillDetails: async (billId) => {
    return {
      id: billId,
      user: { fullname: 'John Doe' },
      total: 250.50,
      methodPay: 'Credit Card',
      doe: '2024-02-15',
      products: [
        {
          product_id: 'P001',
          product_name: 'Book 1',
          quantity: 2,
          total: 100.00
        },
        {
          product_id: 'P002',
          product_name: 'Book 2',
          quantity: 1,
          total: 150.50
        }
      ]
    };
  },

  cancelBill: async (billId) => {
    console.log(`Bill ${billId} cancelled`);
    return true;
  }
};

const BillManagement = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const fetchedBills = await billService.getBills();
        setBills(fetchedBills);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const handleViewDetails = async (billId) => {
    try {
      const billDetails = await billService.getBillDetails(billId);
      setSelectedBill(billDetails);
      setDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching bill details:', error);
    }
  };

  const handleCancelBill = async (billId) => {
    try {
      await billService.cancelBill(billId);
      setBills(bills.filter(bill => bill.id !== billId));
    } catch (error) {
      console.error('Error cancelling bill:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bill Management</h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Bill ID</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Totalotal</th>
            <th className="px-4 py-2">Phương thức</th>
            <th className="px-4 py-2">Thời gian</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td className="px-4 py-2">{bill.id}</td>
              <td className="px-4 py-2">{bill.user.fullname}</td>
              <td className="px-4 py-2">${bill.total.toFixed(2)}</td>
              <td className="px-4 py-2">{bill.methodPay}</td>
              <td className="px-4 py-2">{bill.doe}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetails(bill.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Details
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleCancelBill(bill.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bill Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)}>
        <DialogTitle>Bill Details</DialogTitle>
        <DialogContent>
          {selectedBill && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p><strong>Bill ID:</strong> {selectedBill.id}</p>
                  <p><strong>Customer:</strong> {selectedBill.user.fullname}</p>
                  <p><strong>Date:</strong> {selectedBill.doe}</p>
                  <p><strong>Payment Method:</strong> {selectedBill.methodPay}</p>
                </div>
                <div className="text-right">
                  <p><strong>Total:</strong> ${selectedBill.total.toFixed(2)}</p>
                </div>
              </div>

              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product ID</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.products.map(product => (
                    <tr key={product.product_id}>
                      <td className="px-4 py-2">{product.product_id}</td>
                      <td className="px-4 py-2">{product.product_name}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
                      <td className="px-4 py-2">${product.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BillManagement;
