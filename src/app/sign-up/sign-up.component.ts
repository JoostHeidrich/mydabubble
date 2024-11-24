import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [CommonModule],
})
export class SignUpComponent {
  selectedFile: File | null = null;
  FileUrl: any;
  savedFiledUrl: any;
  constructor(
    private firestore: Firestore,
    private dataServiceService: DataServiceService,
    private router: Router
  ) {}

  auth = getAuth();
  async signUp(email: string, password: string, Name: string) {
    let imageUrl = await this.saveFile();
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Speichere den Vor- und Nachnamen in Firestore
        return setDoc(doc(this.firestore, `user/${user.uid}`), {
          name: Name,
          email: email,
          ProfilePictureUrl: imageUrl,
        });
      })
      .then(() => {
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

  onFileSelected(event: any) {
    if (this.FileUrl) {
      this.deleteFile();
    }
    const originalFile = event.target.files[0];
    const newFile = new File(
      [originalFile],
      `${Date.now()}.${originalFile.type.split('/')[1]}`,
      {
        type: originalFile.type,
      }
    );

    this.selectedFile = newFile;
    this.saveFileToCache();
  }

  async saveFileToCache() {
    if (this.selectedFile) {
      const imageUrl = await this.dataServiceService.uploadFile(
        this.selectedFile,
        'profilePicturesCache'
      );
      this.FileUrl = imageUrl;
    } else {
    }
  }

  async saveFile() {
    if (this.selectedFile) {
      const imageUrl = await this.dataServiceService.uploadFile(
        this.selectedFile,
        'profilePictures'
      );
      this.deleteFile();
      return imageUrl;
    } else {
      return undefined;
    }
  }

  deleteFile() {
    let name = this.selectedFile!.name;
    this.dataServiceService.deleteFile(name!, 'profilePicturesCache');
    this.FileUrl = null;
    this.selectedFile = null;
  }
}
