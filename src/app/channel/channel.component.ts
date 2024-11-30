import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';
import { LastUrlService } from '../services/last-url.service';
import { DataServiceService } from '../services/data-service.service';
import { ChannelHeaderComponent } from './channel-header/channel-header.component';
import { ChannelInputComponent } from './channel-input/channel-input.component';
import { ChannelChatAreaComponent } from './channel-chat-area/channel-chat-area.component';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ChannelHeaderComponent,
    ChannelInputComponent,
    ChannelChatAreaComponent,
  ],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss', './channel-keyframes.scss'],
})
export class ChannelComponent implements OnInit {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;

  constructor(
    public uiService: UiService,
    private lastUrlService: LastUrlService,
    public dataServiceService: DataServiceService
  ) {}
  ngOnInit(): void {
    // this.setAnimation();
  }

  setAnimation() {
    const getWidth = (url: string | undefined) => {
      if (!url) return 100;
      if (url.includes('sidebar') && !url.includes('thread')) return 80;
      if (url.includes('sidebar') && url.includes('thread')) return 55;
      if (!url.includes('sidebar') && url.includes('thread')) return 75;
      return 100;
    };

    const startWidth = getWidth(this.lastUrlService.lastUrl);
    const finishedWidth = getWidth(this.lastUrlService.currentUrl);
    return `transition${startWidth}To${finishedWidth}`;
  }
}
