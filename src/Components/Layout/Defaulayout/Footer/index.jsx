import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Về Chúng Tôi</h4>
            <p className="text-sm">
              Thế Giới Sách - Nơi kết nối những tâm hồn yêu sách, mang tri thức
              đến mọi nhà.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-blue-400">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400">
                  Thể Loại Sách
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400">
                  Khuyến Mãi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-blue-400">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên Hệ</h4>
            <p className="text-sm">Email: contact@thegiosach.com</p>
            <p className="text-sm">Hotline: 0395253054</p>
            <p className="text-sm">Địa chỉ: Tầng 6 Đại Học Công Nghiệp Hà Nội</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Kết Nối Với Chúng Tôi</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-2xl hover:text-blue-400">
                📘
              </Link>
              <Link href="#" className="text-2xl hover:text-blue-400">
                📸
              </Link>
              <Link href="#" className="text-2xl hover:text-blue-400">
                🐦
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm">
          © 2024 Thế Giới Sách. Bản Quyền Được Bảo Lưu.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
