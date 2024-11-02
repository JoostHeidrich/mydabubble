import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;

  public routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    // Abonniere auf NavigationEnd-Events, um URL-Änderungen zu erkennen
    this.routerSubscription = this.router.events.subscribe((event) => {
      this.updateWidthBasedOnUrl();
    });

    // Initiale Überprüfung der URL
    this.updateWidthBasedOnUrl();
  }

  updateWidthBasedOnUrl(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('sidebar')) {
      this.content.nativeElement.classList.remove('d-none');
    } else {
      this.content.nativeElement.classList.add('d-none');
    }
  }
}
