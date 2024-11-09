import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  limit,
  onSnapshot,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  allChannel: any = [];

  constructor(public firestore: Firestore) {
    this.subMessages();
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
}
