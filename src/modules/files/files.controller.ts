import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileAddingDto } from './dto/file-adding-dto';
import { FileDto } from './dto/file.dto';

const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  },
});

// You may want to move this function into a separate file then import it to make it cleaner


@ApiTags('files')
@Controller('api/files')
export class FilesController {
  constructor(public service: FilesService) {
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FilesInterceptor(
    'files', // name of the field being passed
    20,
    {
      storage: storageOptions,
    },
  ))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: FileDto,
  })
  uploadFile(@UploadedFiles() files) {
    const response: FileAddingDto[] = [];
    files.forEach(file => {
      const fileAddingDto: FileAddingDto = {
        filename: file.filename,
        originalFilename: file.originalname,
        path: `/api/files/${file.filename}`,
      };
      response.push(fileAddingDto);
    });
    return this.service.createOfMany(response);
  }

  @Get(':filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

  @ApiResponse({
    status: 200,
    type: FileDto,
    isArray: true
  })
  @Get()
  getAll() {
    return this.service.getAll();
  }
}
