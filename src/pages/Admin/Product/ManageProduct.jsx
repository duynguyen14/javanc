import React, { useState, useEffect } from 'react';
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search,
  Image as ImageIcon
} from 'lucide-react';

const ManaProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/crud_products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/crud_products/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setSelectedImage(product.productImage);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/crud_products/${productId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete product');
        await fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      const formData = new FormData();
      // Lấy category ID từ categories array
      const selectedCategory = categories.find(cat => cat.categoryName === productData.categoryName);
  
      formData.append('categoryId', selectedCategory.id);
  
      // Thêm tất cả các thông tin sản phẩm vào formData
      Object.keys(productData).forEach(key => {
        if (key !== 'categoryName') { 
          formData.append(key, productData[key]);
        }
      });
  
      // Nếu có ảnh được chọn, thêm ảnh vào formData
      if (selectedImage && selectedImage.startsWith('data:')) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('image', blob, 'product-image.jpg');
      }
  
      // Nếu đang cập nhật sản phẩm hiện tại, phải bao gồm ID sản phẩm
      if (currentProduct && currentProduct.id) {
        formData.append('id', currentProduct.id);  // Thêm ID sản phẩm vào formData
      }
  
      const url = currentProduct
        ? `http://localhost:8080/api/crud_products/update`  // URL để cập nhật sản phẩm
        : 'http://localhost:8080/api/crud_products';  // URL để tạo sản phẩm mới
  
      const response = await fetch(url, {
        method: currentProduct ? 'PUT' : 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Failed to save product');
      await fetchProducts();  // Sau khi lưu sản phẩm, tải lại danh sách sản phẩm
      setIsModalOpen(false);  // Đóng modal
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProductModal = () => {
    const [formData, setFormData] = useState(
      currentProduct 
        ? { 
            id: currentProduct.id,
            productName: currentProduct.productName,
            productAuthor: currentProduct.productAuthor,
            quantity: currentProduct.quantity,
            price: currentProduct.price,
            productDescription: currentProduct.productDescription,
            categoryName: currentProduct.categoryName
          }
        : {
            productName: '',
            productAuthor: '',
            quantity: '',
            price: '',
            productDescription: '',
            categoryName: ''
          }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-[600px]">
          <h2 className="text-xl font-semibold mb-4">
            {currentProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </h2>
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-4">
              <input
                type="text"
                name="productName"
                placeholder="Tên Sách"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="productAuthor"
                placeholder="Tác Giả"
                value={formData.productAuthor}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Số Lượng"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Giá Sản Phẩm"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Chọn Thể Loại</option>
                {categories.map(category => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2 space-y-4">
              <textarea
                name="productDescription"
                placeholder="Mô Tả Sản Phẩm"
                value={formData.productDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
                required
              />
              <div className="border-2 border-dashed rounded p-2 text-center">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload" 
                  className="cursor-pointer flex items-center justify-center"
                >
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Product" 
                      className="max-h-40 max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <ImageIcon size={40} />
                      <span>Tải Ảnh Sản Phẩm</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hủy
            </button>
            <button 
              onClick={() => handleSaveProduct(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productAuthor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm sách (tên, tác giả)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>
        <button 
          onClick={handleAddProduct}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle className="mr-2" /> Thêm Sách Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex"
          >
            <div className="w-1/3 p-2">
              <img 
                src={product.productImage} 
                alt={product.productName}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = '/path/to/default-image.jpg';
                }}
              />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
              <p className="text-gray-600 mb-1">Tác Giả: {product.productAuthor}</p>
              <p className="text-gray-600 mb-1">
                Loại: {product.categoryName}
              </p>
              <p className="text-gray-600 mb-1">Số Lượng: {product.quantity}</p>
              <p className="text-blue-600 font-bold mb-2">
                Giá: {product.price.toLocaleString()} VND
              </p>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.productDescription}
              </p>
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <ProductModal />}
    </div>
  );
};

export default ManaProduct;