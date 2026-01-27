import { UserEntity } from '@app/users/domain/user.entity';
import { ConfigModule } from '@lib/common/config/config.module';
import { CoreManager } from '@lib/core/main/containter.core';
import { CONFIG } from '@lib/di/keys';
import { injectable } from 'inversify';
import { encode, decode } from 'jwt-simple';
import day from 'dayjs';

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

@injectable()
export class JwtService {
  private manager: CoreManager = CoreManager.manage();
  private secret: string;

  constructor() {
    this.secret = this.manager
      .get<ConfigModule>(CONFIG)
      .get('jwt_secret') as string;
  }

  createToken(user: UserEntity): string {
    const payload = {
      sub: user.uuid,
      iat: day(),
      exp: day().add(1, 'day'),
    };
    return encode(payload, this.secret);
  }

  decodeToken(token: string): Payload {
    return decode(token, this.secret);
  }
}
