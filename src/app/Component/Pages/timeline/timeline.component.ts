import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrudapiService } from '../../../Services/API-Services/crudapi.service';
import { NotificationService } from '../../../Services/MessageService/notification.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  timelineForm: FormGroup;
  timelineId: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: CrudapiService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.timelineForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      from: ['', [Validators.required, Validators.min(1900)]],
      to: ['', [Validators.min(1900)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      // New timeline, no existing data
    } else {
      this.timelineId = this.route.snapshot.paramMap.get('id');
      this.getTimeline();
    }
  }

  getTimeline() {
    this.apiService.getAll<any[]>('timeline/getall').subscribe(
      (data: any) => {
        const timeline = data.timelines.find(
          (t: any) => t._id === this.timelineId
        );
        if (timeline) {
          this.timelineForm.patchValue({
            title: timeline.title,
            description: timeline.description,
            from: timeline.timeline.from,
            to: timeline.timeline.to,
          });
        }
      },
      (error) => {
        console.error('Error fetching timeline:', error);
      }
    );
  }

  saveTimeline() {
    if (this.timelineForm.valid) {
      if (this.timelineId) {
        this.updateTimeline(this.timelineId);
      } else {
        this.createTimeline();
      }
    }
  }

  createTimeline() {
    const timelineData = this.timelineForm.value;
    this.apiService.create<any>('timeline/add', timelineData).subscribe(
      (response) => {
        this.notificationService.showSuccess('Timeline Created Successfully!');
        this.router.navigate(['home/timelines']);
      },
      (error) => {
        console.error('Error creating timeline:', error);
        this.notificationService.showError('Error Occurred while Creating Timeline');
      }
    );
  }

  updateTimeline(timelineId: string) {
    const timelineData = this.timelineForm.value;
    this.apiService.update<any>('timeline/update', timelineId, timelineData).subscribe(
      (response) => {
        this.notificationService.showSuccess('Timeline Updated Successfully!');
        this.router.navigate(['home/timelines']);
      },
      (error) => {
        console.error('Error updating timeline:', error);
        this.notificationService.showError('Error Occurred while Updating Timeline');
      }
    );
  }

  cancel() {
    this.router.navigate(['home/timelines']);
  }

  delete() {
    if (this.timelineId) {
      this.apiService.delete<any>('timeline/delete', this.timelineId).subscribe(
        (response) => {
          this.notificationService.showSuccess('Timeline Deleted Successfully!');
          this.router.navigate(['home/timelines']);
        },
        (error) => {
          console.error('Error deleting timeline:', error);
          this.notificationService.showError('Error Occurred while Deleting Timeline');
        }
      );
    }
  }
}
