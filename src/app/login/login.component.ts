import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private dataServiceService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.dataServiceService.currentUid = user.uid;
        let firstChannel = this.dataServiceService.allChannel[0].id;
        this.router.navigate([`home/channel/${firstChannel}/sidebar`]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode}, Message: ${errorMessage}`);
      });
  }
}
