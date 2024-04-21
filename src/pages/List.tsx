import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { COLUMNS_LIST } from "../constants/table-list";
import { getProducts } from "../services/products";
import { Product_I } from "../interfaces/products";
import TableList from "../components/table/TableList";

const ListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product_I[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // =========================================================

  const searchProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const goToAddProduct = () => {
    navigate("/registro");
  };

  const getProductsService = async () => {
    try {
      const response = await getProducts();
      if (response.status === 200) {
        const products = response.data.reverse();
        setProducts(products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsService();
  }, []);

  return (
    <section>
      <div className="flex justify-between mb-3">
        <input
          className="input-field"
          type="text"
          placeholder="Search..."
          onChange={searchProduct}
        />
        <button className="btn btn--primary" onClick={goToAddProduct}>
          <span className="text-lg">+</span> Agregar
        </button>
      </div>

      <div className="wrapper-table">
        <TableList
          columns={COLUMNS_LIST}
          loading={loading}
          data={products}
          filterByName={searchText}
        />
      </div>
    </section>
  );
};

export default ListPage;
