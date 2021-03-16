import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LectureDetails } from '../modals/education-institute.modal';

@Component({
  selector: 'app-lecture-details',
  templateUrl: './lecture-details.component.html',
  styleUrls: ['./lecture-details.component.css']
})
export class LectureDetailsComponent implements OnInit {
  lectureDetails: LectureDetails
  constructor(
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.lectureDetails = new LectureDetails()
   }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('id')){
      this.getLectureDetails()
    }
  }

  getLectureDetails(){
    try {
      this.loader.show()
      this.lectureDetails.model = {
        "id": this.route.snapshot.queryParamMap.get('id')
      }
      this.baseService.getData('starclass/lecture-detail/', this.lectureDetails.model).subscribe(
        (res : any) =>{
          if(res.status == true){
            this.lectureDetails.details = res.results[0]
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
}
