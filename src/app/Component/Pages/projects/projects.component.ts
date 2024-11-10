import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: any[] = [];
  displayedColumns: string[] = ['srNo', 'title', 'description', 'technologies'];


  constructor(
    private apiService: CrudapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.apiService.getAll<any[]>('project/getall').subscribe(
      (data: any) => {
        this.projects = data.projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  // Navigate to skill details page based on skill ID
  navigateToProject(projectId: string) {
    this.router.navigate(['home/project', projectId]);
  }
  addClick(){
    this.router.navigate(['home/project', "new"]);
  }

}
