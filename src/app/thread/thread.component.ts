import { Component } from '@angular/core';
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  threadOpen$ = this.uiService.threadOpen$;

  constructor(public uiService: UiService) {}
}
