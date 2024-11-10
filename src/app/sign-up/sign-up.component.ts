import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [],
})
export class SignUpComponent {
  constructor(
    private firestore: Firestore,
    private dataServiceService: DataServiceService,
    private router: Router
  ) {}

  auth = getAuth();
  ProfilePictureUrl: any =
    'https://firebasestorage.googleapis.com/v0/b/mydabubble-7530d.firebasestorage.app/o/messangeImages%252F1730903564947.png?alt=media&token=f2996306-eebd-4fce-9bf5-5a66364861b2';
  signUp(email: string, password: string, Name: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);

        // Speichere den Vor- und Nachnamen in Firestore
        return setDoc(doc(this.firestore, `user/${user.uid}`), {
          name: Name,
          email: email,
          ProfilePictureUrl: this.ProfilePictureUrl,
        });
      })
      .then(() => {
        console.log('User data saved to Firestore');
        let firstChannel = this.dataServiceService.allChannel[0].id;
        this.router.navigate([``]);
      })
      .catch((error) => {
        console.error(
          'Error signing up or saving data:',
          error.code,
          error.message
        );
      });
  }
}
