import { Component } from '@angular/core';
import { ChannelComponent } from "../channel/channel.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ThreadComponent } from "../thread/thread.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChannelComponent, SidebarComponent, ThreadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
