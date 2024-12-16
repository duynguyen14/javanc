import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../utils";
import { Link } from "react-router-dom";
function Catalog() {
  const { id } = useParams();
  const [catalog, setCatalog] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await request.get(`products/catalog/${id}`);
      console.log(response);
      setCatalog(response.data.catalog);
      setList(response.data.list);
    };
    fetch();
  }, [id]);
  return (
    <div className="test">
      <div>
        {list && list.length > 0 && (
          <div>
            {list.map((item, index) => {
              return (
                <div key={index}>
                  <div className="font-medium text-3xl my-16 hover:text-test2 cursor-pointer">Sách {item.category.categoryName}</div>
                  <div className="grid grid-books grid-cols-2 md:grid-cols-3 gap-y-10 md:gap-x-40">
                    {item.list.map((item, index) => {
                      return (
                        <Link to={`/product/${item.id}`} key={index}>
                          <div className="group relative book-card bg-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-sm hover:cursor-pointer h-[400px]">
                            <img
                              src={item.productImage}
                              alt="Sách 1"
                              className="mx-auto mb-4 rounded-lg max-w-full h-[65%]"
                            />
                            <h3 className="font-bold text-base md:text-sm">
                              {item.productName}
                            </h3>
                            <p className="text-gray-600 mb-2 text-sm">
                              {item.productAuthor}
                            </p>
                            <div className="flex justify-between items-center">
                              <del className="text-gray-400 font-semibold">
                                {item.price}
                              </del>
                              <p className="text-red-500 font-semibold">
                                {item.price}
                              </p>
                            </div>
                            <div className="absolute px-2 py-1 bg-red-500 text-xs text-white font-semibold text-center top-[10%] left-[78%]">
                              <p>-20%</p>
                            </div>
                            <button className=" ml-[-16px] hidden group-hover:block absolute w-full py-2 bg-red-500 top-[85%] rounded-md text-white font-semibold">
                              Mua ngay
                            </button>
                            {/* <button
                  className="hidden group-hover:block absolute bottom-[10px] left-0 w-full bg-blue-500 text-white font-bold py-2 text-center 
                    transform translate-y-full group-hover:translate-y-0 transition-all duration-500"
                >
                  Mua Ngay
                </button> */}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
