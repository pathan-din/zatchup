import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare var $: any;


@Component({
  selector: 'app-my-school',
  templateUrl: './my-school.component.html',
  styleUrls: ['./my-school.component.css']
})
export class MySchoolComponent implements OnInit {
  @ViewChild('closebutton') closebutton: ElementRef
  roleCheck: boolean = true;
  verified: any;
  schoolList: any
  starclassSchool: any;
  userRole: any;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }
  ngOnInit(): void {
     var role = parseInt(localStorage.getItem("role"))
    if(localStorage.getItem('approved') && localStorage.getItem('approved')=='true'){
      this.verified = true;
    } 
    
    if (role == 1) {
      this.roleCheck = true;
    } else {
      this.roleCheck = false;
    }
    // this.userRole = JSON.parse(localStorage.getItem('getreject')).role
    setTimeout(() => {
      this.userRole = JSON.parse(localStorage.getItem('getreject')).role
      }, 500);

  }
  gotToProfilePage() {
    this.router.navigate(["user/my-educational-profile"]);
  }

  checkSchoolList() {
    this.baseService.getData('chat/school_list_on_user/').subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.count > 1) {
            this.schoolList = res.results
            $("#OTPModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          }else{
            this.gotoChatWithTeachers(res.results[0].school_id)
          }
        }

      }
    )
  }

  starclassSchoolList(){
    this.baseService.getData('user/school-list-for-student-startclass').subscribe(
     (res : any) => {
       if(res.status == true){
         if (res.count > 1){
           this.starclassSchool = res.results
           this.router.navigate(['user/multiple-ei'])
         }
         else {
           this.goToStarclassCourses(res.results[0].id)
         }
       }
     }
    )
  }

  goToStarclassCourses(id: any){
    this.router.navigate(['user/starclass-course-list'], {queryParams : {'returnUrl': "user/my-school", "school_id": id}})
  }

  gotoChatWithTeachers(id: any){
    this.closebutton.nativeElement.click()
    this.router.navigate(['user/new-chat'], { queryParams: { "returnUrl": "user/my-school", "school_id": id}});
  }

  goToStarclassCourseList(){
    this.router.navigate(['user/starclass-course-list'])
  }

}
