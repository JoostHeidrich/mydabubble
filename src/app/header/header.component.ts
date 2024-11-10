import { Component, OnInit } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { DataServiceService } from '../services/data-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LastUrlService } from '../services/last-url.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public dataServiceService: DataServiceService,
    public lastUrlService: LastUrlService
  ) {}

  openEditProfile() {}
}
