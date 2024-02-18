import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showNotification(message: string, type: 'success' | 'warning' | 'danger') {
    switch (type) {
      case 'success':
        this.toastr.success(message);
        break;
      case 'warning':
        this.toastr.warning(message);
        break;
      case 'danger':
        this.toastr.error(message);
        break;
      default:
        this.toastr.info(message);
        break;
    }
  }
}
