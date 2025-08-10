export interface Popup {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  confirmButtonText?: string;
  cancelButtonText?: string;
}
