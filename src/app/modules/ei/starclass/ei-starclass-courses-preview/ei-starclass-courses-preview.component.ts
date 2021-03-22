import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { EiCourseDetails } from '../../registration/modal/contact-us.mdal';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ei-starclass-courses-preview',
  templateUrl: './ei-starclass-courses-preview.component.html',
  styleUrls: ['./ei-starclass-courses-preview.component.css']
})
export class EiStarclassCoursesPreviewComponent implements OnInit {
  eiCourseDetails : EiCourseDetails
  dataSource : any;
  params: any;
  courseData: any = {};
  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
    ) {
      this.eiCourseDetails = new EiCourseDetails()
     }


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getCourseDetails()
    })
  }

  getCourseDetails(){
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.params.id
      }
      this.baseService.getData('starclass/course_preview/', params).subscribe(
        (res : any) =>{
          if(res.status == true){
            this.eiCourseDetails.courseDetails = res.results
            this.courseData = res.results[0]
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), 
      err =>{
        this.loader.hide()
        this.alert.error(err, 'Error')
      }
    } catch (error) {
      this.loader.hide()
      this.alert.error(error.error, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }
}
