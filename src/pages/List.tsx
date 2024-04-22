import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { clearWord } from "../helpers/date";
import { debounce } from "lodash";
import { deleteProductById, getProducts } from "../services/products";
import { Product_I } from "../interfaces/products";
import ModalGeneric from "../components/modal/ModalGeneric";
import TableList from "../components/table/TableList";

const ListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product_I[]>([]);
  const [constProducts, setConstProducts] = useState<Product_I[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState({
    show: false,
    message: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<Product_I>();

  const [showNumberProducts, setShowNumberProducts] = useState("10");
  const [wordSearch, setWordSearch] = useState("");
  // ========================================

  const searchProduct = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWordSearch(value);

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

    const filterProducts = constProducts.filter(({ name }) => {
      const nameProduct = clearWord(name.toLowerCase());
      return nameProduct.includes(wordSearch);
    });

    productsPerPage(filterProducts, value);
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
      if (response.status !== 200) {
        return setShowModalError({ show: true, message: "Algo salió mal" });
      }

      setLoading(false);
      const products = response.data.reverse();
      setConstProducts(products);
      productsPerPage(products, showNumberProducts);
    } catch (error) {
      setShowModalError({ show: true, message: "Algo salió mal" });
    }
  };

  const openModalDeleteProduct = async (product: Product_I) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const goToDeleteProduct = async () => {
    if (!selectedProduct?.id) {
      return setShowModal(false);
    }
    try {
      const response = await deleteProductById(selectedProduct.id);
      if (response.status !== 200) {
        return setShowModalError({ show: true, message: "Algo salió mal" });
      }

      // ELIMINAR PRODUCTO DE LA LISTA
      const removeProduct = constProducts.filter(
        (product) => product.id !== selectedProduct!.id
      );

      setConstProducts(removeProduct);
      productsPerPage(removeProduct, showNumberProducts);
      setShowModal(false);
    } catch (error) {
      setShowModalError({ show: true, message: "Algo salió mal" });
    }
  };

  const onHandeleModal = () => {
    setShowModal(!showModal);
  };

  const onHandeleModalError = () => {
    setShowModalError({ show: !showModalError.show, message: "" });
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
          loading={loading}
          data={products}
          gotoEditProduct={gotoEditProduct}
          openModalDeleteProduct={openModalDeleteProduct}
        />

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

      <ModalGeneric
        showModal={showModalError.show}
        onCloseModal={onHandeleModalError}
        size="small"
        message={showModalError.message}
      >
        <div className="flex justify-between items-center gapx-4">
          <button
            className="btn btn--primary"
            onClick={onHandeleModalError}
            type="button"
          >
            Aceptar
          </button>
        </div>
      </ModalGeneric>
    </section>
  );
};

export default ListPage;
