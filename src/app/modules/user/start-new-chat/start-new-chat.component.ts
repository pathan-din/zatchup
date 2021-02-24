import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-start-new-chat',
  templateUrl: './start-new-chat.component.html',
  styleUrls: ['./start-new-chat.component.css']
})
export class StartNewChatComponent implements OnInit {
  teachersList: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getTeachersList();
  }

  goBack(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl])
  }

  gotoChat(){
    this.router.navigate(['user/chat'], { queryParams: { "returnUrl": "user/new-chat"}});
  }

  getTeachersList(){
    this.loader.hide()
    this.baseService.getData('chat/teachers_school_list/').subscribe(
      (res: any) =>{
        console.log('res....',res);
        this.teachersList = res.results
        this.loader.hide()
      },
      error =>{
        this.alert.error(error.statusText, "Error")
        console.log('error....',error)
      }
    )
  }
}
