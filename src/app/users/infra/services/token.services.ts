import { UserEntity } from '@app/users/domain/user.entity';
import { ConfigModule } from '@lib/common/config/config.module';
import { CoreManager } from '@lib/core/main/containter.core';
import { CONFIG } from '@lib/di/keys';
import { injectable } from 'inversify';
import { encode, decode } from 'jwt-simple';
import day from 'dayjs';
import 'dotenv/config';

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

@injectable()
export class JwtService {
  //TO-DO migrate to handle config private manager: CoreManager = CoreManager.manage();
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
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
