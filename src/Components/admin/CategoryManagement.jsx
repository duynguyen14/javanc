import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Folder, 
  FolderOpen,
  Search 
} from 'lucide-react';

const CatalogCategoryManagement = () => {
 
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

  //  tìm kiếmkiếm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState(''); // 'catalog' hay  'category'

  // handle cho  Catalog operations
  const handleAddCatalog = () => {
    setCurrentItem(null);
    setModalType('catalog');
    setIsModalOpen(true);
  };

  const handleEditCatalog = (catalog) => {
    setCurrentItem(catalog);
    setModalType('catalog');
    setIsModalOpen(true);
  };

  const handleDeleteCatalog = (catalogId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Điều này sẽ xóa tất cả các loại sản phẩm trong danh mục.')) {
      setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
    }
  };

  //  handler cho Category
  const handleAddCategory = (catalogId) => {
    setCurrentItem({ catalog_id: catalogId });
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentItem(category);
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (catalogId, categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này?')) {
      setCatalogs(catalogs.map(catalog => {
        if (catalog.id === catalogId) {
          return {
            ...catalog,
            categories: catalog.categories.filter(cat => cat.id !== categoryId)
          };
        }
        return catalog;
      }));
    }
  };

  // lưu handler cho  Catalog và  Category
  const handleSave = (itemData) => {
    if (modalType === 'catalog') {
      if (currentItem) {
        // chỉnh sửasửa catalog
        setCatalogs(catalogs.map(catalog => 
          catalog.id === currentItem.id 
            ? { ...catalog, catalog_name: itemData.catalog_name } 
            : catalog
        ));
      } else {
        // thêmthêm catalog
        const newCatalog = {
          id: catalogs.length + 1,
          catalog_name: itemData.catalog_name,
          categories: []
        };
        setCatalogs([...catalogs, newCatalog]);
      }
    } else if (modalType === 'category') {
      if (currentItem.id) {
        // chỉnh sửa categorycategory
        setCatalogs(catalogs.map(catalog => {
          if (catalog.id === currentItem.catalog_id) {
            return {
              ...catalog,
              categories: catalog.categories.map(category => 
                category.id === currentItem.id
                  ? { ...category, category_name: itemData.category_name }
                  : category
              )
            };
          }
          return catalog;
        }));
      } else {
        // thêm category mớimới
        setCatalogs(catalogs.map(catalog => {
          if (catalog.id === currentItem.catalog_id) {
            const newCategory = {
              id: catalog.categories.length + 1,
              category_name: itemData.category_name,
              catalog_id: catalog.id
            };
            return {
              ...catalog,
              categories: [...catalog.categories, newCategory]
            };
          }
          return catalog;
        }));
      }
    }
    setIsModalOpen(false);
  };
  const ItemModal = () => {
    const [formData, setFormData] = useState(
      currentItem 
        ? { 
            ...(modalType === 'catalog' 
              ? { catalog_name: currentItem.catalog_name }
              : { category_name: currentItem.category_name }
            )
          }
        : { 
            ...(modalType === 'catalog' 
              ? { catalog_name: '' }
              : { category_name: '' }
            )
          }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            {currentItem 
              ? `Chỉnh Sửa ${modalType === 'catalog' ? 'Danh Mục' : 'Loại Sản Phẩm'}` 
              : `Thêm ${modalType === 'catalog' ? 'Danh Mục' : 'Loại Sản Phẩm'} Mới`}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name={modalType === 'catalog' ? 'catalog_name' : 'category_name'}
              placeholder={modalType === 'catalog' ? 'Tên Danh Mục' : 'Tên Loại Sản Phẩm'}
              value={modalType === 'catalog' ? formData.catalog_name : formData.category_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hủy
            </button>
            <button 
              onClick={() => handleSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // filter 
  const filteredCatalogs = catalogs.filter(catalog => 
    catalog.catalog_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catalog.categories.some(category => 
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm danh mục hoặc loại sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>
        <button 
          onClick={handleAddCatalog}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle className="mr-2" /> Thêm Danh Mục
        </button>
      </div>

      <div className="space-y-4">
        {filteredCatalogs.map((catalog) => (
          <div 
            key={catalog.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
              <div className="flex items-center">
                <Folder className="mr-2 text-blue-600" />
                <h3 className="font-semibold">{catalog.catalog_name}</h3>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditCatalog(catalog)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteCatalog(catalog.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
                <button 
                  onClick={() => handleAddCategory(catalog.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>
            
            {catalog.categories.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left">Loại Sản Phẩm</th>
                    <th className="p-3 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.categories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 flex items-center">
                        <FolderOpen className="mr-2 text-gray-600" />
                        {category.category_name}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => handleEditCategory(category)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(catalog.id, category.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Chưa có loại sản phẩm nào trong danh mục này
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hiển thị Modal nếu isModalOpen là true */}
      {isModalOpen && <ItemModal />}
    </div>
  );
};

export default CatalogCategoryManagement;