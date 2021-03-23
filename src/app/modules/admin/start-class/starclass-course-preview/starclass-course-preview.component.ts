import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LectureList, StarclassCourseDetails } from '../../ei/modals/education-institute.modal';
@Component({
  selector: 'app-starclass-course-preview',
  templateUrl: './starclass-course-preview.component.html',
  styleUrls: ['./starclass-course-preview.component.css']
})

export class StarclassCoursePreviewComponent implements OnInit {
  @ViewChild('closeaddPlan') closeaddPlan: any;
  starclassCourseDetails: StarclassCourseDetails
  params: any;
  lectureList: LectureList
  dataSource: any;
  dataUrl: any;
  courseId: any;
  courseData: any = {};
  model: any = {};
  errorDisplay: any = {};

  // planDetails: any

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validation: GenericFormValidationService
  ) {
    this.starclassCourseDetails = new StarclassCourseDetails();
    this.lectureList = new LectureList()
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    });
    this.courseId = this.activeRoute.snapshot.queryParamMap.get('id')
  }
  editPlan(obj) {
    console.log(obj);
    this.model.id = obj.id;
  }

  goToEditCourse(id) {
    this.router.navigate(['admin/starclass-course-add'], { queryParams: { 'id': id, 'action': 'edit' } })
  }
  goToLectureView(id) {
    this.router.navigate(['admin/lecture-details'], { queryParams: { 'id': id } })
  }

  goToUploadLecture(data) {
    this.router.navigate(['admin/lecture-upload', data.id], { queryParams: { 'action': 'add' } })
  }

  getCourseDetails() {
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.params.id
      }
      this.baseService.getData('starclass/course_preview/', params).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.starclassCourseDetails.courseDetails = res.results
            this.courseData = res.results[0];
            // if(this.courseData.plan_data){

            // }else{
            //   this.courseData.plan_data = [];
            // }

          }
          else {
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err => {
          this.alert.error(err.statusText, 'Error')
          this.loader.hide()
        })
    } catch (error) {
      this.alert.error(error.statusText, 'Error')
      this.loader.hide()
    }
  }

  getLectureList(page?: any) {
    try {
      this.loader.show()
      this.lectureList.model = {
        'course_id': this.activeRoute.snapshot.params.id,
        'page': page,
        'page_size': this.lectureList.page_size,
      }
      this.baseService.getData('starclass/get-lecture-list/', this.lectureList.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.lectureList.config.currentPage
            this.lectureList.startIndex = res.page_size * (page - 1) + 1;
            this.lectureList.page_size = res.page_size
            this.lectureList.config.itemsPerPage = this.lectureList.page_size
            this.lectureList.config.currentPage = page
            this.lectureList.config.totalItems = res.count;
            if (res.count > 0) {
              this.lectureList.dataSource = res.results;
              this.lectureList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.lectureList.dataSource = undefined
              this.lectureList.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        })
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }


  goBack() {
    this.location.back()
  }
  addPlan(id: any) {
    try {
      this.errorDisplay = {};
      this.errorDisplay = this.validation.checkValidationFormAllControls(document.forms[0].elements, false, []);
      if (this.errorDisplay.valid) {
        return false;
      }


      this.loader.show()
      this.model = {
        "course": this.courseData.id,
        plan: this.courseData.plan_data
      }
      console.log(this.model);
      this.baseService.action('starclass/edit-course-price/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.closeaddPlan.nativeElement.click();

            this.alert.success(res.message, 'Success');
            this.getCourseDetails()
            // console.log(this.model);

          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        },
        err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      )
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  //   $scope.video = function(e) {
  //     var videoElements = angular.element(e.srcElement);
  //     videoElements[0].pause();
  // }
}
