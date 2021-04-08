import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { ZatchupStarclassCourses } from '../registration/modal/contact-us.mdal';


@Component({
  selector: 'app-zatchup-starclass',
  templateUrl: './zatchup-starclass.component.html',
  styleUrls: ['./zatchup-starclass.component.css']
})
export class ZatchupStarclassComponent implements OnInit {
  zatchupStarclassCourses: ZatchupStarclassCourses
  constructor(
    private router: Router,
    private location: Location,
    private baseService : BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.zatchupStarclassCourses = new ZatchupStarclassCourses()
   }

  ngOnInit(): void {
    this.getZatchupStarclassCourseList()
  }

  goBack(){
    this.location.back()
  }

  goToStudentAudienceAdd(id){
    this.router.navigate(['ei/star-class-audience-student-list'],{queryParams:{ 'course_id': id}})
    console.log(id);
  }
  
  goToTeacherAudienceAdd(id){
    this.router.navigate(['ei/ei-starclass-audience-teacher'],{queryParams:{'course_id': id}})
    console.log(id);
  }
  
  goToEditTeacherAdd(id){
    this.router.navigate(['ei/star-class-edit-right-teacher'],{queryParams:{'course_id': id}})
    console.log(id);
  }

  getZatchupStarclassCourseList(page? : any){
    try {
      this.loader.show()
      this.zatchupStarclassCourses.params = {
        'page' :page,
        'page_size':this.zatchupStarclassCourses.page_size
      }
      this.baseService.getData('starclass/active_bought_courses_list/', this.zatchupStarclassCourses.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.zatchupStarclassCourses.config.currentPage
            this.zatchupStarclassCourses.startIndex = res.page_size * (page- 1) + 1;
            this.zatchupStarclassCourses.page_size = res.page_size
            this.zatchupStarclassCourses.config.itemsPerPage = this.zatchupStarclassCourses.page_size
            this.zatchupStarclassCourses.config.currentPage = page
            this.zatchupStarclassCourses.config.totalItems = res.count
            if(res.count > 0) {
              this.zatchupStarclassCourses.dataSource = res.results;
              this.zatchupStarclassCourses.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.zatchupStarclassCourses.dataSource = undefined
              this.zatchupStarclassCourses.pageCounts = undefined
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

}
