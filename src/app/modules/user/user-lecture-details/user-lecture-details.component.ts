import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
// import { CourseList } from '../../ei/modals/education-institute.modal';

@Component({
  selector: 'app-user-lecture-details',
  templateUrl: './user-lecture-details.component.html',
  styleUrls: ['./user-lecture-details.component.css']
})
export class UserLectureDetailsComponent implements OnInit {

  eiLectureDetailsView: any;
  model: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private validation: GenericFormValidationService
  ) { 
  }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('id')){
      this.getLectureDetails()
    }
  }

  getLectureDetails(){
    try {
      this.loader.show()
      this.model = {
        'id' : this.route.snapshot.queryParamMap.get('id'),
        'school_id': this.route.snapshot.queryParamMap.get('school_id')
      }
      this.baseService.getData('starclass/starclass-lecture-detail-by-courseid/'+this.route.snapshot.queryParamMap.get('id')).subscribe(
        (res : any) =>{
          if(res.status == true){
            this.eiLectureDetailsView = res.data
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
      this.loader.hide()
      this.alert.error(error.error, 'Error')
    }
  }
  goBack(){
    this.location.back()
  }

  playClick(event: any){
    this.model ={
      'course_id' : this.eiLectureDetailsView.course_id,
      'school_id': this.route.snapshot.queryParamMap.get('school_id'),
      'lecture_id':  this.eiLectureDetailsView.id
    }
    console.log(this.model);
    this.loader.show()
    this.baseService.action('starclass/lecture_view_count/', this.model).subscribe(
      (res: any) => {
        if (res.status == true) {
          // this.alert.success(res.message, "Success")
        } else {
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error')
      this.loader.hide();
    }
  }
}
