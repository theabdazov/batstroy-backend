import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserAddingDto } from './dto/user-adding.dto';
import { UserDto } from './dto/user.dto';

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
  create(@Body() dto: UserAddingDto): Promise<UserDto> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Get(':id')
  getById(@Param('id') id: number): Promise<UserDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UserAddingDto): Promise<UserDto> {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<UserDto> {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<UserDto[]> {
    return this.service.getAll();
  }
}
