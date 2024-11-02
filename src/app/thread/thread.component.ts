import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '25vw', // Zielbreite der Komponente
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          width: '0', // Startbreite für Animation
          opacity: 0,
          backgroundColor: 'blue',
        })
      ),
      transition('closed => open', [animate('3s ease-out')]),
      transition('open => closed', [animate('3s ease-in')]),
    ]),
  ],
})
export class ThreadComponent implements AfterViewInit {
  private routerSubscription: Subscription | undefined;
  isOpen = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Setzt isOpen mit einer leichten Verzögerung auf true
    setTimeout(() => {
      this.isOpen = true;
    }, 0); // kleines Delay, damit Angular das initiale Rendering abgeschlossen hat
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
