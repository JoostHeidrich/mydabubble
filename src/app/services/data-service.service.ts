import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  limit,
  onSnapshot,
  orderBy,
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
  currentChannel: any = [];
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
        this.currentChannel.id,
        'messages'
      ),
      orderBy('date', 'desc'), // Sortiert die Nachrichten basierend auf dem `date`-Feld in aufsteigender Reihenfolge
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
      userId: obj.userId || '',
      message: obj.message || '',
      date: obj.date || '',
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
        this.setCurrentChannel();
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  setCurrentChannel() {
    const url = this.router.url;
    if (!url.includes('channel')) {
      return; // Funktion verlassen, wenn "channel" nicht vorhanden ist
    }

    const match = url.match(/channel\/([^/]+)/);
    if (match) {
      // Überprüfen, ob ein Match gefunden wurde
      const id = match[1];

      for (let i = 0; i < this.allChannel.length; i++) {
        const element = this.allChannel[i];
        if (element.id === id) {
          this.currentChannel = element;
          this.subMessages();
        }
      }
    } else {
      console.warn('Keine gültige Channel-ID in der URL gefunden.');
    }
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

  getUserFromID(id: any) {
    for (let i = 0; i < this.allUser.length; i++) {
      const element = this.allUser[i];
      if (element.id === id) {
        return element;
      }
    }
  }

  returnTime(timestamp: number) {
    const date = new Date(timestamp);

    return {
      hour: date.getHours(), // Stunde
      minutes: String(date.getMinutes()).padStart(2, '0'), // Minuten, zweistellig
      seconds: String(date.getSeconds()).padStart(2, '0'), // Sekunden, zweistellig
      day: date.getDate(), // Tag
      month: date.getMonth() + 1, // Monat (0-basiert, daher +1)
      weekday: date.toLocaleString('de-DE', { weekday: 'long' }), // Wochentag (z. B. "Montag")
    };
  }
}
