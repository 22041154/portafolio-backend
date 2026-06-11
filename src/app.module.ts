import { Module } from '@nestjs/common';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { AboutModule } from './modules/about/about.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PhotosModule } from './modules/photos/photos.module';
import { PackagesModule } from './modules/packages/packages.module';
import { HeroModule } from './modules/hero/hero.module';
import { HeroController } from './modules/hero/hero.controller';
import { HeroService } from './modules/hero/hero.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    FirebaseModule, 
    AboutModule,
    CategoriesModule,
    PhotosModule,
    PackagesModule,
    HeroModule,
    AuthModule,
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class AppModule {}