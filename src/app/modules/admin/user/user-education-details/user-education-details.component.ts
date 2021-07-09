import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-education-details',
  templateUrl: './user-education-details.component.html',
  styleUrls: ['./user-education-details.component.css']
})
export class UserEducationDetailsComponent implements OnInit {
  studentDetails: any = [];
  stid: any = '';
  userid: any = '';

  constructor(
    private alert: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userid = params['user_id'];
      this.getStudentDetails(params['user_id'])
    });
    // this.getStudentistory()
  }

  getStudentDetails(userId) {
    try {
      this.loader.show();
      this.baseService.getData('ei/student-profile/' + userId + '/').subscribe((res: any) => {
        this.loader.hide();
        if (res.status == true) {
          this.studentDetails = res.data;
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (err) {
      this.loader.hide();
    }
  }

  goBack(): void {
    this.location.back()
  }

  getGender(data: any, type?: any) {
    if (data)
      return this.baseService.getGender(data, type)
    return ''
  }

  goToEiStudentHistoryPage(){
    this.router.navigate(['admin/user-history'], { queryParams: { 'id': this.userid } })
  }

  // getStudentistory() {
  //   try {
  //     let data = {
  //       "student_id": '1742'
  //     };
  //     this.loader.show();
  //     this.baseService.getData("ei/history-for-student-list/", data).subscribe((res: any) => {
  //       this.loader.hide()
  //     }, (error => {
  //       this.loader.hide();
  //       this.alert.error(error, "Error");
  //     }))
  //   } catch (e) {
  //     this.loader.hide();
  //     this.alert.error(e, "Error");
  //   }
  // }
}
