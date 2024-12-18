import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Typography,
} from "@mui/material";
import { Eye, Trash2 } from "lucide-react";

// Mock data service (replace with actual API calls)
const billService = {
  getBills: async () => {
    return [
      {
        id: 1,
        user: { fullname: "John Doe" },
        total: 250.5,
        methodPay: "Credit Card",
        doe: "2024-02-15",
      },
      {
        id: 2,
        user: { fullname: "Jane Smith" },
        total: 150.75,
        methodPay: "PayPal",
        doe: "2024-02-16",
      },
    ];
  },

  getBillDetails: async (billId) => {
    return {
      id: billId,
      user: { fullname: "John Doe" },
      total: 250.5,
      methodPay: "Credit Card",
      doe: "2024-02-15",
      products: [
        {
          product_id: "P001",
          product_name: "Book 1",
          quantity: 2,
          total: 100.0,
        },
        {
          product_id: "P002",
          product_name: "Book 2",
          quantity: 1,
          total: 150.5,
        },
      ],
    };
  },

  cancelBill: async (billId) => {
    console.log(`Bill ${billId} cancelled`);
    return true;
  },
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
        console.error("Error fetching bills:", error);
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
      console.error("Error fetching bill details:", error);
    }
  };

  const handleCancelBill = async (billId) => {
    try {
      await billService.cancelBill(billId);
      setBills(bills.filter((bill) => bill.id !== billId));
    } catch (error) {
      console.error("Error cancelling bill:", error);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Quản lý hóa đơn
      </Typography>

      {bills.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Không có hóa đơn nào được tìm thấy.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow
                  key={bill.id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                  }}
                >
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.user.fullname}</TableCell>
                  <TableCell align="right">${bill.total.toFixed(2)}</TableCell>
                  <TableCell>{bill.methodPay}</TableCell>
                  <TableCell>{bill.doe}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(bill.id)}
                      startIcon={<Eye />}
                      sx={{ marginRight: 1 }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleCancelBill(bill.id)}
                      startIcon={<Trash2 />}
                    >
                      Hủy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog hiển thị chi tiết hóa đơn */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết hóa đơn</DialogTitle>
        <DialogContent>
          {selectedBill && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p><strong>Mã hóa đơn:</strong> {selectedBill.id}</p>
                  <p><strong>Khách hàng:</strong> {selectedBill.user.fullname}</p>
                  <p><strong>Ngày:</strong> {selectedBill.doe}</p>
                  <p><strong>Phương thức thanh toán:</strong> {selectedBill.methodPay}</p>
                </div>
                <div className="text-right">
                  <p><strong>Tổng cộng:</strong> ${selectedBill.total.toFixed(2)}</p>
                </div>
              </div>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã sản phẩm</TableCell>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedBill.products.map((product) => (
                      <TableRow key={product.product_id}>
                        <TableCell>{product.product_id}</TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        <TableCell align="right">${product.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BillManagement;
