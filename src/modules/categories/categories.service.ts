import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  private collection;

  constructor(private firebaseService: FirebaseService) {
    this.collection = this.firebaseService.getFirestore().collection('categories');
  }

  async findAll() {
    const snapshot = await this.collection.get();
    
    const categories: any[] = [];
    
    snapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    return categories;
  }

  // Agregar una nueva categoría
  async create(createCategoryDto: CreateCategoryDto) {
    // Guardamos el nombre en Firestore. Firebase generará un ID único automáticamente.
    const newDoc = await this.collection.add({
      name: createCategoryDto.name,
      createdAt: new Date().toISOString()
    });

    return { id: newDoc.id, name: createCategoryDto.name };
  }

  // Eliminar una categoría
  async remove(id: string) {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`La categoría con ID ${id} no existe`);
    }

    await docRef.delete();
    return { message: 'Categoría eliminada correctamente' };
  }
}