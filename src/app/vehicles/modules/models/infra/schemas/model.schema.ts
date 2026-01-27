import z from 'zod';

export const modelSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  brand: z.string(),
});

export type ZodModelInput = z.infer<typeof modelSchema>;
