import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _toastrService: ToastrService
  ) { }

  success(message, title) {
    this._toastrService.success(message, title)
  }

  error(message, title) {
    this._toastrService.error(message, title)
  }

  info(message, title) {
    this._toastrService.info(message, title)
  }

  warning(message, title) {
    this._toastrService.warning(message, title)
  }
}
