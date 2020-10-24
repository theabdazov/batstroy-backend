import * as bcrypt from 'bcrypt';

export function passwordToHash(password: string) {
  return bcrypt.hash(password, 10);
}
