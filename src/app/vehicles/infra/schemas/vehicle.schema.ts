import z from 'zod';

export const createVehicleSchema = z.object({
  id: z.string(),
  model: z.string(),
  make_date: z.date(),
  status: z.enum(
    ['disponible', 'mantenimiento', 'servicio'],
    'Debe seleccionar una opción válida',
  ),
  createdBy: z.string(),
});

export const updateVehicleSchema = z.object({
  model: z.string().optional(),
  make_date: z.date().optional(),
  status: z
    .enum(
      ['disponible', 'mantenimiento', 'servicio'],
      'Debe seleccionar una opción válida',
    )
    .optional(),
  updatedBy: z.string(),
});
