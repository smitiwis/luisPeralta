import { useEffect, useState } from "react";
import FormProduct from "./components/FormProduct";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/products";
import { Product_I } from "../interfaces/products";
import ModalGeneric from "../components/modal/ModalGeneric";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Product_I>();
  const [showModalError, setShowModalError] = useState({
    show: false,
    message: "",
  });

  const getProductsService = async () => {
    try {
      const response = await getProducts();
      if (response.status === 200) {
        const products = response.data;
        const findProductToEdit = products.find((product) => product.id === id);
        if (findProductToEdit) {
          setProductToEdit(findProductToEdit);
          setLoading(false);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setShowModalError({ show: true, message: "Algo salió mal" });
    }
  };

  const onHandeleModalError = () => {
    setShowModalError({ show: !showModalError.show, message: "" });
  };

  useEffect(() => {
    getProductsService();
  }, []);

  return (
    <section className="mx-auto">
      <div className="separator-botton wrapper wrapper--title flex justify-between items-center ">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            width={30}
            height={30}
            src="http://cdn.onlinewebfonts.com/svg/img_72513.png"
            alt=""
          />
        </span>
        <h2 className="my-3 font-bold">EDITAR PRODUCTO</h2>
        <span></span>
      </div>

      <div className="wrapper wrapper--form">
        <FormProduct product={productToEdit} loading={loading} />
      </div>

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

export default EditPage;
