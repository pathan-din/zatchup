import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ActiveBoughtCourses } from '../../ei/modals/education-institute.modal';


@Component({
  selector: 'app-all-courses-uploaded-by-ei',
  templateUrl: './all-courses-uploaded-by-ei.component.html',
  styleUrls: ['./all-courses-uploaded-by-ei.component.css']
})
export class AllCoursesUploadedByEiComponent implements OnInit {
  activeBoughtCourses : ActiveBoughtCourses
   

  constructor(
    private router: Router,
    private alert :NotificationService,
    private loader : NgxSpinnerService,
    private baseService: BaseService,
    private location : Location,
    private datePipe: DatePipe,) {
      this.activeBoughtCourses = new ActiveBoughtCourses()
     }

  ngOnInit(): void {
    this.getActiveBoughtCourseList()
  }

  getActiveBoughtCourseList(page? : any){
    try {
      this.loader.show()
      this.activeBoughtCourses.params = {
        'page' :page,
        'page_size':this.activeBoughtCourses.page_size
      }
      this.baseService.getData('starclass/active_bought_courses_list/', this.activeBoughtCourses.params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.activeBoughtCourses.config.currentPage
            this.activeBoughtCourses.startIndex = res.page_size * (page- 1) + 1;
            this.activeBoughtCourses.page_size = res.page_size
            this.activeBoughtCourses.config.itemsPerPage = this.activeBoughtCourses.page_size
            this.activeBoughtCourses.config.currentPage = page
            this.activeBoughtCourses.config.totalItems = res.count
            if(res.count > 0) {
              this.activeBoughtCourses.dataSource = res.results;
              this.activeBoughtCourses.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.activeBoughtCourses.dataSource = undefined
              this.activeBoughtCourses.pageCounts = undefined
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

  generateExcel() {
    delete this.activeBoughtCourses.params.page_size;
    delete this.activeBoughtCourses.params.page;
    this.activeBoughtCourses.params['export_csv'] = true
    this.baseService.generateExcel('starclass/export_active_bought_courses_list/', 'active-course-list', this.activeBoughtCourses.params);
  }

}
