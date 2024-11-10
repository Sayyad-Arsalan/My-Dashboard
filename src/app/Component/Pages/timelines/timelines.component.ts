import { Component } from '@angular/core';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-timelines',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './timelines.component.html',
  styleUrl: './timelines.component.css'
})
export class TimelinesComponent {
  timelines: any[] = [];
  displayedColumns: string[] = ['srNo', 'title', 'timeline', 'description'];


  constructor(
    private apiService: CrudapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTimelines();
  }

  getTimelines() {
    this.apiService.getAll<any[]>('timeline/getall').subscribe(
      (data: any) => {
        this.timelines = data.timelines;
      },
      (error) => {
        console.error('Error fetching timelines:', error);
      }
    );
  }

  navigateToTimeline(timelineId: string) {
    this.router.navigate(['home/timeline', timelineId]);
  }
  addClick(){
    this.router.navigate(['home/timeline', "new"]);
  }
}
