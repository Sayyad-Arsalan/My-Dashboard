import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/API-Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from '../../Services/MessageService/notification.service';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  token: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.token = id || '';
  }

  onSubmit() {
    if (this.password !== this.confirmPassword || !this.password || !this.confirmPassword) return;

    this.isLoading = true;
    this.authService.resetPasswordWithToken(this.token, this.password, this.confirmPassword)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Password has been reset successfully');
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: () => {
          this.notificationService.showError('Failed to reset password. Please try again.');
          this.isLoading = false;
        }
      });
  }
}
