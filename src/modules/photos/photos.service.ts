import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore'; // <-- Usamos la nueva forma de importar Firestore
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { FirebaseService } from '../firebase/firebase.service';

// Configuramos tu cuenta de Cloudinary
cloudinary.config({
  cloud_name: 'dmbd9ccik', 
  api_key: '629111568688329', 
  api_secret: 'Dm6WCmYCqZ2DTEXCBgF4JXWC5yM',
});

@Injectable()
export class PhotosService {
  constructor(private readonly firebaseService: FirebaseService) {}

  // 1. Función auxiliar para subir el archivo a Cloudinary
  private uploadToCloudinary(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portafolio' }, 
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async create(photoData: any, file: Express.Multer.File) {
    // 2. Subimos la imagen a la nube de Cloudinary
    const cloudResponse = await this.uploadToCloudinary(file);
    const imageUrl = cloudResponse.secure_url; 

    // 3. Preparamos el documento
    const nuevaFoto = {
      titulo: photoData.titulo,
      camara: photoData.camara,
      categoria: photoData.categoria,
      descripcion: photoData.descripcion,
      url: imageUrl, 
    };

    // 4. Guardamos en Firestore usando getFirestore()
    const db = getFirestore(); 
    const docRef = await db.collection('photos').add(nuevaFoto);
    
    return { id: docRef.id, ...nuevaFoto };
  }

  async findAll() {
    const db = getFirestore();
    const snapshot = await db.collection('photos').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async remove(id: string) {
    const db = getFirestore();
    await db.collection('photos').doc(id).delete();
    return { deleted: true };
  }
}