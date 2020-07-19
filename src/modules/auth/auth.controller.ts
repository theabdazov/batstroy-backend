import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from '../user/dto/user-credentials.dto';
import { UserWithToken } from './interfaces/user-with-token';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(public service: AuthService) {
  }

  @Post('login')
  async login(@Body() userCredentialsDto: UserCredentialsDto): Promise<UserWithToken> {
    return await this.service.login(userCredentialsDto);
  }

}
