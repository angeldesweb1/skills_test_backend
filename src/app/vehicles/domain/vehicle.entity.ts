import { UserEntity } from '@app/users/domain/user.entity';
import { ModelEntity } from '../modules/models/domain/model.entity';

export interface VehicleEntity {
  id: string;
  model: ModelEntity;
  make_date: Date;
  status: 'displnible' | 'mantenimiento' | 'servicio';
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserEntity;
  updatedBy: UserEntity;
}
