import { hash as genHash, genSalt, compare } from 'bcryptjs';

export class HashService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await genHash(password, salt);
  }

  async isValid(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
