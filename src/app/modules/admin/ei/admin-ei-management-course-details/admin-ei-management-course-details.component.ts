import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CourseDetails } from '../modals/course.modal';

@Component({
  selector: 'app-admin-ei-management-course-details',
  templateUrl: './admin-ei-management-course-details.component.html',
  styleUrls: ['./admin-ei-management-course-details.component.css']
})
export class AdminEiManagementCourseDetailsComponent implements OnInit {
  courseDetails: CourseDetails

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) {
    this.courseDetails = new CourseDetails()
  }

  ngOnInit(): void {
    this.courseDetails.courseId = this.activeRoute.snapshot.params.course_id;
    this.courseDetails.eiId = this.activeRoute.snapshot.params.id;
    if (this.courseDetails.courseId) {
      this.getCourseDetails();
    }

  }

  getCourseDetails() {
    this.loader.show()
    let data = {
      'id': this.courseDetails.eiId,
      "course_id": this.courseDetails.courseId
    }

    this.baseService.getData('admin/ei-course-details/', data).subscribe(
      (res: any) => {
        if (res.results.length > 0){
          this.courseDetails.courseDetail = res.results;
          this.getstandardList(this.courseDetails.courseDetail[0].standard_list)
        }
        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  getstandardList(standard) {
    this.courseDetails.standardList = standard;
    this.courseDetails.standardList.forEach(element => {
      this.getClassList(element.class_lists, element)
    });
  }

  getClassList(classList,standard){
    var st_name='';
    classList.forEach(element => {
      if(standard.standard_name!=st_name){
        element.class_count =   standard.num_of_class;
      }else{
        element.class_count =0;
      }
    st_name=element.standard_name;
    this.courseDetails.classList.push(element);
   });
  }

  goBack(){
    this.location.back();
  }

}
