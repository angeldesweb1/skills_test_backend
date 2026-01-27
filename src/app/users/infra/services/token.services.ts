import { UserEntity } from '@app/users/domain/user.entity';
import { ConfigModule } from '@lib/common/config/config.module';
import { CoreManager } from '@lib/core/main/containter.core';
import { CONFIG } from '@lib/di/keys';
import { injectable } from 'inversify';
import { encode, decode } from 'jwt-simple';

@injectable()
export class JwtService {
  private manager: CoreManager = CoreManager.manage();
  private secret: string;

  constructor() {
    this.secret = this.manager
      .get<ConfigModule>(CONFIG)
      .get('jwt_secret') as string;
  }

  createToken(payload: UserEntity): string {
    return encode(payload, this.secret);
  }

  decodeToken(token: string): UserEntity {
    return decode(token, this.secret);
  }
}
