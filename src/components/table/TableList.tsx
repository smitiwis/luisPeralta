import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { clearWord, formatDate } from "../../helpers/date";
import SqueletonList from "../../pages/components/SqueletonList";
import { Product_I } from "../../interfaces/products";
import { deleteProductById } from "../../services/products";
import ModalGeneric from "../modal/ModalGeneric";

const TableList: FC<TableListProps> = ({
  columns,
  loading,
  data,
  filterByName,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product_I[]>(data);
  const [constProducts, setConstProducts] = useState<Product_I[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product_I>();
  const [showNumberProducts, setShowNumberProducts] = useState("10");

  // ========================================
  const gotoEditProduct = (id: string) => {
    navigate(`/editar/${id}`);
  };

  const openModalDeleteProduct = async (product: Product_I) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShowNumberProducts(value);
    productsPerPage(constProducts, value);
  };

  const productsPerPage = (products: Product_I[], value: string) => {
    const productsPerPage = products.slice(0, Number(value));
    setProducts(productsPerPage);
  };

  const onHandeleModal = () => {
    setShowModal(!showModal);
  };

  const goToDeleteProduct = async () => {
    if (!selectedProduct?.id) {
      setShowModal(false);
      alert("No se ha seleccionado un producto");
      return;
    }
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
  };

  const searchProduct = debounce((value: string) => {
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
  }, 500);

  useEffect(() => {
    setConstProducts(data);
    productsPerPage(data, showNumberProducts);
  }, [data, showNumberProducts]);

  useEffect(() => {
    searchProduct(filterByName);
  }, [filterByName]);

  return (
    <>
      <table className="table-main">
        <thead className="table-main__header">
          <tr>
            {columns.map((column) => (
              <th key={column.name}>
                <div className="flex gap-2">
                  {column.name.toLocaleUpperCase()}
                  {column.icon && (
                    <img
                      width={15}
                      src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/information-icon.png"
                      alt=""
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-main__body">
          {loading ? (
            <SqueletonList />
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    width={50}
                    height={50}
                    src={product.logo}
                    alt={product.logo}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{formatDate(product.date_release)}</td>
                <td>{formatDate(product.date_revision)}</td>
                <td>
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
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p>{products.length} resultados</p>
        <select
          className="select-field"
          value={showNumberProducts}
          onChange={handleSelect}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <ModalGeneric
        showModal={showModal}
        onCloseModal={onHandeleModal}
        message={
          <div className="mb-8">
            ¿Estás seguro de eliminar el producto? <br />
            <div className="flex flex-col items-center gap-1 mt-5 justify-center">
              <img
                width={100}
                src={selectedProduct?.logo}
                alt={selectedProduct?.name}
              />
              <span className="font-bold">{selectedProduct?.name}</span>
            </div>
          </div>
        }
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
    </>
  );
};

export default TableList;

type TableListProps = {
  columns: columns[];
  data: Product_I[];
  loading: boolean;
  filterByName: string;
};

type columns = {
  icon: boolean;
  name: string;
};
