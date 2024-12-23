import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../models/channel';
import { DataServiceService } from '../../services/data-service.service';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-channel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-channel.component.html',
  styleUrl: './new-channel.component.scss',
})
export class NewChannelComponent {
  channel = new Channel();
  constructor(
    public uiServie: UiService,
    public dataServiceService: DataServiceService,
    private firestore: Firestore
  ) {}
  openPopup: any = 'createChannel';
  currenSelection = 'all';
  allSelectedUser: any = [];

  channelName: any;
  description: any = '';

  async saveChannel() {
    this.setMessage();
    await addDoc(collection(this.firestore, 'channels'), this.toJSON()).catch(
      (err) => {
        console.log(err);
      }
    );
    this.uiServie.createChannel = false;
  }

  toJSON() {
    return {
      id: this.channel.id,
      name: this.channel.name,
      creator: this.channel.creator.id,
      description: this.channel.description,
      user: this.channel.user,
      creationDate: this.channel.date,
    };
  }

  setMessage(): void {
    this.channel.creator = this.dataServiceService.currentUser;
    this.channel.name = this.channelName;
    this.channel.description = this.description;
    this.channel.date = new Date();
  }
}
