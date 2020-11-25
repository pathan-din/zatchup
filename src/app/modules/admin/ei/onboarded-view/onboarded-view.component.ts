import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-onboarded-view',
  templateUrl: './onboarded-view.component.html',
  styleUrls: ['./onboarded-view.component.css']
})
export class OnboardedViewComponent implements OnInit {
  eiData: any;
  eiId: any

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService
    ) { } 

  ngOnInit(): void {
    this.eiId = this.activeRouter.snapshot.params.id
    if(this.eiId)
      this.getProfileData()
  }

  getProfileData() {
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.eiId
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true)
          this.eiData = res.data
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  goToUserEducationDetail(){}

}
