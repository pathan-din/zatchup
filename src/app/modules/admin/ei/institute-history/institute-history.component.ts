import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-institute-history',
  templateUrl: './institute-history.component.html',
  styleUrls: ['./institute-history.component.css']
})
export class InstituteHistoryComponent implements OnInit {
  errorDisplay: any = {}
  eiId: any;
  comment: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id;
  }

  addComment() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    this.loader.show()
    let data = {
      'user_id': this.eiId,
      'comments': this.comment,
    }
    this.baseService.action('admin/onboarding-comments/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, 'Success')

        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

}
