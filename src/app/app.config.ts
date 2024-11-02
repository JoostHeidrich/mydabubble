import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'mydabubble-7530d',
        appId: '1:722838062050:web:e793a90baef141fd0cafbb',
        storageBucket: 'mydabubble-7530d.firebasestorage.app',
        apiKey: 'AIzaSyAX9eEVRGZZjBwxDSr082SJoJEosmwoJZc',
        authDomain: 'mydabubble-7530d.firebaseapp.com',
        messagingSenderId: '722838062050',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
