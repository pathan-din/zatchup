import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-profile-created-successfully',
  templateUrl: './user-profile-created-successfully.component.html',
  styleUrls: ['./user-profile-created-successfully.component.css']
})
export class UserProfileCreatedSuccessfullyComponent implements OnInit {
  model: {};
  params:any={};
  constructor(private router: Router, 
    private confirmDialogService: ConfirmDialogService,
    private loader : NotificationService,
    private baseService : BaseService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.params=params;
    })
  }

 
 goToUserLandingPage(): any {
  this.confirmDialogService.confirmThis('Your Profile is Sent for approval !! Please login again to continue.', () => {
    this.logout()
  
  }, () => {
  });
}
 logout(){
  this.model = {}
  this.baseService.action('user/add-user-step-seven/', this.model).subscribe(
    (res : any) => {
      if(res.status == true){
        localStorage.clear();
        this.router.navigate(['user/login']);
      }
    }
  ) 
  // localStorage.clear();
}
}
