import { BrandEntity } from '../../brands/domain/brand.entity';

export interface ModelEntity {
  id: string;
  name: string;
  brand: BrandEntity;
}
