import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { SessionDataService } from '../../../Services/SessionDataServices/session-data.service';

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
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User = {} as User;

  constructor(
    private apiService: CrudapiService,
    private sessionDataService: SessionDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.user = this.sessionDataService.getUserInfo();
  }
}
