import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ========================================
const registerSchema = z
  .object({
    id: z.string().min(1, { message: "Este campo es requerido." }),
    name: z.string().min(1, { message: "Este campo es requerido." }),
    description: z.string().min(1, { message: "Este campo es requerido." }),
    logo: z.string().min(1, { message: "Este campo es requerido." }),
    dateInit: z.string().min(1, { message: "Este campo es requerido." }),
    dateCheck: z.string().min(1, { message: "Este campo es requerido." }),
  })
  .strict();

type RegisterSchemaType = z.infer<typeof registerSchema>;
// ========================================

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section>
      <h2 className="mb-3 font-bold">FORMULARIO DE REGISTRO</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex gap-2 mb-3">
          <span>ID</span>
          <input type="text" {...register("id")} />
          <p>{errors.id?.message}</p>
        </label>

        <label className="flex gap-2 mb-3">
          <span>Nombre</span>
          <input type="text" {...register("name")} />
          <p>{errors.name?.message}</p>
        </label>

        <label className="flex gap-2 mb-3">
          <span>Descripción</span>
          <input type="text" {...register("description")} />
          <p>{errors.description?.message}</p>
        </label>

        <label className="flex gap-2 mb-3">
          <span>Logo</span>
          <input type="text" {...register("logo")} />
          <p>{errors.logo?.message}</p>
        </label>

        <label className="flex gap-2 mb-3">
          <span>Fecha de liberación</span>
          <input type="text" {...register("dateInit")} />
          <p>{errors.dateInit?.message}</p>
        </label>

        <label className="flex gap-2 mb-3">
          <span>Fecha de revición</span>
          <input type="text" {...register("dateCheck")} />
          <p>{errors.dateCheck?.message}</p>
        </label>

        <div>
          <button>Reiniciar</button>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
