import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LastUrlService } from '../last-url.service';

@Component({
  selector: 'app-thread',
  standalone: true,
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  public routerSubscription: Subscription | undefined;

  constructor(private router: Router, private lastUrlService: LastUrlService) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    // NavigationEnd-Events filtern, um nur auf abgeschlossene Navigationen zu reagieren
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateWidthBasedOnUrl();
      });
    this.updateWidthBasedOnUrl();
  }

  updateWidthBasedOnUrl(): void {
    const currentUrl = this.router.url;
    console.log(this.lastUrlService.getLastUrl());
    if (
      currentUrl.includes('thread') &&
      !this.lastUrlService.getLastUrl()?.includes('thread')
    ) {
      this.content.nativeElement.classList.remove('transOut');
      this.content.nativeElement.classList.add('transIn');
      console.log('thread wird geöfnet');
    } else if (
      this.lastUrlService.getLastUrl()?.includes('thread') &&
      !currentUrl.includes('thread')
    ) {
      console.log('thread wird geschlossen');
      this.content.nativeElement.classList.remove('transIn');
      this.content.nativeElement.classList.add('transOut');
    } else if (
      this.lastUrlService.getLastUrl()?.includes('thread') &&
      currentUrl.includes('thread')
    ) {
      console.log('thread schon offen');
      this.content.nativeElement.classList.remove('transIn');
      this.content.nativeElement.classList.remove('transOut');
      console.log(this.content.nativeElement);
    }
  }

  ngOnDestroy(): void {
    // Subscription sauber aufräumen
    this.routerSubscription!.unsubscribe();
  }
}
