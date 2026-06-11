import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.getAbout();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Atrapa el archivo enviado con el nombre 'file'
  updateAbout(
    @Body() body: any,                      // Recibe el texto
    @UploadedFile() file: Express.Multer.File // Recibe la imagen
  ) {
    // Pasamos el texto y el archivo opcional al servicio
    return this.aboutService.updateAbout(body.texto, file);
  }
}