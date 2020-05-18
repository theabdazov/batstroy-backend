import { IsString } from 'class-validator';

export class FileAddingDto {
  @IsString()
  filename: string;

  @IsString()
  originalFilename: string;

  @IsString()
  path: string;
}
