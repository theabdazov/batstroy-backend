import { ApiProperty } from '@nestjs/swagger';

export class FileDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  originalFilename: string;

  @ApiProperty()
  path: string;
}
