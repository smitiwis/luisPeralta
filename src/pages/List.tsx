import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { COLUMNS_LIST } from "../constants/table-list";
import { clearWord, formatDate } from "../helpers/date";
import { debounce } from "lodash";

const ListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [constProducts, setConstProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showNumberProducts, setShowNumberProducts] = useState("10");
  // ========================================

  const getProducts = async () => {
    try {
      const pathBase = process.env.REACT_APP_API_URL;
      const config = { headers: { authorId: 428 } };
      const response = await axios.get(`${pathBase!}/bp/products`, config);
      if (response.status === 200) {
        setLoading(false);
        const products = response.data;
        setConstProducts(products);
        productsPerPage(products, showNumberProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || value === "") {
      productsPerPage(constProducts, showNumberProducts);
      return;
    }

    const wordSearch = clearWord(value.toLowerCase());
    const filterProducts = constProducts.filter(({ name }) => {
      const nameProduct = clearWord(name.toLowerCase());
      return nameProduct.includes(wordSearch);
    });

    productsPerPage(filterProducts, showNumberProducts);
  }, 400);

  const productsPerPage = (products: any[], value: string) => {
    const productsPerPage = products.slice(0, Number(value));
    setProducts(productsPerPage);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShowNumberProducts(value);
    productsPerPage(constProducts, value);
  };

  const goToAddProduct = () => {
    navigate("/registro");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <div className="flex justify-between py-5">
        <input type="text" placeholder="Search..." onChange={searchProduct} />
        <button onClick={goToAddProduct}>Agregar</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table className="table-auto border-collapse border border-gray-400 w-[100%]">
            <thead>
              <tr>
                {COLUMNS_LIST.map((column) => (
                  <th
                    className="text-xs px-4 py-2 bg-gray-200 border border-gray-400"
                    key={column}
                  >
                    {column.toLocaleUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border border-gray-400">
                    <img
                      width={50}
                      height={50}
                      src={product.logo}
                      alt={product.logo}
                    />
                  </td>
                  <td className="text-xs px-4 py-2 border border-gray-400">
                    {product.name}
                  </td>
                  <td className="text-xs px-4 py-2 border border-gray-400">
                    {product.description}
                  </td>
                  <td className="text-xs px-4 py-2 border border-gray-400">
                    {formatDate(product.date_release)}
                  </td>
                  <td className="text-xs px-4 py-2 border border-gray-400">
                    {formatDate(product.date_revision)}
                  </td>
                  <td className="text-xs px-4 py-2 border border-gray-400">
                    <div className="flex gap-x-2">
                      <button className="text-xs">Editar</button>
                      <button className="text-xs">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <p>{products.length} resultados</p>
            <select value={showNumberProducts} onChange={handleSelect}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </>
      )}
    </section>
  );
};

export default ListPage;
