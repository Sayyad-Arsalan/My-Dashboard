import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionDataService } from '../../Services/SessionDataServices/session-data.service';
import { CrudapiService } from '../../Services/API-Services/crudapi.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/API-Services/auth.service';
import { NotificationService } from '../../Services/MessageService/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginComponent {
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private sessionDataService: SessionDataService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          this.isLoading = false;
          this.sessionDataService.setUserInfo(response.user);
          this.sessionDataService.setToken(response.token);
          // this.cookieService.set('token', response.token, { path: '/', sameSite: 'None', secure: true });
          this.notificationService.showSuccess('Login successful!',);

          this.router.navigate(['/home']); // Redirect to a dashboard or home page
        },
        (error) => {
          this.isLoading = false;
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
        }
      );
    }
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
