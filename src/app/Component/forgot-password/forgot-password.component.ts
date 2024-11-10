import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/API-Services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from '../../Services/MessageService/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  emailHasError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (!this.email) {
      this.emailHasError = true;
      return;
    }
    this.isLoading = true;
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        this.isLoading = false;
        this.notificationService.showSuccess(
          'A reset link has been sent to your email'
        );
        this.router.navigate(['/login']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error:', error);
        this.notificationService.showError(
          'Failed to send reset link. Please try again.'
        );
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
