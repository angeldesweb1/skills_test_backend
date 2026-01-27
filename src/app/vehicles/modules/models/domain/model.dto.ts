export interface CreateModelDto {
  id: string;
  name: string;
  brand: string;
}

export type UpdateModelDto = Partial<CreateModelDto>;
