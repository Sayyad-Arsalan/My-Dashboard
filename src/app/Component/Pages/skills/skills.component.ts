import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'skill', 'proficiency', 'icon'];
  skills: any[] = [];

  constructor(
    private apiService: CrudapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills() {
    this.apiService.getAll<any[]>('skill/getall').subscribe(
      (data: any) => {
        this.skills = data.skills;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  // Navigate to skill details page based on skill ID
  navigateToSkill(skillId: string) {
    this.router.navigate(['home/skill', skillId]);
  }
  addClick(){
    this.router.navigate(['home/skill', "new"]);
  }
}
