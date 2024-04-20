import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const body = {
        id: "xxx-lp",
        name: "servicio de seguro",
        description: "Seguro de depositos",
        logo: "https://media.istockphoto.com/id/1370442812/es/vector/s%C3%ADmbolo-m%C3%ADnimo-de-la-casa-concepto-inmobiliario-hipotecario-pr%C3%A9stamo-icono-vectorial-3d.jpg?s=1024x1024&w=is&k=20&c=chZS6bpZyHuUigXZFlzj3iOi53SFHx2sO9K0QqwpIxA=",
        date_release: "2024-04-21T00:00:00.000+00:00",
        date_revision: "2025-04-21T00:00:00.000+00:00",
      };
      const pathBase = process.env.REACT_APP_API_URL;
      const config = {
        headers: {
          authorId: 428,
        },
      };
      const response = await axios.post(
        `${pathBase!}/bp/products`,
        body,
        config
      );
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

  const goToList = () => {
    navigate("/");
  }

  useEffect(() => {
    focusFirstInput();
  }, []);

  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center">
        <span onClick={goToList}>back</span>
        <h2 className="my-3 font-bold">FORMULARIO DE REGISTRO</h2>
      </div>
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
            <p className="text-xs text-red-500">
              {errors.description?.message}
            </p>
          </label>

          <label className="flex gap-2 mb-3">
            <span>Logo*</span>
            <input type="text" {...register("logo")} />
            <p className="text-xs text-red-500">{errors.logo?.message}</p>
          </label>

          <label className="flex gap-2 mb-3">
            <span>Fecha de liberación*</span>
            <input type="text" {...register("date_release")} />
            <p className="text-xs text-red-500">
              {errors.date_release?.message}
            </p>
          </label>

          <label className="flex gap-2 mb-3">
            <span>Fecha de revición*</span>
            <input type="text" {...register("date_revision")} />
            <p className="text-xs text-red-500">
              {errors.date_revision?.message}
            </p>
          </label>

          <div className="flex gap-5">
            <button type="button" onClick={resetForm}>
              Reiniciar
            </button>

            <button type="submit">Enviar</button>
          </div>
        </form>
    </section>
  );
};

export default RegisterPage;
