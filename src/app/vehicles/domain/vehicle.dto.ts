export interface CreateVehicleDto {
  id: string;
  model: string;
  make_year: Date;
  status: 'displnible' | 'mantenimiento' | 'servicio';
}

export type UpdateVehicleDto = Partial<CreateVehicleDto>;
