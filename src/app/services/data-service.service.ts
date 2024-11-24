import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  limit,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  allChannel: any = [];
  allMessages: any = [];
  allUser: any = [];
  currentUid: any;
  currentUser: any;

  constructor(
    public firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    // Rufe subMessages auf, wenn sich die URL ändert
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.subChannels();
        this.subMessages();
      });

    // Überwache den aktuellen Benutzer
    user(this.auth).subscribe((currentUser: any) => {
      if (currentUser) {
        this.currentUid = currentUser.uid;
        this.setCurrentUser();
      } else {
        console.log('Kein Nutzer eingeloggt');
      }
    });
  }

  subMessages() {
    const q = query(
      collection(
        this.firestore,
        'channels',
        this.getChannelIDFromURL(),
        'messages'
      ),
      limit(1000)
    );
    onSnapshot(
      q,
      (list) => {
        this.allMessages = [];
        list.forEach((element) => {
          this.allMessages.push(
            this.setNoteObjectMessage(element.data(), element.id)
          );
        });
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  setNoteObjectMessage(obj: any, id: string) {
    return {
      id: id,
      userID: obj.userID || '',
      message: obj.message || '',
      sendTime: obj.sendTime || '',
      fileUrl: obj.fileUrl || '',
      fileName: obj.fileName || '',
      threadCount: obj.threadCount || '',
      lastThreadMessage: obj.lastThreadMessage || '',
      checkMark: obj.checkMark || '',
      handshake: obj.handshake || '',
      thumbsUp: obj.thumbsUp || '',
      thumbsDown: obj.thumbsDown || '',
      rocket: obj.rocket || '',
      nerdFace: obj.nerdFace || '',
      noted: obj.noted || '',
      shushingFace: obj.shushingFace || '',
    };
  }

  subChannels() {
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
      channelCreator: obj.channelCreator || '',
      description: obj.description || '',
      channelUser: obj.channelUser || '',
      creationDate: obj.creationDate || '',
    };
  }

  setCurrentUser() {
    this.allUser = [];
    const q = query(collection(this.firestore, 'user'), limit(1000));
    onSnapshot(
      q,
      (list) => {
        list.forEach((element) => {
          this.allUser.push(this.setNoteObjectUser(element.data(), element.id));
        });
        // Verarbeite allUser nachdem die Daten vollständig geladen sind
        for (let i = 0; i < this.allUser.length; i++) {
          const element = this.allUser[i];
          if (element.id === this.currentUid) {
            this.currentUser = element;
          }
        }
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  setNoteObjectUser(obj: any, id: string) {
    return {
      id: id,
      ProfilePictureUrl: obj.ProfilePictureUrl || '',
      email: obj.email || '',
      name: obj.name || '',
    };
  }

  getChannelIDFromURL(): string {
    const url = window.location.pathname;
    const match = url.match(/\/channel\/([^\/]+)/);
    return match ? match[1] : 'undefined';
  }

  uploadFile(file: File, source: any): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `${source}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  async deleteFile(fileUrl: string, source: any): Promise<void> {
    const storage = getStorage();
    const fileRef = ref(storage, `${source}/${fileUrl}`);

    deleteObject(fileRef)
      .then(() => {})
      .catch((error) => {});
  }
}
