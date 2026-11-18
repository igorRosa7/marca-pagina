import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Variáveis de ambiente inválidas:");
  console.error(z.prettifyError(result.error));
  process.exit(1);
}

export const env = result.data;
