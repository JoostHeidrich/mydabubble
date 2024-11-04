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
import { UiService } from '../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  threadOpen$ = this.uiService.threadOpen$;
  sidebarOpen$ = this.uiService.sidebarOpen$;
  constructor(public uiService: UiService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.sidebarOpen$, 'sidebar');
    console.log(this.threadOpen$, 'thread');
  }
}
