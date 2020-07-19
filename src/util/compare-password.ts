import * as bcrypt from 'bcrypt';

export function comparePasswords(userPassword, currentPassword): Promise<boolean> {
  return bcrypt.compare(currentPassword, userPassword);
};
