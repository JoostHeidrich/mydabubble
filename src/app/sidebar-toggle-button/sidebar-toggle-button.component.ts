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
    const { currentUrl } = this.lastUrlService;

    const [, type, id] =
      currentUrl.match(/home\/(channel|directmessage)\/([^\/]+)/) || [];
    const threadId = currentUrl.match(/thread\/([^\/]+)/)?.[1];
    const isSidebarActive = currentUrl.includes('sidebar');

    if (!type || !id) return console.error('Ungültige URL-Struktur');

    const link = [
      `/home/${type}`,
      id,
      ...(threadId ? ['thread', threadId] : []),
      ...(isSidebarActive ? [] : ['sidebar']),
    ];
    this.router.navigate(link);
  }
}
