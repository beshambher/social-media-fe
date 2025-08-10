import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Popup } from './popup.interface';
import { PopupService } from 'src/app/core/services/popup/popup.service';

declare var bootstrap: any;

@Component({
  selector: 'app-popup-container',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  standalone: false
})
export class PopupComponent implements OnInit, OnDestroy {
  popupConfig: Popup | null = null;
  private popupSubscription: Subscription | undefined;
  private bsModal: any;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    const modalElement = document.getElementById('appConfirmModal');
    if (modalElement) {
      this.bsModal = new bootstrap.Modal(modalElement);
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.popupConfig = null;
      });
    }

    this.popupSubscription = this.popupService.getPopupStream().subscribe(config => {
      this.popupConfig = config;
      if (this.bsModal) {
        this.bsModal.show();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
    if (this.bsModal) {
      this.bsModal.dispose();
    }
  }

  onConfirm(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    button.blur();

    this.popupService.confirm();
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }

  onCancel(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    button.blur();

    this.popupService.cancel();
    if (this.bsModal) {
        this.bsModal.hide();
    }
  }

  getPopupHeaderClass(type: string): string {
    switch (type) {
      case 'success': return 'text-white bg-success';
      case 'error': return 'text-white bg-danger';
      case 'info': return 'text-dark bg-info';
      case 'warning': return 'text-white bg-warning';
      default: return 'text-dark bg-light';
    }
  }
}
