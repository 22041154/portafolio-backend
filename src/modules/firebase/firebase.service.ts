import { Injectable } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private db: Firestore;

  constructor() {
    const serviceAccountPath = path.resolve(process.cwd(), 'firebase-service-account.json');

    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccountPath),
      });
    }

    this.db = getFirestore();
  }

  getFirestore(): Firestore {
    return this.db;
  }
}