import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import 'multer';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Esto "atrapa" el archivo que viene del frontend
  create(
    @Body() body: any, // Aquí viene el título, cámara, etc.
    @UploadedFile() file: Express.Multer.File // Aquí viene la imagen física
  ) {
    // Le enviamos ambas cosas a nuestro servicio
    return this.photosService.create(body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}