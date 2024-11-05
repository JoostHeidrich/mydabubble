import { Component } from '@angular/core';
import { LastUrlService } from '../services/last-url.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-toggle-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-toggle-button.component.html',
  styleUrl: './sidebar-toggle-button.component.scss',
})
export class SidebarToggleButtonComponent {
  constructor(public lastUrlService: LastUrlService, private router: Router) {}
  includes(url: string): boolean {
    return this.includes(url);
  }

  toggleSidebar() {
    // Extrahieren der aktuellen URL ohne den Domain-Teil
    const url = this.lastUrlService.currentUrl;
    let link;

    // Extrahiere channelId und threadId, falls vorhanden
    const channelMatch = url.match(/home\/channel\/([^\/]+)/);
    const threadMatch = url.match(/thread\/([^\/]+)/);

    const channelId = channelMatch ? channelMatch[1] : null;
    const threadId = threadMatch ? threadMatch[1] : null;

    // Überprüfen, ob die URL 'sidebar' enthält
    const isSidebarActive = url.includes('sidebar');

    // Aufbau des neuen Routen-Arrays basierend auf dem aktuellen Status von 'sidebar'
    if (isSidebarActive) {
      // Wenn 'sidebar' aktiv ist, entferne es
      link = ['/home/channel', channelId];
      if (threadId) {
        link.push('thread', threadId);
      }
    } else {
      // Wenn 'sidebar' nicht aktiv ist, füge es hinzu
      link = ['/home/channel', channelId];
      if (threadId) {
        link.push('thread', threadId);
      }
      link.push('sidebar');
    }

    // Navigation zur neuen Route
    this.router.navigate(link);
  }
}
