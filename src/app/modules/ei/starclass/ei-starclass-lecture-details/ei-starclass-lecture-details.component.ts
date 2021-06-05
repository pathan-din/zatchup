import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiLectureDetails } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass-lecture-details',
  templateUrl: './ei-starclass-lecture-details.component.html',
  styleUrls: ['./ei-starclass-lecture-details.component.css']
})
export class EiStarclassLectureDetailsComponent implements OnInit {
  eiLectureDetails : EiLectureDetails
  modal: { id: any; };
  message: any;
  eiLectureDetailsView: any;
  roleOfSubadmin: any;
  model: any;
  currentTime: number;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private location: Location,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.eiLectureDetails = new EiLectureDetails()
   }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('id')){
      this.getLectureDetails()
    }
    this.roleOfSubadmin = JSON.parse(localStorage.getItem('getreject'))
    
  }

  goToEditLecture(data){
    this.router.navigate(['ei/star-class-lecture-upload', data.id], { queryParams: { 'action': 'edit'}}) 
    
  }
  getLectureDetails(){
    try {
      this.loader.show()
      this.eiLectureDetails.model = {
        "id": this.route.snapshot.queryParamMap.get('id')
      }
      this.baseService.getData('starclass/ei_lecture_detail/'+this.route.snapshot.queryParamMap.get('id')).subscribe(
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

  ngOnDestroy(){
    this.setCurrentTime()
    if(localStorage.getItem('start_time') && localStorage.getItem('end_time')){
      this.model ={
        'start_time': JSON.parse(localStorage.getItem('start_time')),
        'end_time' :  JSON.parse(localStorage.getItem('end_time')),
        'lecture_id':  this.eiLectureDetailsView.id
      }
      this.loader.show()
      this.baseService.action('starclass/lecture_play_history/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            localStorage.removeItem('end_time')
            localStorage.removeItem('start_time')
            localStorage.removeItem('first_time_play_video')
          } else {
            this.alert.error("Try again", 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error("Please try again", 'Error')
        this.loader.hide();
      }
    }
  }

  setCurrentTime() {
    this.currentTime = Date.now();
    if(localStorage.getItem('start_time') ) {
      var endTime = this.currentTime
      localStorage.setItem('end_time', endTime.toString())
    }
    console.log(this.currentTime);
    
 }

  playClick(event: any){
    console.log(event);
   
    if(!localStorage.getItem('first_time_play_video')){
      var getStartTime = new Date(event.timeStamp * 1000)
      var getStartTimeOne = new Date( Date.now())
      localStorage.setItem('start_time', Date.now().toString())
console.log(getStartTimeOne);


      this.model ={
        // 'course_id' : this.eiLectureDetailsView.course_id,
        // 'school_id': this.route.snapshot.queryParamMap.get('school_id'),
        'lecture_id':  this.eiLectureDetailsView.id,
      
      }
      this.loader.show()
      this.baseService.action('starclass/total_lecture_view_count/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
           localStorage.setItem('first_time_play_video', 'true')
          } else {
            this.alert.error("Try again", 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error("Please try again", 'Error')
        this.loader.hide();
      }
    }
    else {
     
    }
    }

}
