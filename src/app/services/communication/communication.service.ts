import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private fieldValue = new Subject<any>();
  private imageUrl = new Subject<any>();

  constructor() { }

  setFieldValue(value: string) {
    this.fieldValue.next({ text: value });
  }

  clearFieldValue() {
    this.fieldValue.next();
  }

  getFieldValue(): Observable<any> {
    return this.fieldValue.asObservable();
  }

  setImageUrl(value: string) {
    this.imageUrl.next({ url: value });
  }

  getImageUrl(): Observable<any> {
    return this.imageUrl.asObservable();
  }
}
