import bcrypt from 'bcrypt';

export class Hashing {
  static hash(toHash: string) {
    return bcrypt.hashSync(toHash, 10);
  }

  static match(value: string, hash: string) {
    return bcrypt.compareSync(value, hash);
  }
}
