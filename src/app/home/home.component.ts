import { Component } from '@angular/core';
import { ChannelComponent } from '../channel/channel.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThreadComponent } from '../thread/thread.component';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChannelComponent, SidebarComponent, ThreadComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;
  constructor(public uiService: UiService) {}
}
