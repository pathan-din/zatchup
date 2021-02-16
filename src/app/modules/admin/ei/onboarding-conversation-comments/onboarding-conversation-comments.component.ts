import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-onboarding-conversation-comments',
  templateUrl: './onboarding-conversation-comments.component.html',
  styleUrls: ['./onboarding-conversation-comments.component.css']
})
export class OnboardingConversationCommentsComponent implements OnInit {
  userId: any;
  conversionComments: any;
  errorDisplay: any = {}
  comment: any;
  eiStatus: any;
  title: any = ''

  constructor(
    private location: Location,
    private baseService: BaseService,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.eiStatus = this.route.snapshot.params.ei
    this.getConversionComments();
  }

  getConversionComments() {
    this.loader.show()
    this.baseService.getData('admin/ei-onboarding-comment-history/', { "id": this.userId }).subscribe(
      (res: any) => {
        if (res.status == true)
          this.conversionComments = res.results
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ),
      err => {
        this.alert.error(err, 'Error');
        this.loader.hide();
      }
  }
  goBack() {
    this.location.back();
  }

  addComment() {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    this.loader.show()
    let data = {
      'user_id': this.userId,
      'comments': this.comment,
    }
    this.baseService.action('admin/onboarding-comments/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.getConversionComments()
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

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
}
