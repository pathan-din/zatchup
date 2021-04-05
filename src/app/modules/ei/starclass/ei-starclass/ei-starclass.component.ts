import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DashBoardData } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass',
  templateUrl: './ei-starclass.component.html',
  styleUrls: ['./ei-starclass.component.css']
})
export class EiStarclassComponent implements OnInit {
   dashBoardData : DashBoardData
  constructor(
    private router: Router,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route: ActivatedRoute,
  ) { 
    this.dashBoardData = new DashBoardData()
  }

  ngOnInit(): void {
    this.dashBoardData.id = this.route.snapshot.queryParamMap.get('id')
    this.getDashBoardData()
  }

  getDashBoardData(page? : any){
    try {
      this.loader.show()
      this.dashBoardData.model ={
        'page' : page,
        'page_size': this.dashBoardData.page_size
      }
      this.baseService.getData('starclass/ei-dashboard-course-list/', this.dashBoardData.model).subscribe(
        (res: any)=>{
          if(res.status == true){
            if(!page)
            page = this.dashBoardData.config.currentPage
            this.dashBoardData.startIndex = res.page_size * (page - 1) + 1;
            this.dashBoardData.page_size = res.page_size
            this.dashBoardData.config.itemsPerPage = this.dashBoardData.page_size
            this.dashBoardData.config.currentPage = page
            this.dashBoardData.config.totalItems = res.count;
           if(res.count >0){
            this.dashBoardData.dataSource = res.results
            this.dashBoardData.pageCounts = this.baseService.getCountsOfPage()
           }
           else{
            this.dashBoardData.dataSource = undefined
            this.dashBoardData.pageCounts = undefined
          }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
      err => {
        this.loader.hide()
        this.alert.error(err, 'Error')
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }
  goToCoursePreview(data){
    this.router.navigate(['ei/star-class-courses-preview', data.id])
  }

  goToMyCourse(){
    this.router.navigate(['ei/ei-starclass-mycourses'])
  }

  goToYourOrder(){
    this.router.navigate(['ei/ei-starclass-your-order'])
  }

  goToMyCart(){
    this.router.navigate(['ei/star-class-cart'])
  }

  goToCreateCourse(){
    this.router.navigate(['ei/star-class-course-add'], {queryParams:{'action': 'add'}})
  }
  goToPendingRequest(){
    this.router.navigate(['ei/starclass-requests-pending'])
  }
}
