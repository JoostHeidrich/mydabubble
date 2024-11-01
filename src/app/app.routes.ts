import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChannelComponent } from './channel/channel.component';
import { ThreadComponent } from './thread/thread.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home/sidebar',
    component: SidebarComponent,
    children: [
      {
        path: 'channel',
        component: ChannelComponent,
        children: [
          {
            path: 'thread',
            component: ThreadComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'home/channel',
    component: ChannelComponent,
    children: [
      {
        path: 'thread',
        component: ThreadComponent,
      },
    ],
  },
];
