import { NotificationService } from './../../Services/MessageService/notification.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SessionDataService } from '../../Services/SessionDataServices/session-data.service';
import { AuthService } from '../../Services/API-Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    MatToolbarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isOpen = false;
  userInfo: any;
  navItems = [
    { label: 'Dashboard', route: 'home/dashboard', icon: 'dashboard' },
    { label: 'Profile', route: 'home/account', icon: 'person' },
    { label: 'Skill', route: 'home/skills', icon: 'build' },
    { label: 'Timeline', route: 'home/timelines', icon: 'event' },
    { label: 'Project', route: 'home/projects', icon: 'folder_shared' },
    { label: 'Software Application', route: 'home/softwareApplications', icon: 'settings_applications' },
    { label: 'Message', route: 'home/message', icon: 'message' },
    // { label: 'Settings', route: '/settings', icon: 'settings' },
  ];

  constructor(
    private router: Router,
    private sessionDataService: SessionDataService,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        this.sessionDataService.clearToken();
        this.sessionDataService.clearUserInfo();
        this.notification.showSuccess("Logut Successfully!")

      }
      ,(error) =>{}
    );
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isOpen = false; // Close the sidenav after navigating
  }

  loadUserInfo() {
    this.userInfo = this.sessionDataService.getUserInfo();
  }
}
