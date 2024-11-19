import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { FormsModule } from '@angular/forms';
import { updateProfile, updateEmail, getAuth } from 'firebase/auth';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  constructor(
    private firestore: Firestore,
    public dataServiceService: DataServiceService,
    private router: Router,
    private uiService: UiService
  ) {}
  auth = getAuth();

  open: any = 'logOut';
  email: any;
  userName: any;

  ngOnInit(): void {
    this.email = this.dataServiceService.currentUser.email;
    this.userName = this.dataServiceService.currentUser.name;
  }

  logOut() {
    this.dataServiceService.currentUid = undefined;
    this.dataServiceService.currentUser = undefined;
    this.uiService.editProfile = false;

    this.router.navigate([``]);
  }

  saveEdit() {
    const user = this.auth.currentUser;

    if (user) {
      // Aktualisiere den Profilnamen
      updateProfile(user, {
        displayName: this.userName,
      })
        .then(() => {
          console.log('Profile updated successfully.');

          // Aktualisiere die E-Mail-Adresse
          return updateEmail(user, this.email);
        })
        .then(() => {
          console.log('Email updated successfully.');

          // Speichere die aktualisierten Daten in Firestore
          return updateDoc(doc(this.firestore, `user/${user.uid}`), {
            name: this.userName,
            email: this.email,
          });
        })
        .then(() => {
          this.open = 'openProfile';
          console.log('User data updated in Firestore.');
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      console.error('No user is signed in.');
    }
  }
}
