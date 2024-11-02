import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit {
  @ViewChild('contentContainer') contentContainer!: ElementRef;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {

    // Abonniere auf NavigationEnd-Events, um URL-Änderungen zu erkennen
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateWidthBasedOnUrl();
      }
    });

    // Initiale Überprüfung der URL
    this.updateWidthBasedOnUrl();
  }

  private updateWidthBasedOnUrl(): void {
    const currentUrl = this.router.url;
    const containsSidebar = currentUrl.includes('sidebar');
    const containsThread = currentUrl.includes('thread');

    if (containsSidebar && containsThread) {
      this.setWidthPercentage(55);
    } else if (containsThread) {
      this.setWidthPercentage(75);
    } else if (containsSidebar) {
      this.setWidthPercentage(80);
    } else {
      this.setWidthPercentage(100);
    }
  }

  ngOnDestroy(): void {
    // Stelle sicher, dass das Subscription bei der Zerstörung der Komponente beendet wird
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  setWidthPercentage(percent: number): void {
    const vw = window.innerWidth / 100; // 1vw in px
    const widthInVw = percent * vw; // Berechne die Breite basierend auf Prozent
    this.contentContainer.nativeElement.style.width = `${widthInVw}px`;
  }
}
