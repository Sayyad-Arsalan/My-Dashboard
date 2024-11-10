import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionDataService } from '../SessionDataServices/session-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(
    private sessionDataService: SessionDataService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if the token exists in session data
    const token = this.sessionDataService.getToken();

    if (token) {
      return true;
    } else {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
