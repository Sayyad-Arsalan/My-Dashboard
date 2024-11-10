import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CrudapiService } from '../../Services/API-Services/crudapi.service';
import { SessionDataService } from '../../Services/SessionDataServices/session-data.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule, MatProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userInfo: any = {};
  projects: [] = [];
  skills: any[] = [];
  timelines: any[] = [];
  softwareApplications: any[] = [];
  messages:any[]=[];


  constructor(
    private apiService: CrudapiService,
    private sessionDataService: SessionDataService,
    private router: Router


  ) {}
  ngOnInit(): void {
    this.loadUserInfo();
    this.getProjects();
    this.getMessages();
    this.getSkills();
    this.getSoftwareApplications();
    this.getTimelines();
  }
  loadUserInfo() {
    this.userInfo = this.sessionDataService.getUserInfo();
  }


  getProjects() {
    this.apiService.getAll<any[]>('project/getall').subscribe(
      (data:any) => {
        this.projects=data.projects;

      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  getSkills() {
    this.apiService.getAll<any[]>('skill/getall').subscribe(
      (data:any) => {
        this.skills = data.skills;
      },
      (error) => {
        console.error('Error fetching skill:', error);
      }
    );
  }
  getSoftwareApplications() {
    this.apiService.getAll<any[]>('softwareapplication/getall').subscribe(
      (data:any) => {
        this.softwareApplications = data.softwareApplications;
      },
      (error) => {
        console.error('Error fetching software application:', error);
      }
    );
  }
  getTimelines() {
    this.apiService.getAll<any[]>('timeline/getall').subscribe(
      (data:any) => {
        this.timelines = data.timelines;
      },
      (error) => {
        console.error('Error fetching timeline:', error);
      }
    );
  }
  getMessages() {
    this.apiService.getAll<any[]>('message/getall').subscribe(
      (data:any) => {
        this.messages = data.messages;
      },
      (error) => {
        console.error('Error fetching message:', error);
      }
    );
  }

  visitPortfolio() {
    window.open(this.userInfo.portfolioURL, '_blank');
  }
  manageProject() {
    this.router.navigate(['home/projects']);
  }

  manageSkill() {
    this.router.navigate(['home/skills']);
  }
  visitProject(project: any) {
    if (project.projectLink) {
      window.open(project.projectLink, '_blank');
    } else {
      alert('No URL available for this project.');
    }
  }

   updateProject(project:any) {
    this.router.navigate([`/home/project/${project._id}`]);
  }

  deleteApp(appId: string) {
    this.apiService.delete('software-application/delete', appId).subscribe(() => {
      this.softwareApplications = this.softwareApplications.filter(
        (app) => app._id !== appId
      );
    });
  }

}
