import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../Services/MessageService/notification.service';
import { AuthService } from '../../../Services/API-Services/auth.service';

@Component({
  selector: 'app-update-password',
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
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,

  ){
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  onSave() {
    if (this.resetPasswordForm.valid) {
      const { currentPassword, newPassword, confirmNewPassword } = this.resetPasswordForm.value;
      this.authService.resetPassword(currentPassword, newPassword, confirmNewPassword).subscribe(
        (response) => {
          this.notificationService.showSuccess('Password Reset successfully!');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Password Reset Failed', error);
          this.notificationService.showError('Password Reset Failed!');
        }
      );
    } else {
    }
  }

}
