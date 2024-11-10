import { Component } from '@angular/core';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-software-applications',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './software-applications.component.html',
  styleUrl: './software-applications.component.css'
})
export class SoftwareApplicationsComponent {
  softwareApplications: any[] = [];
  displayedColumns: string[] = ['srNo', 'name', 'icon'];


  constructor(
    private apiService: CrudapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSoftwareApplications();
  }

  getSoftwareApplications() {
    this.apiService.getAll<any[]>('softwareapplication/getall').subscribe(
      (data: any) => {
        this.softwareApplications = data.softwareApplications;
      },
      (error) => {
        console.error('Error fetching softwareApplications:', error);
      }
    );
  }

  navigateToSoftwareApplication(softwareApplicationId: string) {
    this.router.navigate(['home/softwareApplication', softwareApplicationId]);
  }
  addClick(){
    this.router.navigate(['home/softwareApplication', "new"]);
  }
}
