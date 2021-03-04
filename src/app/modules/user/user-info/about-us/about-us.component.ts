import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  date: any;
  model: any = {};
  errorDisplay: any = {};
  origin: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private formValidationService: GenericFormValidationService,
  ) {
    this.date = new Date()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 485 ||
      document.documentElement.scrollTop > 485) {
      document.getElementById('about-us-header').classList.add('Fixed');
    }
    else {
      document.getElementById('about-us-header').classList.remove('Fixed');
    }
  }

  ngOnInit(): void {
    this.origin = window.location.origin
  }

  scrollToTargetAdjusted(id) {
    const yOffset = -55;
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  sendMessage() {
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);


    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      this.baseService.action('admin/post_contact_details/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message, 'Success');
          } else {
            this.loader.hide();
            this.alert.error(res.error, 'Error');
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

}
