import { UserEntity } from '@app/users/domain/user.entity';

export interface BrandEntity {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserEntity;
  updatedBy: UserEntity;
}
