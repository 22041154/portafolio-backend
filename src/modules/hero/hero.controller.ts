import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  getHero() {
    return this.heroService.getHero();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  updateHero(@UploadedFile() file: Express.Multer.File) {
    return this.heroService.updateHero(file);
  }
}