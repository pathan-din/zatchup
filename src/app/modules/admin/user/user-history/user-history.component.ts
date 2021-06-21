import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  studentHistoryList: any = [];
  studentId: any

  constructor(
    private alert: NotificationService,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.studentId =  this.route.snapshot.queryParamMap.get('id');
    this.getStudentistory()
  }

  getStudentistory() {
    try {
      let data = {
        "student_id": this.studentId
      };
      this.loader.show();
      this.baseService.getData("ei/history-for-student-list-to-admin/", data).subscribe((res: any) => {
        this.loader.hide()
        if(res.status)
          this.studentHistoryList = res.results
      }, (error => {
        this.loader.hide();
        this.alert.error(error, "Error");
      }))
    } catch (e) {
      this.loader.hide();
      this.alert.error(e, "Error");
    }
  }

  goBack(){
    this.location.back();
  }

}
