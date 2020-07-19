import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserAddingDto } from './dto/user-adding.dto';
import { UserDto } from './dto/user.dto';
import { UserFilter } from './dto/user-filter';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('api/users')
export class UserController {

  constructor(public service: UserService) {
  }

  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: UserAddingDto): Promise<UserDto> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('id') id: number): Promise<UserDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() dto: UserAddingDto): Promise<UserDto> {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: number): Promise<UserDto> {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Query() query: UserFilter, @Req() req: any): Promise<UserDto[]> {
    return this.service.getAll(query);
  }
}
