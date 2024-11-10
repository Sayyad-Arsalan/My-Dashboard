import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://mern-portfolio-backend-ng23.onrender.com/api/v1/user';
  // private apiUrl = 'http://localhost:4000/api/v1/user';

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Login user and store token
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(this.handleError),
      // On success, save the token and user data
      map((response) => {
        localStorage.setItem('token', response.token);  // Store JWT token
        this.userSubject.next(response.user);  // Store user info in subject
        return response;
      })
    );
  }

  // Logout user and clear token
  logout(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(`${this.apiUrl}/logout`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Use Bearer token for authentication
      }),
      withCredentials: true  // This will include cookies in the request
    }).pipe(
      catchError(this.handleError),
      // On success, clear the token and user data
      map((response) => {
        localStorage.removeItem('token');
        this.userSubject.next(null);  // Clear user data
        return response;
      })
    );
  }

  // Get current logged-in user
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<any>(`${this.apiUrl}/portfolio/me`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }).pipe(catchError(this.handleError));
    }
    return new Observable(); // return empty observable if no token
  }

  updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.put<any>(`${this.apiUrl}/update/me`, userData, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`  // Use Bearer token for authentication
        }),
        withCredentials: true  // This will include cookies in the request
      }).pipe(
        catchError(this.handleError)  // Handle any errors here
      );
    }
    return throwError('User not authenticated');
  }
  resetPassword(currentPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${this.apiUrl}/update/password`, {
      currentPassword,
      newPassword,
      confirmNewPassword
    },
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Use Bearer token for authentication
      }),
      withCredentials: true  // This will include cookies in the request
    }).pipe(
      catchError(this.handleError),
      map((response) => {
        return response;
      })
    );
  }
  // Forgot Password
forgotPassword(email: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/password/forgot`, { email }).pipe(
    catchError(this.handleError),
    map((response) => {
      return response;
    })
  );
}

resetPasswordWithToken(token: string, password: string, confirmPassword: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/password/reset/${token}`, {
    password,
    confirmPassword
  }).pipe(
    catchError(this.handleError),
    map((response) => {
      return response;
    })
  );
}

  // Helper method to handle errors
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return throwError(error);
  }



}
