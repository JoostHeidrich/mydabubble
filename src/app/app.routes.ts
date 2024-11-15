import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home/channel/:channelId/sidebar', component: HomeComponent },
  { path: 'home/channel/:channelId', component: HomeComponent },
  {
    path: 'home/channel/:channelId/thread/:threadId/sidebar',
    component: HomeComponent,
  },
  {
    path: 'home/channel/:channelId/thread/:threadId',
    component: HomeComponent,
  },
];
