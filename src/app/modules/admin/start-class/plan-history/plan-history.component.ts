import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassPlanHistory } from '../../ei/modals/education-institute.modal';

@Component({
  selector: 'app-plan-history',
  templateUrl: './plan-history.component.html',
  styleUrls: ['./plan-history.component.css']
})
export class PlanHistoryComponent implements OnInit {
  starclassPlanHistory : StarclassPlanHistory
  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { 
    this.starclassPlanHistory = new StarclassPlanHistory()
  }

  ngOnInit(): void {
    this.getPlanHistory()
  }

  getPlanHistory(page? : any){
    try {
      this.loader.show()
      this.starclassPlanHistory.modal = {
        'page' : page,
        'page_size': this.starclassPlanHistory.page_size
      }
      this.baseService.getData('starclass/plan-history/', this.starclassPlanHistory.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.starclassPlanHistory.config.currentPage
            this.starclassPlanHistory.startIndex = res.page_size * (page - 1) + 1;
            this.starclassPlanHistory.page_size = res.page_size
            this.starclassPlanHistory.config.itemsPerPage = this.starclassPlanHistory.page_size
            this.starclassPlanHistory.config.currentPage = page
            this.starclassPlanHistory.config.totalItems = res.count;
            if (res.count > 0 ){
              this.starclassPlanHistory.dataSource = res.results;
              this.starclassPlanHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.starclassPlanHistory.dataSource = undefined;
              this.starclassPlanHistory.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, 
        err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      )
    } catch (error) {
      this.alert.error(error.error, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }
}
