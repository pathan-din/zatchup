import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-starclass-lecture-upload',
  templateUrl: './ei-starclass-lecture-upload.component.html',
  styleUrls: ['./ei-starclass-lecture-upload.component.css']
})
export class EiStarclassLectureUploadComponent implements OnInit {

  constructor(
    private baseService: BaseService,
    private router: Router,
    private location : Location,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
