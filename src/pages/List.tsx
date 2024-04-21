import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { COLUMNS_LIST } from "../constants/table-list";
import { clearWord, formatDate } from "../helpers/date";
import { debounce } from "lodash";
import { deleteProductById, getProducts } from "../services/products";
import { Product_I } from "../interfaces/products";
import ModalGeneric from "../components/modal/ModalGeneric";

const ListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product_I[]>([]);
  const [constProducts, setConstProducts] = useState<Product_I[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product_I>();

  const [showNumberProducts, setShowNumberProducts] = useState("10");
  // ========================================

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

  const productsPerPage = (products: Product_I[], value: string) => {
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

  const gotoEditProduct = (id: string) => {
    navigate(`/editar/${id}`);
  };

  const getProductsService = async () => {
    try {
      const response = await getProducts();
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

  const openModalDeleteProduct = async (product: Product_I) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const goToDeleteProduct = async () => {
    if (!selectedProduct?.id) {
      setShowModal(false);
      alert("No se ha seleccionado un producto");
      return;
    };
    try {
      const response = await deleteProductById(selectedProduct.id);
      if (response.status === 200) {

        // ELIMINAR PRODUCTO DE LA LISTA
        const removeProduct = constProducts.filter(
          (product) => product.id !== selectedProduct!.id
        );

        setConstProducts(removeProduct);
        productsPerPage(removeProduct, showNumberProducts);
        setShowModal(false);
      }
    } catch (error) {
      setShowModal(false);
      alert("Error al eliminar el producto");
    }
  }

  const onHandeleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getProductsService();
  }, []);

  return (
    <section>
      <div className="flex justify-between py-5">
        <input type="text" placeholder="Search..." onChange={searchProduct} />
        <button className="btn btn--primary" onClick={goToAddProduct}><span className="text-lg">+</span> Agregar</button>
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
                    <div className="flex justify-center gap-x-2 w-[100%]">
                      <button
                        className="btn btn--secondary btn--small"
                        onClick={() => gotoEditProduct(product.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn--delete btn--small"
                        onClick={() => openModalDeleteProduct(product)}
                      >
                        Eliminar
                      </button>
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
              <option value="20">20</option>
            </select>
          </div>
        </>
      )}

      <ModalGeneric
        showModal={showModal}
        onCloseModal={onHandeleModal}
        message={`¿Estás seguro de eliminar el producto? "${selectedProduct?.name}"`}
      >
        <div className="flex justify-between items-center gapx-4">
          <button
            className="btn btn--secondary"
            onClick={onHandeleModal}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="btn btn--primary"
            onClick={goToDeleteProduct}
            type="button"
          >
            Confirmar
          </button>
        </div>
      </ModalGeneric>
    </section>
  );
};

export default ListPage;
