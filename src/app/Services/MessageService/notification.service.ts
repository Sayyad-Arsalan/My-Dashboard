// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toastrConfig: Partial<IndividualConfig> = {
    timeOut: 3000,
    closeButton: true,
    progressBar: true,
    progressAnimation: 'decreasing',
    easing: 'ease-in',
    easeTime: 300,
    positionClass: 'toast-bottom-center'
  };

  constructor(private toastr: ToastrService) {}

  // Show a success message
  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      ...this.toastrConfig,
      toastClass: 'ngx-toastr success-toast', // custom class for success
    });
  }

  // Show an error message
  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      ...this.toastrConfig,
      toastClass: 'ngx-toastr error-toast', // custom class for error
    });
  }

  // Show an info message
  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, {
      ...this.toastrConfig,
      toastClass: 'ngx-toastr info-toast', // custom class for info
    });
  }

  // Show a warning message
  showWarn(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, {
      ...this.toastrConfig,
      toastClass: 'ngx-toastr warn-toast', // custom class for warning
    });
  }

  // Clear any open toasts
  clear() {
    this.toastr.clear();
  }
}
