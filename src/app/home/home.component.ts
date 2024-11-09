import { Component } from '@angular/core';
import { ChannelComponent } from '../channel/channel.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThreadComponent } from '../thread/thread.component';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';
import { SidebarToggleButtonComponent } from '../sidebar-toggle-button/sidebar-toggle-button.component';
import { HeaderComponent } from '../header/header.component';
import { NewChannelComponent } from '../pop-ups/new-channel/new-channel.component';
import { LastUrlService } from '../services/last-url.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChannelComponent,
    SidebarComponent,
    ThreadComponent,
    CommonModule,
    SidebarToggleButtonComponent,
    HeaderComponent,
    NewChannelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;
  constructor(public uiService: UiService, public lastUrlService: LastUrlService) {}
}
