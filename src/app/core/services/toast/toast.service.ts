import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toast } from 'src/app/shared/toast/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();

  constructor() { }

  /**
   * Returns an Observable that components can subscribe to, to receive new toast messages.
   */
  getToast(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  /**
   * Shows a success toast message.
   * @param message The main message content.
   * @param title An optional title for the toast.
   * @param delay An optional delay in milliseconds before the toast hides (default is 5000ms).
   */
  showSuccess(message: string, title: string = 'Success', delay: number = 5000): void {
    this.toastSubject.next({
      id: this.generateUniqueId(),
      message,
      type: 'success',
      title,
      delay
    });
  }

  /**
   * Shows an error toast message.
   * @param message The main message content.
   * @param title An optional title for the toast.
   * @param delay An optional delay in milliseconds before the toast hides (default is 5000ms).
   */
  showError(message: string, title: string = 'Error', delay: number = 5000): void {
    this.toastSubject.next({
      id: this.generateUniqueId(),
      message,
      type: 'error',
      title,
      delay
    });
  }

  /**
   * Shows an info toast message.
   * @param message The main message content.
   * @param title An optional title for the toast.
   * @param delay An optional delay in milliseconds before the toast hides (default is 5000ms).
   */
  showInfo(message: string, title: string = 'Info', delay: number = 5000): void {
    this.toastSubject.next({
      id: this.generateUniqueId(),
      message,
      type: 'info',
      title,
      delay
    });
  }

  /**
   * Generates a simple unique ID for each toast.
   */
  private generateUniqueId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
