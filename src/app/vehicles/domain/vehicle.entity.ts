import { UserEntity } from '@app/users/domain/user.entity';
import { ModelEntity } from '../modules/models/domain/model.entity';

export interface VehicleEntity {
  id: string;
  model: ModelEntity;
  year: string;
  status: 'displnible' | 'mantenimiento' | 'servicio';
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserEntity;
  updatedBy: UserEntity;
}
