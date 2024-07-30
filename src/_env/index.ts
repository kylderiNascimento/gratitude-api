import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), // valores ENUM e default
  PORT: z.coerce.number().default(3333) // converter qualquer formato para number
})

const _env = envSchema.safeParse(process.env); 

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  // Caso falte alguma variável de ambiente a aplicação será abortada.  
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;