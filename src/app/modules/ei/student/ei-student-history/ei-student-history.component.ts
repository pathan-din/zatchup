import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ei-student-history',
  templateUrl: './ei-student-history.component.html',
  styleUrls: ['./ei-student-history.component.css']
})
export class EiStudentHistoryComponent implements OnInit {
studentHistoryList:any=[];
  studentId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert:NotificationService,
    private location:Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = params['stid'];
      this.getStudentistory(this.studentId)
    });
  }
  goBack(){
    this.location.back();
  }
  getStudentistory(studentId){
    try {
      let data :any={};
      data.student_id  =studentId;
      this.loader.show();
      this.baseService.getData("ei/history-for-student-list/",data).subscribe(res=>{
        let response:any={};
        response = res;
        if(response.status==true){
          this.loader.hide();
          this.studentHistoryList =response.results;
        }
      },(error=>{
        this.loader.hide();
        this.alert.error("Something went wrong","Error");
      }))
    } catch (e) {
      this.loader.hide();
      this.alert.error("Something went wrong","Error");
    }
  }
}

