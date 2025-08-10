import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Popup } from 'src/app/shared/popup/popup.interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupConfigSubject = new Subject<Popup>();
  private popupResultSubject = new Subject<boolean>();

  constructor() { }

  getPopupStream() {
   return this.popupConfigSubject.asObservable();
  }

  getPopupResultStream() {
   return this.popupResultSubject.asObservable();
  }

  open(config: Popup): Promise<boolean> {
   return new Promise((resolve) => {
     this.popupConfigSubject.next(config);
     this.popupResultSubject.pipe(take(1)).subscribe(result => {
       resolve(result);
     });
   });
  }

  confirm() {
   this.popupResultSubject.next(true);
  }

  cancel() {
   this.popupResultSubject.next(false);
  }
}
