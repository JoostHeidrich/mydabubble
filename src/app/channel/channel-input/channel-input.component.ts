import { Component } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-channel-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './channel-input.component.html',
  styleUrl: './channel-input.component.scss',
})
export class ChannelInputComponent {
  message = new Message();
  input: any = '';
  constructor(
    public dataServiceService: DataServiceService,
    private firestore: Firestore
  ) {}

  async saveMessage() {
    this.setMessageContent();
    await addDoc(
      collection(
        this.firestore,
        'channels',
        this.dataServiceService.currentChannel.id,
        'messages'
      ),
      this.toJSON()
    ).catch((err) => {});
  }

  setMessageContent() {
    this.message.message = this.input;
    this.message.date = Date.now();
    this.message.userId = this.dataServiceService.currentUser.id;
    this.input = '';
  }

  toJSON() {
    return {
      id: this.message.id,
      userId: this.message.userId,
      date: this.message.date,
      message: this.message.message,
      fileUrl: this.message.fileUrl,
      fileName: this.message.fileName,
      threadCount: this.message.threadCount,
      lastThreadMessage: this.message.lastThreadMessage,
      thumbsUp: this.message.thumbsUp,
      thumbsDown: this.message.thumbsDown,
      rocket: this.message.rocket,
      nerdFace: this.message.nerdFace,
      noted: this.message.noted,
      shushingFace: this.message.shushingFace,
    };
  }
}
