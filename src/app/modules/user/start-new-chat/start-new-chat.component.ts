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
  schoolId: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.queryParamMap.get('school_id')
    if (this.schoolId)
      this.getTeachersList();
  }

  goBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl])
  }

  gotoChat() {
    this.router.navigate(['user/chat'], { queryParams: { "returnUrl": "user/new-chat" } });
  }

  getTeachersList() {
    this.loader.hide()
    this.baseService.getData('chat/teachers_list_based_on_school/', { 'ei_id': this.schoolId }).subscribe(
      (res: any) => {
        if (res.count == 0)
          this.teachersList = undefined
        else
          this.teachersList = res.results
        this.loader.hide()
      },
      error => {
        this.alert.error(error.statusText, "Error")
      }
    )
  }

  getDocumentsChat(uuid) {
    console.log('uid ...', uuid)
    localStorage.setItem('uuid', uuid);
    this.router.navigate(["user/chat"]);
  }
}
