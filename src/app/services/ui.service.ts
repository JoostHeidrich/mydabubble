import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private threadOpen = new BehaviorSubject<boolean>(false);
  private sidebarOpen = new BehaviorSubject<boolean>(false);

  threadOpen$ = this.threadOpen.asObservable();
  sidebarOpen$ = this.sidebarOpen.asObservable();

  public lastUrl: any = undefined;
  public currentUrl: any = undefined;
  public routerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.lastUrl = this.currentUrl;
        this.currentUrl = this.router.url;
        this.checkForThread();
        this.checkForSidebar();
      });
  }

  checkForThread() {
    const isThreadInCurrent = this.currentUrl.includes('thread');
    console.log(isThreadInCurrent + ' thread');
    if (isThreadInCurrent) {
      this.threadOpen.next(true);
    } else {
      this.threadOpen.next(false);
    }
  }

  checkForSidebar() {
    const isSidebardInCurrent = this.currentUrl.includes('sidebar');
    console.log(isSidebardInCurrent + ' sidebar');
    if (isSidebardInCurrent) {
      this.sidebarOpen.next(true);
    } else {
      this.sidebarOpen.next(false);
    }
  }
}
