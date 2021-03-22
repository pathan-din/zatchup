import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from '@angular/common';

@Component({
  selector: 'app-ei-student-profile',
  templateUrl: './ei-student-profile.component.html',
  styleUrls: ['./ei-student-profile.component.css']
})
export class EiStudentProfileComponent implements OnInit {
  studentDetails: any = [];
  stid: any = '';
  userprofile: any = {};
  ischeckStudentOrAlumni: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    public base: BaseService,
    private location: Location
  ) { }


  ngOnInit(): void {
    if (localStorage.getItem("userprofile")) {
      this.userprofile = JSON.parse(localStorage.getItem("userprofile"));
      //userprofile.user_education_instituite_id
    }

    this.route.queryParams.subscribe(params => {
      this.stid = params['stId'];

      this.getStudentDetails(params['stId'])

    });

  }

  goToEiStudentHistoryPage() {
    this.router.navigate(['ei/student-history'], { queryParams: { "stid": this.stid } });
  }
  getStudentDetails(studentId) {
    try {
      this.loader.show();
      this.base.getData('ei/student-profile/' + studentId + '/').subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.studentDetails = res.data;
            this.studentDetails[0].educationdetail.forEach(element => {
              if(this.userprofile.user_education_instituite_id == element.school_id){
                element.course_detail.forEach(elementCourse => {
                  if (elementCourse.is_current_course) {
                    this.ischeckStudentOrAlumni = true;
                  }
                });
              }
            
            });
          } else {
            this.loader.hide();
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
      return this.base.getGender(data, type)
    return ''
  }
}
