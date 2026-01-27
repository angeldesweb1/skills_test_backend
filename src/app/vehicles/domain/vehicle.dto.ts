export interface CreateVehicleDto {
  id: string;
  model: string;
  year: string;
  status: 'displnible' | 'mantenimiento' | 'servicio';
}

export type UpdateVehicleDto = Partial<CreateVehicleDto>;
