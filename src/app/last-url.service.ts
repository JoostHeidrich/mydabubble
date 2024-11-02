import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LastUrlService {
  lastUrl: any;
  currentUrl: any;
  public routerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    // Abonniere die Router-Events, um die letzte URL zu speichern
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.lastUrl = this.currentUrl;
        this.currentUrl = this.router.url; // Speichere die aktuelle URL als letzte URL
      });
  }

  // Methode zum Abrufen der letzten URL
  public getLastUrl(): string | null {
    return this.lastUrl;
  }
}
