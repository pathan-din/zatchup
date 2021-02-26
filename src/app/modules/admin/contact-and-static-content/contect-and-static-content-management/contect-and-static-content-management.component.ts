import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-contect-and-static-content-management',
  templateUrl: './contect-and-static-content-management.component.html',
  styleUrls: ['./contect-and-static-content-management.component.css']
})
export class ContectAndStaticContentManagementComponent implements OnInit {
  zatchup_details: any;
  contentList: any;
  tcForUser: boolean = false;
  tcForSchool: boolean = false;
  tcForSchoolSubadmin: boolean = false;

  tcForUserId: any;
  tcForSchoolId: any;
  tcForSchoolSubadminId: any;

  privacyPolicyForUser: boolean = false;
  privacyPolicyForSchool: boolean = false;
  privacyPolicyForSchoolSubadmin: boolean = false;

  privacyPolicyForUserId: any;
  privacyPolicyForSchoolId: any;
  privacyPolicyForSchoolSubadminId: any;

  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getContents();
    this.getPocDetails()
  }

  getContents() {


    this.baseService.getData('admin/view_static_content/', { "page_size": 100 }).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.results.length > 0) {
            this.contentList = res.results;
            this.setTCInfo()
            this.setPrivacyPolicyInfo()
          }
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  getPocDetails() {
    this.loader.show()
    this.baseService.getData('admin/get_contact_details/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.zatchup_details = res.data.excalation_details
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  editPOC() {
    this.router.navigate(['admin/edit-poc'])
  }

  viewOrAddTermsAndConditions(type: any, action: any, pageName: any) {
    this.router.navigate(['admin/terms-conditions', type, action], { queryParams: { "returnUrl": "admin/contact-and-static-content-management", pageName: pageName } })
  }

  editTermsAndConditions(type: any, action: any, id: any, pageName: any) {
    this.router.navigate(['admin/terms-conditions', type, action], { queryParams: { "content-id": id, "returnUrl": "admin/contact-and-static-content-management", pageName: pageName } })
  }

  setTCInfo() {
    let userInfo = this.contentList.find(val => {
      return val.user_type == 'user' && val.page_name == 'Terms and Conditions'
    })

    if (userInfo) {
      this.tcForUser = true;
      this.tcForUserId = userInfo.id;
    }


    let schoolInfo = this.contentList.find(val => {
      return val.user_type == 'school' && val.page_name == 'Terms and Conditions'
    })

    if (schoolInfo) {
      this.tcForSchoolId = schoolInfo.id;
      this.tcForSchool = true;
    }


    let subadminInfo = this.contentList.find(val => {
      return val.user_type == 'school_subadmin' && val.page_name == 'Terms and Conditions'
    })

    if (subadminInfo) {
      this.tcForSchoolSubadmin = true;
      this.tcForSchoolSubadminId = subadminInfo.id;
    }
    // debugger
  }

  setPrivacyPolicyInfo() {
    console.log('dssdsdsds', this.contentList)
    let userInfo = this.contentList.find(val => {
      return val.user_type == 'user' && val.page_name == 'Privacy Policy'
    })

    if (userInfo) {
      this.privacyPolicyForUser = true;
      this.privacyPolicyForUserId = userInfo.id;
    }


    let schoolInfo = this.contentList.find(val => {
      return val.user_type == 'school' && val.page_name == 'Privacy Policy'
    })

    if (schoolInfo) {
      this.privacyPolicyForSchoolId = schoolInfo.id;
      this.privacyPolicyForSchool = true;
    }


    let subadminInfo = this.contentList.find(val => {
      return val.user_type == 'school_subadmin' && val.page_name == 'Privacy Policy'
    })

    if (subadminInfo) {
      this.privacyPolicyForSchoolSubadmin = true;
      this.privacyPolicyForSchoolSubadminId = subadminInfo.id;
    }
  }
}
