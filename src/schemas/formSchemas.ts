import { z } from "zod";

export const registerSchema = z
  .object({
    id: z
      .string()
      .min(1, { message: "Este campo es requerido." })
      .regex(/-lp$/, { message: "Id no válido. | Ejemplo: xxxx-lp" }),
    name: z.string().min(1, { message: "Este campo es requerido." }),
    description: z.string().min(1, { message: "Este campo es requerido." }),
    logo: z
      .string()
      .min(1, { message: "Este campo es requerido." })
      .url({ message: "El campo debe tener una URL válida" }),
    date_release: z.string().min(1, { message: "Este campo es requerido." }),
    date_revision: z.string().min(1, { message: "Este campo es requerido." }),
  })
  .strict();

  export type RegisterSchemaType = z.infer<typeof registerSchema>;