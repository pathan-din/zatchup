import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassLectureList } from '../common/starclass-model';

@Component({
  selector: 'app-user-starclass-course-preview',
  templateUrl: './user-starclass-course-preview.component.html',
  styleUrls: ['./user-starclass-course-preview.component.css']
})
export class UserStarclassCoursePreviewComponent implements OnInit {
  starclassLectureList : StarclassLectureList;
  params: any;
  courseData: any;
  courseId: string;
  courseDetails: any;
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validation: GenericFormValidationService
  ) {
    this.starclassLectureList = new StarclassLectureList()
   }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    })
  }

  goToLectureView(id) {
    this.router.navigate(['user/user-lecture-details'], { queryParams: { 'id': id } })
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
            this.courseDetails = res.results
            this.courseData = res.results[0];
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
      this.starclassLectureList.model = {
        'course_id': this.activeRoute.snapshot.params.id,
        'page': page,
        'page_size': this.starclassLectureList.page_size,
      }
      this.baseService.getData('starclass/starclass-lecture-list-by-courseid/', this.starclassLectureList.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.starclassLectureList.config.currentPage
            this.starclassLectureList.startIndex = res.page_size * (page - 1) + 1;
            this.starclassLectureList.page_size = res.page_size
            this.starclassLectureList.config.itemsPerPage = this.starclassLectureList.page_size
            this.starclassLectureList.config.currentPage = page
            this.starclassLectureList.config.totalItems = res.count;
            if (res.count > 0) {
              this.starclassLectureList.dataSource = res.results;
              this.starclassLectureList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.starclassLectureList.dataSource = undefined
              this.starclassLectureList.pageCounts = undefined
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
  
  goBack(){
    this.location.back()
  }
}
