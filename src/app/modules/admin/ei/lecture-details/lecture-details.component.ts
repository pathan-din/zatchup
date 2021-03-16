import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private location: Location
  ) {
    this.lectureDetails = new LectureDetails()
   }

  ngOnInit(): void {
  }

  getLectureDetails(){
    try {
      this.loader.show()
      this.lectureDetails.model = {

      }
      this.baseService.getData('', this.lectureDetails.model).subscribe(
        (res : any) =>{
          if(res.status == true){
            this.lectureDetails.details = res.results
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
