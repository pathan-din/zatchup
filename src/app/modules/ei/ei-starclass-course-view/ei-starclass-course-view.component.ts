import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiStarclassCourseView, EiStarclassLectureList } from '../registration/modal/contact-us.mdal';


@Component({
  selector: 'app-ei-starclass-course-view',
  templateUrl: './ei-starclass-course-view.component.html',
  styleUrls: ['./ei-starclass-course-view.component.css']
})
export class EiStarclassCourseViewComponent implements OnInit {
  eiStarclassCourseView : EiStarclassCourseView
  eiStarclassLectueList : EiStarclassLectureList
  params: any;
  courseData: any;
  courseId: string;
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validation: GenericFormValidationService
  ) {
    this.eiStarclassCourseView = new EiStarclassCourseView(),
    this.eiStarclassLectueList = new EiStarclassLectureList()
   }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    });
    this.courseId = this.activeRoute.snapshot.queryParamMap.get('id')

}

goToUploadLecture(data) {
  this.router.navigate(['ei/star-class-lecture-upload', data.id], { queryParams: { 'action': 'add' } })
  console.log(data);
  
}

goToEditCourse(id) {
  this.router.navigate(['ei/star-class-course-add'], { queryParams: { 'id': id, 'action': 'edit' } })
}
goToLectureView(id) {
  this.router.navigate(['ei/star-class-lecture-details'], { queryParams: { 'id': id } })
}

getCourseDetails() {
  try {
    this.loader.show()
    let params = {
      "id": this.activeRoute.snapshot.params.id
    }
    this.baseService.getData('starclass/ei_course_preview/', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.eiStarclassCourseView.courseDetails = res.results
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
    this.eiStarclassLectueList.model = {
      'course_id': this.activeRoute.snapshot.params.id,
      'page': page,
      'page_size': this.eiStarclassLectueList.page_size,
    }
    this.baseService.getData('starclass/get_ei_lecture_list/', this.eiStarclassLectueList.model).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.eiStarclassLectueList.config.currentPage
          this.eiStarclassLectueList.startIndex = res.page_size * (page - 1) + 1;
          this.eiStarclassLectueList.page_size = res.page_size
          this.eiStarclassLectueList.config.itemsPerPage = this.eiStarclassLectueList.page_size
          this.eiStarclassLectueList.config.currentPage = page
          this.eiStarclassLectueList.config.totalItems = res.count;
          if (res.count > 0) {
            this.eiStarclassLectueList.dataSource = res.results;
            this.eiStarclassLectueList.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.eiStarclassLectueList.dataSource = undefined
            this.eiStarclassLectueList.pageCounts = undefined
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
