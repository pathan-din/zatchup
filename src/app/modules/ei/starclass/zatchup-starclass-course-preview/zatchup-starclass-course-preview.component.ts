import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ZatchupStarclassCourseView } from '../../registration/modal/contact-us.mdal';
@Component({
  selector: 'app-zatchup-starclass-course-preview',
  templateUrl: './zatchup-starclass-course-preview.component.html',
  styleUrls: ['./zatchup-starclass-course-preview.component.css']
})
export class ZatchupStarclassCoursePreviewComponent implements OnInit {
  zatchupStarclassCourseView : ZatchupStarclassCourseView
  params: any;
  courseData: any;
  courseId: string;
  roleOfSubadmin: any;
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validation: GenericFormValidationService
  ) {
    this.zatchupStarclassCourseView = new ZatchupStarclassCourseView()
   }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    });
    this.courseId = this.activeRoute.snapshot.queryParamMap.get('id')

  }


  getCourseDetails() {
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.params.id
      }
      this.baseService.getData('starclass/course_preview', params).subscribe(
        (res: any) => {
          if (res.status == true) {
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
      this.zatchupStarclassCourseView.model = {
        'course_id': this.activeRoute.snapshot.params.id,
        'page': page,
        'page_size': this.zatchupStarclassCourseView.page_size,
      }
      this.baseService.getData('starclass/get-lecture-list/', this.zatchupStarclassCourseView.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            if (!page)
              page = this.zatchupStarclassCourseView.config.currentPage
            this.zatchupStarclassCourseView.startIndex = res.page_size * (page - 1) + 1;
            this.zatchupStarclassCourseView.page_size = res.page_size
            this.zatchupStarclassCourseView.config.itemsPerPage = this.zatchupStarclassCourseView.page_size
            this.zatchupStarclassCourseView.config.currentPage = page
            this.zatchupStarclassCourseView.config.totalItems = res.count;
            if (res.count > 0) {
              this.zatchupStarclassCourseView.dataSource = res.results;
              this.zatchupStarclassCourseView.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.zatchupStarclassCourseView.dataSource = undefined
              this.zatchupStarclassCourseView.pageCounts = undefined
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
