import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  constructor(
    private dataServiceService: DataServiceService,
    private router: Router
  ) {}

  logOut() {
    this.dataServiceService.currentUid = undefined;
    this.dataServiceService.currentUser = undefined;
    this.router.navigate([``]);
  }
}
