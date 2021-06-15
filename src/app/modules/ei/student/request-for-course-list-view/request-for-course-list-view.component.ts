import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-request-for-course-list-view',
  templateUrl: './request-for-course-list-view.component.html',
  styleUrls: ['./request-for-course-list-view.component.css']
})
export class RequestForCourseListViewComponent implements OnInit {
  requestData: any = {};
  id: any;
  courseId: any;
  userId: any;
  params: any ={};
  oldData: any ={};
  newData: any ={};

  constructor(
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.courseId = this.route.snapshot.queryParamMap.get('course_id'),
    // this.userId = this.route.snapshot.queryParamMap.get('user_id')
    this.getDetails()
  }

  getDetails(){
    try {
      this.loader.show()
      this.params = {
        'course_id' : this.route.snapshot.queryParamMap.get('course_id'),
        'user_id' : this.route.snapshot.queryParamMap.get('user_id')
    
      }
      this.baseService.getData('ei/new-course-pending-data/', this.params).subscribe(
        (res:any) =>{
          if(res.status == true){
            this.oldData = res.old_data[0]
            this.newData = res.new_data[0]
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
      err => {
        this.loader.hide()
        this.alert.error(err, 'Error')
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  goBack(){
    this.location.back();
  }

}
