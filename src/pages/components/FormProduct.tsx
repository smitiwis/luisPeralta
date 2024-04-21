import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Product_I } from "../../interfaces/products";
import { createProduct, updateProduct } from "../../services/products";

// ========================================
const registerSchema = z
  .object({
    id: z
      .string()
      .min(1, { message: "Este campo es requerido." })
      .regex(/-lp$/, { message: "Id no válido." }),
    name: z.string().min(1, { message: "Este campo es requerido." }),
    description: z.string().min(1, { message: "Este campo es requerido." }),
    logo: z.string().min(1, { message: "Este campo es requerido." }),
    date_release: z.string().min(1, { message: "Este campo es requerido." }),
    date_revision: z.string().min(1, { message: "Este campo es requerido." }),
  })
  .strict();

type RegisterSchemaType = z.infer<typeof registerSchema>;
// ========================================

type Props = {
  product?: Product_I;
};
const FormProduct: FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: Product_I) => {
    try {
      if(!product){
        const response = await createProduct(data);
        if (response.status === 200) {
          navigate("/");
        }
        return;
      }

      const response = await updateProduct(data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      alert("mal registro");
    }
  };

  const resetForm = () => {
    reset();
    clearErrors();
    focusFirstInput();
  };

  const focusFirstInput = () => {
    const firstInput = document.getElementById("firstInput");
    if (firstInput) firstInput.focus();
  };

  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("logo", product.logo);
      setValue("date_release", product.date_release);
      setValue("date_revision", product.date_revision);
    }
  }, [product]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="flex gap-2 mb-3">
        <span>ID*</span>
        <input type="text" {...register("id")} id="firstInput" />
        <p className="text-xs text-red-500">{errors.id?.message}</p>
      </label>

      <label className="flex gap-2 mb-3">
        <span>Nombre*</span>
        <input type="text" {...register("name")} />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
      </label>

      <label className="flex gap-2 mb-3">
        <span>Descripción*</span>
        <input type="text" {...register("description")} />
        <p className="text-xs text-red-500">{errors.description?.message}</p>
      </label>

      <label className="flex gap-2 mb-3">
        <span>Logo*</span>
        <input type="text" {...register("logo")} />
        <p className="text-xs text-red-500">{errors.logo?.message}</p>
      </label>

      <label className="flex gap-2 mb-3">
        <span>Fecha de liberación*</span>
        <input type="text" {...register("date_release")} />
        <p className="text-xs text-red-500">{errors.date_release?.message}</p>
      </label>

      <label className="flex gap-2 mb-3">
        <span>Fecha de revición*</span>
        <input type="text" {...register("date_revision")} />
        <p className="text-xs text-red-500">{errors.date_revision?.message}</p>
      </label>

      <div className="flex gap-5">
        <button type="button" onClick={resetForm}>
          Reiniciar
        </button>

        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default FormProduct;
