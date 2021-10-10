import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styles: []
})
export class DeleteModalComponent {

  @Input() deleteData: any;

  @Output() delete: EventEmitter<boolean>;
  @Output() showBsModal: EventEmitter<any>;

  constructor() {
    this.deleteData = {
      id: 'deleteModal',
      item: 'Item',
    }
    this.delete = new EventEmitter<boolean>();
    this.showBsModal = new EventEmitter<any>();
  }

  showBsModalEvent($event: any) {
    this.showBsModal.emit($event);
  }

  deleteClick() {
    this.delete.emit(true);
  }

}
