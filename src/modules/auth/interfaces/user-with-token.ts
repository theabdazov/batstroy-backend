import { UserDto } from '../../user/dto/user.dto';

export class UserWithToken extends UserDto {
  token: string;
}
