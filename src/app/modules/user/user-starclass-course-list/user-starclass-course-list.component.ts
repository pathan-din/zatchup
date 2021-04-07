import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { StarclassCourseList } from '../common/starclass-model';
@Component({
  selector: 'app-user-starclass-course-list',
  templateUrl: './user-starclass-course-list.component.html',
  styleUrls: ['./user-starclass-course-list.component.css']
})
export class UserStarclassCourseListComponent implements OnInit {
  starclassCourseList : StarclassCourseList
  constructor(
    private router: Router,
    private location: Location,
    private baseService : BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.starclassCourseList = new StarclassCourseList()
   }

  ngOnInit(): void {
    this.getStarclassCourseList()
  }

  getStarclassCourseList(page? : any){
    try {
      this.loader.show()
      this.starclassCourseList.params = {
        'page' :page,
        'page_size':this.starclassCourseList.page_size
      }
      this.baseService.getData('starclass/starclass-course-list-by-user/', this.starclassCourseList.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.starclassCourseList.config.currentPage
            this.starclassCourseList.startIndex = res.page_size * (page- 1) + 1;
            this.starclassCourseList.page_size = res.page_size
            this.starclassCourseList.config.itemsPerPage = this.starclassCourseList.page_size
            this.starclassCourseList.config.currentPage = page
            this.starclassCourseList.config.totalItems = res.count
            if(res.count > 0) {
              this.starclassCourseList.dataSource = res.results;
              this.starclassCourseList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.starclassCourseList.dataSource = undefined
              this.starclassCourseList.pageCounts = undefined
            }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ), 
      err => {
        console.log(err);
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  goBack(){
    this.location.back()
  }

  goToCourseView(data){
    this.router.navigate(['user/starclass-course-view', data.id])
    console.log(data);
  }

}
