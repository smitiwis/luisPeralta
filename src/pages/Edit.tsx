import React, { useEffect, useState } from "react";
import FormProduct from "./components/FormProduct";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/products";
import { Product_I } from "../interfaces/products";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Product_I>();
  
  const getProductsService = async () => {
    try {
      const response = await getProducts();
      if (response.status === 200) {
        const products = response.data;
        const findProductToEdit = products.find((product) => product.id === id);
        if (findProductToEdit) {
          setProductToEdit(findProductToEdit)
        } else{
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsService();
  }, []);

  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center">
        <span onClick={() => navigate("/")}>BACK</span>
        <h2 className="my-3 font-bold">EDITAR PRODUCTO</h2>
      </div>
      <FormProduct product={productToEdit}/>
    </section>
  );
};

export default EditPage;
