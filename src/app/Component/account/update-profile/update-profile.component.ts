import { Component } from '@angular/core';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { SessionDataService } from '../../../Services/SessionDataServices/session-data.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/API-Services/auth.service';
import { NotificationService } from '../../../Services/MessageService/notification.service';

export interface Avatar {
  public_id: string;
  url: string;
}

export interface Resume {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  aboutMe: string;
  password: string;
  portfolioURL: string;
  instagramURL: string;
  facebookURL: string;
  githubURL: string;
  linkedInURL: string;
  twitterURL: string;
  avatar: Avatar;
  resume: Resume;
  __v: number;
}
@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  user: User = {} as User;
  fullName = '';
  email = '';
  phone = '';
  aboutMe = '';
  portfolioURL = '';
  avatarPreview: string | null = null;
  resumePreview: string | null = null;
  avatarFile: File | null = null;  // Added this property
  resumeFile: File | null = null;  // Added this property


  constructor(
    private apiService: CrudapiService,
    private sessionDataService: SessionDataService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private notificationService:NotificationService

  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.user = this.sessionDataService.getUserInfo();
    this.avatarPreview=this.user.avatar.url;
    this.resumePreview=this.user.resume.url;
  }


  onUpdate() {
    const formData = new FormData();
    formData.append('fullName', this.user.fullName);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('aboutMe', this.user.aboutMe);
    formData.append('portfolioURL', this.user.portfolioURL);
    formData.append('githubURL', this.user.githubURL);
    formData.append('linkedInURL', this.user.linkedInURL);
    formData.append('instagramURL', this.user.instagramURL);
    formData.append('twitterURL', this.user.twitterURL);
    formData.append('facebookURL', this.user.facebookURL);

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile);
    } else if (this.avatarPreview) {
      // Ensure avatarPreview is not null or undefined
      formData.append('avatar', this.avatarPreview);
    } else {
      // Handle the case where both avatarFile and avatarPreview are not available
      console.error('No avatar file or preview available');
    }

    if (this.resumeFile) {
      formData.append('resume', this.resumeFile);
    } else if (this.resumePreview) {
      // Ensure resumePreview is not null or undefined
      formData.append('resume', this.resumePreview);
    } else {
      // Handle the case where both resumeFile and resumePreview are not available
      console.error('No resume file or preview available');
    }

    this.authService.updateUser(formData).subscribe(
      (response) => {
        this.notificationService.showSuccess('Update successful!',);
        this.getUser();
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  getUser(){
    this.authService.getCurrentUser().subscribe(
      (response) => {
        this.user = this.sessionDataService.getUserInfo();
        this.avatarPreview=this.user.avatar.url;
        this.resumePreview=this.user.resume.url;
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
  // Event handlers for avatar and resume file selection
  avatarHandler(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.avatarPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  resumeHandler(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.resumePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

}
