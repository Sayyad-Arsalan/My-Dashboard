import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { NotificationService } from '../../../Services/MessageService/notification.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css',
})
export class SkillComponent {
  skillForm: FormGroup;
  svgPreview: string | null = null;
  skills: any[] = [];
  skillId: string | null = null;
  svg:any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == "new"){

    }else{
      this.skillId = this.route.snapshot.paramMap.get('id');
      this.getSkills();

    }
  }

  getSkills() {
    this.apiService.getAll<any[]>('skill/getall').subscribe(
      (data: any) => {
        this.skills = data.skills;
        this.populateForm();

      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }
  populateForm() {
    if (this.skillId) {
      const skill = this.skills.find((s) => s._id === this.skillId);
      if (skill) {
        this.skillForm.patchValue({
          skill: skill.title,
          proficiency: skill.proficiency,
        });
        this.svgPreview = skill.svg?.url || null;
      }
    }
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: CrudapiService,
    private route: ActivatedRoute,
    private notificationService: NotificationService

  ) {
    this.skillForm = this.fb.group({
      skill: ['', Validators.required],
      proficiency: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  avatarHandler(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.svgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.svg = file; // Save the file to the component's state
    }
  }


  saveSkill() {
    if (this.skillForm.valid) {

      if(this.skillId){
        this.update(this.skillId)
      }else{
        this.create()
      }
    }
  }

  create() {
    const formData = new FormData();
    formData.append("title", this.skillForm.get("skill")?.value);
    formData.append("proficiency", this.skillForm.get("proficiency")?.value);
    if (this.svg) {
      formData.append("svg", this.svg); // Append the file
    }

    this.apiService.create<any>('skill/add', formData).subscribe(
      response => {
        this.notificationService.showSuccess("Skill Created Successfully!");
        this.router.navigate(['home/skills']);
      },
      error => {
        console.error("Error adding skill:", error);
        this.notificationService.showError("Error Occur while Creating Skiils")
      }
    );
  }

  update(skillId: string) {
    const formData = new FormData();
    formData.append("title", this.skillForm.get("skill")?.value);
    formData.append("proficiency", this.skillForm.get("proficiency")?.value);
    if (this.svg) {
      formData.append("svg", this.svg); // Append the file only if there's a new image to upload
    }

    this.apiService.update<any>('skill/update', skillId, formData).subscribe(
      response => {
        this.notificationService.showSuccess("Skill Updated Successfully!");
        this.router.navigate(['home/skills']);

      },
      error => {
        console.error("Error updating skill:", error);
        this.notificationService.showError("Error Occur while Updating Skiils")
      }
    );
  }



  cancel() {
    this.router.navigate(['home/skills']);
  }
  Delete(){
   if(this.skillId){
    this.apiService.delete<any>('skill/delete', this.skillId).subscribe(
      response => {
        this.notificationService.showSuccess("Skill Deleted Successfully!");
        this.router.navigate(['home/skills']);

      },
      error => {
        console.error("Error Deleting skill:", error);
        this.notificationService.showError("Error Occur while Deleting Skiils")
      }
    );
   }
  }
}
