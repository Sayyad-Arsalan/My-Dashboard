import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatTabsModule,ProfileComponent, UpdateProfileComponent, UpdatePasswordComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
