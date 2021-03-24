import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
declare var $: any;

// declare var $: any;




// export interface PeriodicElement {
//   position: number;
//   fieldChange: string;
//   oldDetails: string;
//   newDetails: string;
//   viewAttachments: string;
//   status: string;
//   remarks: string;
//   action: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-request-pending-for-course',
  templateUrl: './request-pending-for-course.component.html',
  styleUrls: ['./request-pending-for-course.component.css']
})

export class RequestPendingForCourseComponent implements OnInit {
  model: any = {};
  modelReason: any = {};
  error: any = [];
  errorDisplay: any = {};
  title: any = '';
  pageCounts: any;


  startIndex: any;
  requestStatusList: any;//,'action'
  displayedColumns: string[] = ['position', 'course_name', 'joining_standard_name', 
    'student_name', 'student_zatchup_id', 'last_standard_name','date_of_change', 'action'];

  dataSource = [];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  collection = { count: 60, data: [] };

  constructor(private baseService: BaseService,
    private validationService: GenericFormValidationService,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private alert: NotificationService,
    private router: Router,
    private location: Location,
    private confirmBox: ConfirmDialogService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.getViewChangesRequestStatus('');
  }
  getViewChangesRequestStatus(page) {

    try {
      let data: any = {};
      if (page) {
        data = this.model;
        data.page = page
      } else { data = this.model; }
      this.loader.show();
      this.baseService.getData('ei/sent-for-approval-course-list/', data).subscribe(res => {
        let responce: any = {};
        responce = res;
        this.pageSize = responce.page_size;
        this.model.page_size = this.pageSize;
        this.totalNumberOfPage = responce.count;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage
        if (responce.status == false) {
          this.loader.hide();

          return;
        }
        this.loader.hide();

        if (!page) { page = 1; }
        var i = (this.pageSize * (page - 1)) + 1;
        this.startIndex = i;
        let arrDataList: any = [];

        this.dataSource = responce.results;


      }, (error) => {
        this.loader.hide();
        this.alert.error("Something went wrong", 'Error');
      })
    } catch (e) {
      this.loader.hide();
      this.alert.error(e, 'Error');
    }
  }

  goBack(): void {
    this.location.back()
  }
  approveRequest(courseId, userId) {
    this.confirmBox.confirmThis('Are you sure you want to approve this course ?', () => {
      this.loader.show()
      this.baseService.action('ei/approved-course-by-ei/', { "course_id": courseId, user_id: userId }).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.router.navigate(['ei/student-management']);
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }
  openRejectModel(course, user) {
    this.modelReason.course_id = course;
    this.modelReason.user_id = user;
  }
  closeRejectModel() {
    $("#rejectModel").modal('hide');
  }
  rejectCourse() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();

      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/
      //ei/reject-course-by-ei/
      this.baseService.action('ei/reject-course-by-ei/', this.modelReason).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {
          this.closeRejectModel();
          this.alert.success(response.message, 'Success')

        } else { // Condition False Validation failure
          this.loader.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection, "Error");

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      //console.log(err);
    }
  }

  goToRequestPendingView(course_id: any, user_id: any) {
    this.router.navigate(['ei/request-for-course-list-view'], { queryParams: { 'course_id': course_id, 'user_id': user_id } })
  }
}
