import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { NotificationService } from '../../../Services/MessageService/notification.service';
import { MatSelectModule } from '@angular/material/select';
interface Deploy {
  value: string;
}
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectForm: FormGroup;
  projects: any[] = [];
  projectId: string | null = null;
  deployDatasource: Deploy[] = [
    {value: 'Yes', },
    {value: 'No', },
  ];
  projectBanner:any;
  projectBannerPreview: string | null = null; // For storing the banner preview


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: CrudapiService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectLink: ['', Validators.required],
      gitRepoLink: ['', Validators.required],
      deployed: ['', Validators.required],
      technologies: ['', Validators.required],
      stack: ['', Validators.required],
       // Add the banner form control

    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== "new") {
      this.projectId = id;
      this.getProject();
    }
  }

  getProject() {
    if (this.projectId) {
      this.apiService.getOne<any>('project/get', this.projectId).subscribe(
        (data: any) => {
          this.projects = [data.project];
          this.projectBanner = data.project.projectBanner;
          this.projectBannerPreview = data.project.projectBanner?.url || null; // Set the preview if there's an existing banner

          this.populateForm();
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
  }

  populateForm() {
    if (this.projectId) {
      const project = this.projects.find(p => p._id === this.projectId);
      if (project) {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          projectLink: project.projectLink,
          gitRepoLink: project.gitRepoLink,
          deployed: project.deployed,
          technologies: project.technologies,
          stack: project.stack,
          projectBanner:project.projectBanner


        });
      }
    }
  }
  bannerHandler(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.projectBannerPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.projectBanner = file; // Save the file for uploading
    }
  }

  saveProject() {
    if (this.projectForm.valid) {
      if (this.projectId) {
        this.updateProject();
      } else {
        this.createProject();
      }
    }
  }

  createProject() {
    const projectData = this.projectForm.value;
    const formData = new FormData();
    formData.append("title", projectData.title);
    formData.append("description", projectData.description);
    formData.append("projectLink", projectData.projectLink);
    formData.append("gitRepoLink", projectData.gitRepoLink);
    formData.append("deployed", projectData.deployed);
    formData.append("technologies", projectData.technologies);
    formData.append("stack", projectData.stack);

    if (this.projectBanner) {
      formData.append("projectBanner", this.projectBanner); // Append the banner file
    }

    this.apiService.create<any>('project/add', formData).subscribe(
      (response) => {
        this.notificationService.showSuccess("Project Created Successfully!");
        this.router.navigate(['home/projects']);
      },
      (error) => {
        console.error("Error creating project:", error);
        this.notificationService.showError("Error occurred while creating project");
      }
    );
  }

  updateProject() {
    const projectData = this.projectForm.value;
    const formData = new FormData();
    formData.append("title", projectData.title);
    formData.append("description", projectData.description);
    formData.append("projectLink", projectData.projectLink);
    formData.append("gitRepoLink", projectData.gitRepoLink);
    formData.append("deployed", projectData.deployed);
    formData.append("technologies", projectData.technologies);
    formData.append("stack", projectData.stack);

    if (this.projectBanner) {
      formData.append("projectBanner", this.projectBanner); // Append the banner if updated
    }

    if (this.projectId) {
      this.apiService.update<any>('project/update', this.projectId, formData).subscribe(
        (response) => {
          this.notificationService.showSuccess("Project Updated Successfully!");
          this.router.navigate(['home/projects']);
        },
        (error) => {
          console.error("Error updating project:", error);
          this.notificationService.showError("Error occurred while updating project");
        }
      );
    }
  }


  cancel() {
    this.router.navigate(['home/projects']);
  }

  delete() {
    if (this.projectId) {
      this.apiService.delete<any>('project/delete', this.projectId).subscribe(
        (response) => {
          this.notificationService.showSuccess("Project Deleted Successfully!");
          this.router.navigate(['home/projects']);
        },
        (error) => {
          console.error("Error deleting project:", error);
          this.notificationService.showError("Error occurred while deleting project");
        }
      );
    }
  }


}
