import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { NotificationService } from '../../../Services/MessageService/notification.service';

@Component({
  selector: 'app-software-application',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './software-application.component.html',
  styleUrl: './software-application.component.css'
})
export class SoftwareApplicationComponent {
  softwareApplicationForm: FormGroup;
  imagePreview: string | null = null;
  softwareApplicationId: string | null = null;
  image: any;

  constructor(
    private fb: FormBuilder,
    private apiService: CrudapiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.softwareApplicationForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      // New software application creation
    } else {
      this.softwareApplicationId = this.route.snapshot.paramMap.get('id');
      this.getSoftwareApplication();
    }
  }

  getSoftwareApplication() {
    if (this.softwareApplicationId) {
      this.apiService.getAll<any>('softwareapplication/getall').subscribe(
        (data: any) => {
          this.populateForm(data.softwareApplications);
        },
        (error) => {
          console.error('Error fetching software application:', error);
        }
      );
    }
  }

  populateForm(softwareApplications: any[]) {
    if (this.softwareApplicationId) {
      const application = softwareApplications.find((app) => app._id === this.softwareApplicationId);
      if (application) {
        this.softwareApplicationForm.patchValue({
          name: application.name,
        });
        this.imagePreview = application.svg?.url || null;
      }
    }
  }


  imageHandler(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }

  saveSoftwareApplication() {
    if (this.softwareApplicationForm.valid) {
      if (this.softwareApplicationId) {
        this.updateSoftwareApplication();
      } else {
        this.createSoftwareApplication();
      }
    }
  }

  createSoftwareApplication() {
    const formData = new FormData();
    formData.append('name', this.softwareApplicationForm.get('name')?.value);
    if (this.image) {
      formData.append('svg', this.image);
    }

    this.apiService.create<any>('softwareapplication/add', formData).subscribe(
      (response) => {
        this.notificationService.showSuccess('Software Application Created Successfully!');
        this.router.navigate(['home/softwareApplications']);
      },
      (error) => {
        console.error('Error creating software application:', error);
        this.notificationService.showError('Error Occurred while Creating Software Application');
      }
    );
  }

  updateSoftwareApplication() {
    const formData = new FormData();
    formData.append('name', this.softwareApplicationForm.get('name')?.value);
    if (this.image) {
      formData.append('svg', this.image);
    }

    if(this.softwareApplicationId){
      this.apiService.update<any>('softwareapplication/update', this.softwareApplicationId, formData).subscribe(
        (response) => {
          this.notificationService.showSuccess('Software Application Updated Successfully!');
          this.router.navigate(['home/softwareApplications']);
        },
        (error) => {
          console.error('Error updating software application:', error);
          this.notificationService.showError('Error Occurred while Updating Software Application');
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['home/softwareApplications']);
  }

  delete() {
    if (this.softwareApplicationId) {
      this.apiService.delete<any>('softwareapplication/delete', this.softwareApplicationId).subscribe(
        (response) => {
          this.notificationService.showSuccess('Software Application Deleted Successfully!');
          this.router.navigate(['home/softwareApplications']);
        },
        (error) => {
          console.error('Error deleting software application:', error);
          this.notificationService.showError('Error Occurred while Deleting Software Application');
        }
      );
    }
  }

}
