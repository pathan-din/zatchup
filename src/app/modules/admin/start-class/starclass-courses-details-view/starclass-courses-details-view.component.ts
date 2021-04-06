import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EiStarclassLectureList } from '../../ei/modals/education-institute.modal';

@Component({
  selector: 'app-starclass-courses-details-view',
  templateUrl: './starclass-courses-details-view.component.html',
  styleUrls: ['./starclass-courses-details-view.component.css']
})
export class StarclassCoursesDetailsViewComponent implements OnInit {
  eiStarclassLectueList : EiStarclassLectureList
  params: any;
  courseDetails: any;
  courseData: any;

  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
    ) { 
      this.eiStarclassLectueList =  new EiStarclassLectureList()
    }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
      this.getLectureList()
    })
  }

  goToLectureView(id) {
    this.router.navigate(['admin/starclass-lecture-details-view'], { queryParams: { 'id': id } })
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
