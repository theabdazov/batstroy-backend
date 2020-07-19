import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from '../user/dto/user-credentials.dto';
import { UserWithToken } from './interfaces/user-with-token';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async login(loginUserDto: UserCredentialsDto): Promise<UserWithToken> {
    const user = await this.usersService.getByPhoneNumber(loginUserDto);
    const token = this._createToken(user);
    return {
      ...user,
      token,
    };
  }

  private _createToken({ phoneNumber }: UserDto): string {
    const user: JwtPayload = { phoneNumber };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

}
