import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import InputBk from "../../components/fields/InputBk";
import { Product_I } from "../../interfaces/products";
import { createProduct, updateProduct } from "../../services/products";
import { RegisterSchemaType, registerSchema } from "../../schemas/formSchemas";

const FormProduct: FC<Props> = ({ product, loading }) => {
  const [isToUpdate, setIsToUpdate] = useState(!!product);
  const [loadingForm, setLoadingForm] = useState(loading);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: Product_I) => {
    setLoadingButton(true);
    try {
      if (!isToUpdate) {
        const response = await createProduct(data);
        if (response.status === 200) {
          setLoadingButton(false);
          navigate("/");
        }
        return;
      }

      const response = await updateProduct(data);
      if (response.status === 200) {
        setLoadingButton(false);
        navigate("/");
      }
    } catch (error) {
      // MOSTRAR MODAL DE ERROR
      alert("mal registro");
    }
  };

  const resetForm = () => {
    if (!isToUpdate) setValue("id", "");
    setValue("name", "");
    setValue("description", "");
    setValue("logo", "");
    setValue("date_release", "");
    setValue("date_revision", "");

    clearErrors();
    focusInput();
  };

  const focusInput = () => {
    const inputId = document.getElementById("inputId");
    const inputName = document.getElementById("inputName");

    if (isToUpdate && inputName) {
      return inputName.focus();
    }

    if (inputId) inputId.focus();
  };

  useEffect(() => {
    setIsToUpdate(!!product);
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("logo", product.logo);
      setValue("date_release", product.date_release.split("T")[0]);
      setValue("date_revision", product.date_revision.split("T")[0]);
    }
  }, [product]);

  useEffect(() => {
    setLoadingForm(!loading);
  }, [loading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="contenedor-fields">
        <div className="wrapper-field">
          <InputBk
            label={"ID*"}
            id="inputId"
            type="text"
            register={register("id")}
            loading={loadingForm}
            disabled={isToUpdate}
            readOnly={isToUpdate}
            error={errors.id?.message}
          />
        </div>

        <div className="wrapper-field">
          <InputBk
            label={"Nombre*"}
            id="inputName"
            type="text"
            register={register("name")}
            loading={loadingForm}
            error={errors.name?.message}
          />
        </div>

        <div className="wrapper-field">
          <InputBk
            label={"Descripción*"}
            type="text"
            register={register("description")}
            loading={loadingForm}
            error={errors.description?.message}
          />
        </div>

        <div className="wrapper-field">
          <InputBk
            label={"Logo*"}
            type="text"
            register={register("logo")}
            loading={loadingForm}
            error={errors.logo?.message}
          />
        </div>

        <div className="wrapper-field">
          <InputBk
            label={"Fecha de liberación*"}
            type="date"
            register={register("date_release")}
            loading={loadingForm}
            error={errors.date_release?.message}
          />
        </div>

        <div className="wrapper-field">
          <InputBk
            label={"Fecha de revición*"}
            type="date"
            register={register("date_revision")}
            loading={loadingForm}
            error={errors.date_revision?.message}
          />
        </div>
      </div>

      <div className="flex gap-5 justify-center mt-14">
        <button
          className="btn btn--secondary"
          type="button"
          onClick={resetForm}
        >
          Reiniciar
        </button>

        <button
          className="btn btn--primary"
          type="submit"
          disabled={loadingButton}
        >
          {loadingButton ? (
            <img
              className="spin-animation"
              width={20}
              src="https://cdn2.iconfinder.com/data/icons/interface-vol-3-1/16/sync-syncronize-transfer-spin-512.png"
              alt=""
            />
          ) : isToUpdate ? (
            "Actualizar"
          ) : (
            "Crear"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormProduct;

type Props = {
  product?: Product_I;
  loading: boolean;
};
