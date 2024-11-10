import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  limit,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  allChannel: any = [];
  currentUid: any;
  currentUser: any;

  constructor(public firestore: Firestore, private auth: Auth) {
    this.subMessages();
    this.setCurrentUser();
    user(this.auth).subscribe((currentUser: any) => {
      if (currentUser) {
        this.currentUid = currentUser.uid;
        this.setCurrentUser();
        console.log('User ID:', currentUser.uid);
      } else {
        console.log('Kein Nutzer eingeloggt');
      }
    });
  }

  subMessages() {
    const q = query(collection(this.firestore, 'channels'), limit(1000));
    onSnapshot(
      q,
      (list) => {
        this.allChannel = [];
        list.forEach((element) => {
          this.allChannel.push(
            this.setNoteObjectChannel(element.data(), element.id)
          );
        });
        console.log(this.allChannel);
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  setNoteObjectChannel(obj: any, id: string) {
    return {
      id: id,
      channelName: obj.channelName || '',
      channelCeationTime: obj.channelCeationTime || '',
      channelCreator: obj.channelCreator || '',
      channelDescription: obj.channelDescription || '',
      channelUser: obj.channelUser || '',
    };
  }

  setNoteObjectUser(obj: any, id: string) {
    return {
      id: id,
      ProfilePictureUrl: obj.ProfilePictureUrl || '',
      email: obj.email || '',
      name: obj.name || '',
    };
  }

  setCurrentUser() {
    let allUser: any = [];
    const q = query(collection(this.firestore, 'user'), limit(1000));
    onSnapshot(
      q,
      (list) => {
        list.forEach((element) => {
          allUser.push(this.setNoteObjectUser(element.data(), element.id));
        });
        // Verarbeite allUser nachdem die Daten vollständig geladen sind
        for (let i = 0; i < allUser.length; i++) {
          const element = allUser[i];
          if (element.id === this.currentUid) {
            this.currentUser = element;
            console.log(this.currentUser);
          }
        }
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }
}
