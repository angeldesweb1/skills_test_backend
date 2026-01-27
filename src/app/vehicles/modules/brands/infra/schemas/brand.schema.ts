import z from 'zod';

export const brandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
});

export type ZodBrandInput = z.infer<typeof brandSchema>;
