import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CourseList } from '../../ei/modals/education-institute.modal';

@Component({
  selector: 'app-starclass-lecture-details-view',
  templateUrl: './starclass-lecture-details-view.component.html',
  styleUrls: ['./starclass-lecture-details-view.component.css']
})
export class StarclassLectureDetailsViewComponent implements OnInit {
  eiLectureDetailsView: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private validation: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('id')){
      this.getLectureDetails()
    }
  }

  getLectureDetails(){
    try {
      this.loader.show()
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
}
