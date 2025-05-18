// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
});

// src/config/env.ts
export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  PORT: Number(process.env.PORT) || 3001,
  CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000', // Valor padrão
  APP_VERSION: process.env.APP_VERSION || '1.0.0' // Valor padrão
};