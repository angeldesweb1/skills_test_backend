export interface CreateBrandDto {
  id: string;
  name: string;
}

export type UpdateBrandDto = Partial<CreateBrandDto>;
