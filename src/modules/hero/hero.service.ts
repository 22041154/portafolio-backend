import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class HeroService {
  async getHero() {
    const db = getFirestore();
    const doc = await db.collection('config').doc('hero').get();
    return doc.exists ? doc.data() : { imageUrl: '' };
  }

  async updateHero(file: Express.Multer.File) {
    const db = getFirestore();
    const cloudResponse = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'hero' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
    
    await db.collection('config').doc('hero').set({ imageUrl: cloudResponse.secure_url });
    return { imageUrl: cloudResponse.secure_url };
  }
}