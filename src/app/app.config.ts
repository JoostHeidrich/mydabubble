import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { provideAuth, AuthModule, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  FirestoreModule,
  getFirestore,
} from '@angular/fire/firestore';
import {
  provideDatabase,
  DatabaseModule,
  getDatabase,
} from '@angular/fire/database';
import {
  provideStorage,
  StorageModule,
  getStorage,
} from '@angular/fire/storage';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
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
      provideStorage(() => getStorage())
    ),
  ],
};
