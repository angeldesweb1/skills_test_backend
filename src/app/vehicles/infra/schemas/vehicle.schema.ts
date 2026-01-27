import z from 'zod';

export const createVehicleSchema = z.object({
  id: z.string(),
  model: z.string(),
  year: z.string(),
  status: z.enum(
    ['disponible', 'mantenimiento', 'servicio'],
    'Debe seleccionar una opción válida',
  ),
  createdBy: z.string(),
});

export const updateVehicleSchema = z.object({
  model: z.string().optional(),
  year: z.string().optional(),
  status: z
    .enum(
      ['disponible', 'mantenimiento', 'servicio'],
      'Debe seleccionar una opción válida',
    )
    .optional(),
  updatedBy: z.string(),
});
