import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { FirebaseModule } from '../firebase/firebase.module'; // <-- Importamos Firebase aquí

@Module({
  imports: [FirebaseModule], // <-- Lo agregamos a la lista de importaciones
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}