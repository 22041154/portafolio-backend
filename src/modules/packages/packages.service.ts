import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  private collection;

  constructor(private firebaseService: FirebaseService) {
    this.collection = this.firebaseService.getFirestore().collection('packages');
  }

  async findAll() {
    const snapshot = await this.collection.get();
    const packages: any[] = [];
    
    snapshot.forEach(doc => {
      packages.push({ id: doc.id, ...doc.data() });
    });
    
    return packages;
  }

  async create(createPackageDto: CreatePackageDto) {
    const newDoc = await this.collection.add({
      ...createPackageDto,
      createdAt: new Date().toISOString()
    });

    return { id: newDoc.id, ...createPackageDto };
  }

  async remove(id: string) {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`El paquete con ID ${id} no existe`);
    }

    await docRef.delete();
    return { message: 'Paquete eliminado correctamente' };
  }
}