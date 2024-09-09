import { Injectable, EventEmitter } from '@angular/core';

export interface NotificationList {
  type: 'info' | 'error' | 'check';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notification = new EventEmitter<NotificationList>();

  constructor() {}

  public notify(notification: NotificationList): void {
    this.notification.emit(notification);
  }
}