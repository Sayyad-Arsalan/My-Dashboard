import { NotificationService } from './../../Services/MessageService/notification.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CrudapiService } from '../../Services/API-Services/crudapi.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatCardModule,CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  Messages: any[] = [];


  constructor(
    private apiService: CrudapiService,
    private router: Router,
    private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.apiService.getAll<any[]>('message/getall').subscribe(
      (data: any) => {
        this.Messages = data.messages;
      },
      (error) => {
        console.error('Error fetching Messages:', error);
      }
    );
  }

  deleteMessage(id: string) {
    this.apiService.delete<any>('message/delete', id).subscribe(
      () => {
        this.Messages = this.Messages.filter(message => message._id !== id);
       this.notificationService.showSuccess("Message deleted successfully.");
        this.getMessages();
      },
      (error) => {
        console.error('Error deleting message:', error);
        this.notificationService.showError('Error deleting message:');
      }
    );
  }
}
