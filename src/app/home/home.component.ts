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
import { EditProfileComponent } from '../pop-ups/edit-profile/edit-profile.component';
import { Router } from '@angular/router';

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
    EditProfileComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;
  constructor(
    public uiService: UiService,
    public lastUrlService: LastUrlService,
    private router: Router
  ) {}

  closePopup() {
    console.log(this.router.url);
    let newUrl = this.router.url;

    if (this.router.url.includes('createChannel')) {
      newUrl = newUrl.replace('createChannel', '');
    } else if (this.router.url.includes('edit-profile')) {
      newUrl = newUrl.replace('edit-profile', '');
    }

    // Entferne auch eventuell entstehende doppelte Schrägstriche
    newUrl = newUrl.replace(/\/{2,}/g, '/');

    // Entferne den abschließenden Schrägstrich, falls vorhanden
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.slice(0, -1);
    }

    // Die URL aktualisieren, ohne die Seite neu zu laden
    this.router.navigateByUrl(newUrl, { skipLocationChange: true });
  }
}
