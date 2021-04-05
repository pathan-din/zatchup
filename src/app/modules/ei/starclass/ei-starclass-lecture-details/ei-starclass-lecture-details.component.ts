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
  }

  goToEditLecture(data){
    this.router.navigate(['ei/star-class-lecture-upload', data.id], { queryParams: { 'action': 'edit'}}) 
    console.log(data.id, 'jhdhfjdh');
    
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
           this.location.back()
          } else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }

  goBack(){
    this.location.back()
  }

}
