import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ZodLoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  uuid: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type ZodRegisterInput = z.infer<typeof registerSchema>;
