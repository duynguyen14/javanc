import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search,
  Image as ImageIcon
} from 'lucide-react';

const ProductManagement = () => {
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      catalog_name: 'Sách Văn Học',
      categories: [
        { id: 1, category_name: 'Tiểu Thuyết Việt Nam', catalog_id: 1 },
        { id: 2, category_name: 'Tiểu Thuyết Nước Ngoài', catalog_id: 1 }
      ]
    },
    {
      id: 2,
      catalog_name: 'Sách Chuyên Ngành',
      categories: [
        { id: 3, category_name: 'Khoa Học Kỹ Thuật', catalog_id: 2 },
        { id: 4, category_name: 'Kinh Tế', catalog_id: 2 }
      ]
    }
  ]);

  const [products, setProducts] = useState([
    {
      product_id: 'SP001',
      product_name: 'Nhà Giả Kim',
      product_author: 'Paulo Coelho',
      product_quantity: 100,
      product_price: 79000,
      product_image: '/path/to/image1.jpg',
      product_describe: 'Một cuốn sách truyền cảm hứng về hành trình theo đuổi ước mơ',
      category_id: 2
    },
    {
      product_id: 'SP002',
      product_name: 'Lập Trình Python Căn Bản',
      product_author: 'Nguyễn Văn A',
      product_quantity: 50,
      product_price: 120000,
      product_image: '/path/to/image2.jpg',
      product_describe: 'Sách hướng dẫn lập trình Python từ cơ bản đến nâng cao',
      category_id: 3
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Handlers sản phẩm 
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setSelectedImage(product.product_image);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.product_id !== productId));
    }
  };

  // Lưu sản phầmr 
  const handleSaveProduct = (productData) => {
    const { product_id, product_name, product_author, product_quantity, product_price, product_describe, category_id } = productData;
    
    if (currentProduct) {
      // chỉnh sửasửa
      setProducts(products.map(product => 
        product.product_id === currentProduct.product_id 
          ? { 
              ...product, 
              product_name,
              product_author,
              product_quantity: Number(product_quantity),
              product_price: Number(product_price),
              product_image: selectedImage || product.product_image,
              product_describe,
              category_id: Number(category_id)
            } 
          : product
      ));
    } else {
      // thêm mớimới
      const newProduct = {
        product_id: `SP${(products.length + 1).toString().padStart(3, '0')}`,
        product_name,
        product_author,
        product_quantity: Number(product_quantity),
        product_price: Number(product_price),
        product_image: selectedImage || '/path/to/default-image.jpg',
        product_describe,
        category_id: Number(category_id)
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  // IXử lí ảnh tải lên
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

  // Sản phẩm Modal Component
  const ProductModal = () => {
    const [formData, setFormData] = useState(
      currentProduct 
        ? { 
            product_id: currentProduct.product_id,
            product_name: currentProduct.product_name,
            product_author: currentProduct.product_author,
            product_quantity: currentProduct.product_quantity,
            product_price: currentProduct.product_price,
            product_describe: currentProduct.product_describe,
            category_id: currentProduct.category_id
          }
        : {
            product_name: '',
            product_author: '',
            product_quantity: '',
            product_price: '',
            product_describe: '',
            category_id: ''
          }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const flattenedCategories = catalogs.flatMap(catalog => 
      catalog.categories.map(category => ({
        ...category,
        full_name: `${catalog.catalog_name} - ${category.category_name}`
      }))
    );

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
                name="product_name"
                placeholder="Tên Sách"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="product_author"
                placeholder="Tác Giả"
                value={formData.product_author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="product_quantity"
                placeholder="Số Lượng"
                value={formData.product_quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="product_price"
                placeholder="Giá Sản Phẩm"
                value={formData.product_price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Chọn Loại Sản Phẩm</option>
                {flattenedCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2 space-y-4">
              <textarea
                name="product_describe"
                placeholder="Mô Tả Sản Phẩm"
                value={formData.product_describe}
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
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // tìm kiếm 
  const getCategoryName = (categoryId) => {
    for (const catalog of catalogs) {
      const category = catalog.categories.find(cat => cat.id === categoryId);
      if (category) {
        return `${catalog.catalog_name} - ${category.category_name}`;
      }
    }
    return 'Không xác định';
  };

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
            key={product.product_id} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex"
          >
            <div className="w-1/3 p-2">
              <img 
                src={product.product_image} 
                alt={product.product_name}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = '/path/to/default-image.jpg';
                }}
              />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-semibold text-lg mb-2">{product.product_name}</h3>
              <p className="text-gray-600 mb-1">Tác Giả: {product.product_author}</p>
              <p className="text-gray-600 mb-1">
                Loại: {getCategoryName(product.category_id)}
              </p>
              <p className="text-gray-600 mb-1">Số Lượng: {product.product_quantity}</p>
              <p className="text-blue-600 font-bold mb-2">
                Giá: {product.product_price.toLocaleString()} VND
              </p>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.product_describe}
              </p>
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.product_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hiển thị Modal nếu isModalOpen là true */}
      {isModalOpen && <ProductModal />}
    </div>
  );
};

export default ProductManagement;