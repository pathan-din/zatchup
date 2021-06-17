import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
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
  roleOfSubadmin: any;
  modal: any;
  message: any;
  userId: any;
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private validation: GenericFormValidationService,
    private confirmDialogService: ConfirmDialogService,

  ) {
    this.eiStarclassCourseView = new EiStarclassCourseView(),
    this.eiStarclassLectueList = new EiStarclassLectureList()
   }

  ngOnInit(): void {
    this.roleOfSubadmin = JSON.parse(localStorage.getItem('getreject'))
    console.log(this.roleOfSubadmin);
    
    this.userId = JSON.parse(localStorage.getItem("userprofile")).user_id;
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

goToStudentAudienceAdd(id){
  this.router.navigate(['ei/star-class-audience-student-list'],{queryParams:{ 'course_id': id, 'action': 'edit'}})
  console.log(id);
}

goToPlayHistory(course_id, id){
  this.router.navigate(['ei/ei-play-history'], {queryParams: {'course_id':course_id, 'course': id }})
}

// goToTeacherAudienceAdd(id){
//   this.router.navigate(['ei/ei-starclass-audience-teacher'],{queryParams:{'course_id': id}})
//   console.log(id);
// }

goToEditTeacherAdd(id){
  this.router.navigate(['ei/star-class-edit-right-teacher'],{queryParams:{'course_id': id, 'action': 'edit'}})
  console.log(id);
}

goToLectureHistory(id){
  this.router.navigate(['ei/star-class-lecture-history'], {queryParams: {'course_id': id}})
}


getCourseDetails() {
  try {
    this.loader.show()
    let params = {
      "id": this.activeRoute.snapshot.params.id,
      "is_all_access": this.activeRoute.snapshot.queryParamMap.get('is_all_access')
    }
    console.log('thhfd', this.params);
    
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

generateExcel() {
  delete  this.eiStarclassLectueList.model.page_size;
  delete  this.eiStarclassLectueList.model.page;
  this.eiStarclassLectueList.model['export_csv'] = true
  this.baseService.generateExcel('starclass/export-csv-ei-lecture/', 'ei-lecture-list',  this.eiStarclassLectueList.model);
}

goToEditLecture(id){
  this.router.navigate(['ei/star-class-lecture-upload', id], { queryParams: { 'action': 'edit'}}) 
  
}

deleteEiLecture(id: any ): any {
  this.modal ={
    "id": id,
  }
  console.log(this.modal);
  
 this.message = 'Are you sure you want to delete this Lecture ?'
  this.confirmDialogService.confirmThis(this.message, () => {
    this.loader.show()
    this.baseService.action('starclass/ei_lecture_delete/', this.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, "Success")
          this.getLectureList()
        } else {
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.alert.error("Please try again.", 'Error')
      this.loader.hide();
    }
  }, () => {
  });
}

}
