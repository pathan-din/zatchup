import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OnboardingView } from '../modals/ei-pending-approval.modal';

@Component({
  selector: 'app-incomplete-onboarding-view',
  templateUrl: './incomplete-onboarding-view.component.html',
  styleUrls: ['./incomplete-onboarding-view.component.css']
})
export class IncompleteOnboardingViewComponent implements OnInit {
  onboardingView: OnboardingView;
  id: any;

  constructor(
    private route: Router,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) {
    this.onboardingView= new OnboardingView();
   }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id){
      this.id = this.activeRoute.snapshot.params.id
      this.getOnboardingView(this.id);
    }
  }

  getOnboardingView(id){
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.id
    this.baseService.getData(url).subscribe(
      (res:any) =>{
        if(res.status == true)
        this.onboardingView = res.data
        else{
          this.loader.hide();
          this.alert.error(res.error.message[0], 'Error')
        } 
      }
    ),
    err =>{
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
}
