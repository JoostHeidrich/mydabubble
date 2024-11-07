import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';
import { LastUrlService } from '../services/last-url.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  sidebarOpen$ = this.uiService.sidebarOpen$;
  constructor(
    public uiService: UiService,
    private lastUrlService: LastUrlService
  ) {}
  ngOnInit(): void {}

  getClass() {
    let lastUrl = this.lastUrlService.lastUrl;
    let currentUrl = this.lastUrlService.currentUrl;
    if (lastUrl == undefined && currentUrl.includes('sidebar')) {
      return 'transIn';
    } else if (lastUrl == undefined && !currentUrl.includes('sidebar')) {
      return 'stayOut';
    } else if (lastUrl.includes('sidebar') && currentUrl.includes('sidebar')) {
      return 'stayIn';
    } else if (
      !lastUrl.includes('sidebar') &&
      !currentUrl.includes('sidebar')
    ) {
      return 'stayOut';
    } else if (lastUrl.includes('sidebar') && !currentUrl.includes('sidebar')) {
      return 'transOut';
    } else if (!lastUrl.includes('sidebar') && currentUrl.includes('sidebar')) {
      return 'transIn';
    } else {
      return undefined;
    }
  }
}
