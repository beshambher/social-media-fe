import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styles: []
})
export class TextAreaComponent {

  @Input() editForm: FormGroup;
  @Input() editFormData: any;

  @Output() cancel: EventEmitter<any>;
  @Output() update: EventEmitter<any>;

  constructor() {
    this.editForm = new FormGroup({
      body: new FormControl('', Validators.required)
    });
    this.editFormData = Constant.defaultTextAreaData;
    this.cancel = new EventEmitter();
    this.update = new EventEmitter();
  }

  cancelClick() {
    this.cancel.emit();
  }

  updateClick() {
    this.update.emit(this.editForm.value);
  }

}
