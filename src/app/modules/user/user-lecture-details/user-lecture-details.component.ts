import { Component, HostListener, OnInit } from '@angular/core';
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
  // @HostListener('window:beforeunload', [ '$event' ])
  eiLectureDetailsView: any;
  model: any;
  currentTime: number;
  startTime: any;

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
  // ngAfterViewInit() {
  // if(localStorage.getItem('start_time') && localStorage.getItem('end_time')){
  //   this.model ={
  //     'start_time': localStorage.getItem('start_time'),
  //     'end_time' : localStorage.getItem('end_time'),
  //     'lecture_id':  this.route.snapshot.queryParamMap.get('id')
  //   }
  //   this.loader.show()
  //   this.baseService.action('starclass/total_lecture_view_count/', this.model).subscribe(
  //     (res: any) => {
  //       if (res.status == true) {
  //         localStorage.removeItem('end_time')
  //         localStorage.removeItem('start_time')
  //       } else {
  //         this.alert.error("Try again", 'Error')
  //       }
  //       this.loader.hide();
  //     }
  //   ), err => {
  //     this.alert.error("Please try again", 'Error')
  //     this.loader.hide();
  //   }
  // }
  // }
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
    var d =new Date("")
    var dformat = [d.getFullYear(),d.getMonth()+1,
      d.getDate(),
      ].join('-')+' '+
     [d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':');
    this.currentTime = Date.now();
    if(localStorage.getItem('start_time') ) {
      var endTime = this.currentTime
      localStorage.setItem('end_time', dformat)
    }
    console.log(this.currentTime);
    
 }

//  unloadHandler(event) {
//   console.log(event
//     );
//     alert(event)
  
// }

 

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
        this.alert.error("Please try again.", 'Error')
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
    console.log(event);
    
    if(!localStorage.getItem('first_time_play_video')){
      var getStartTime = new Date(event.timeStamp * 1000)
      var getStartTimeOne = new Date( Date.now())
      var d =new Date()
      var dformat = [d.getFullYear(),d.getMonth()+1,
        d.getDate(),
        ].join('-')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
        console.log("Date",dformat);
        
     // localStorage.setItem('start_time', dformat)
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
