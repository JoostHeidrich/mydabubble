import { Component } from '@angular/core';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';
import { LastUrlService } from '../services/last-url.service';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  constructor(
    public uiService: UiService,
    private lastUrlService: LastUrlService
  ) {}
  ngOnInit(): void {}

  getClass() {
    let lastUrl = this.lastUrlService.lastUrl;
    let currentUrl = this.lastUrlService.currentUrl;
    if (lastUrl == undefined && currentUrl.includes('thread')) {
      return 'transIn';
    } else if (lastUrl == undefined && !currentUrl.includes('thread')) {
      return 'stayOut';
    } else if (lastUrl.includes('thread') && currentUrl.includes('thread')) {
      return 'stayIn';
    } else if (
      !lastUrl.includes('thread') &&
      !currentUrl.includes('thread')
    ) {
      return 'stayOut';
    } else if (lastUrl.includes('thread') && !currentUrl.includes('thread')) {
      return 'transOut';
    } else if (!lastUrl.includes('thread') && currentUrl.includes('thread')) {
      return 'transIn';
    } else {
      return undefined;
    }
  }
}
