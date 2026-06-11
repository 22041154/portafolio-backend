import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class AboutService {
  
  async getAbout() {
    const db = getFirestore();
    const doc = await db.collection('config').doc('about').get();
    return doc.exists ? doc.data() : { texto: '', imagenUrl: '' };
  }
  
  async updateAbout(text: string, file?: Express.Multer.File) {
    const db = getFirestore();
    let updateData: any = { texto: text };

    if (file) {
      const cloudResponse = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'perfil' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
      
      updateData.imagenUrl = cloudResponse.secure_url;
    }

    // Actualizamos Firebase
    await db.collection('config').doc('about').set(updateData, { merge: true });
    return updateData;
  }
}