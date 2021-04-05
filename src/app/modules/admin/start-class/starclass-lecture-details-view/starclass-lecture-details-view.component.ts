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
  }

  goBack(){
    this.location.back()
  }
}
