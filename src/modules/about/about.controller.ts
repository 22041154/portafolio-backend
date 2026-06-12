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
  @UseInterceptors(FileInterceptor('file')) 
  updateAbout(
    @Body() body: any,                      
    @UploadedFile() file: Express.Multer.File 
  ) {
    return this.aboutService.updateAbout(body.texto, file);
  }
}