import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Toast } from './toast.interface';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: false
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast | null = null;
  private toastSubscription: Subscription | undefined;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastSubscription = this.toastService.getToast().subscribe(toast => {
      this.toast = toast;
      setTimeout(() => this.showBootstrapToast(toast), 0);
    });
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  private showBootstrapToast(toast: Toast): void {
    const toastElement = document.getElementById(toast.id);
    if (toastElement) {
      const bsToast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: toast.delay || 5000
      });

      toastElement.addEventListener('hidden.bs.toast', () => {
        this.toast = null;
      });

      bsToast.show();
    }
  }

  getToastHeaderClass(type: string): string {
    switch (type) {
      case 'success': return 'text-white bg-success';
      case 'error': return 'text-white bg-danger';
      case 'info': return 'text-dark bg-info';
      default: return 'text-dark bg-light';
    }
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-times-circle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  }
}
