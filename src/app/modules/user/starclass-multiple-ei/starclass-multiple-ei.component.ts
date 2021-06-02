import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassSchoolList } from '../common/starclass-model';

@Component({
  selector: 'app-starclass-multiple-ei',
  templateUrl: './starclass-multiple-ei.component.html',
  styleUrls: ['./starclass-multiple-ei.component.css']
})
export class StarclassMultipleEiComponent implements OnInit {
  schoolList: StarclassSchoolList;

  constructor(
    private baseService : BaseService,
    private loader : NgxSpinnerService,
    private alert : NotificationService,
    private router : Router,
    private location : Location
  ) {
    this.schoolList = new StarclassSchoolList()
   }

  ngOnInit(): void {
    this.getSchoolList()
  }

  getSchoolList(page? : any){
    try {
      this.loader.show()
      this.schoolList.model = {
        'page' : page,
        'page_size': this.schoolList.page_size
      }
      this.baseService.getData('user/school-list-for-student-startclass', this.schoolList.model).subscribe(
        (res: any) => {
          if(res.status == true){
            if (!page)
              page = this.schoolList.config.currentPage
            this.schoolList.startIndex = res.page_size * (page - 1) + 1;
            this.schoolList.page_size = res.page_size
            this.schoolList.config.itemsPerPage = this.schoolList.page_size
            this.schoolList.config.currentPage = page
            this.schoolList.config.totalItems = res.count;
            if (res.count > 0) {
              this.schoolList.dataSource = res.results;
              this.schoolList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.schoolList.dataSource = undefined
              this.schoolList.pageCounts = undefined
            }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, err => {
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

  goToCourseList(id : any){
    this.router.navigate(['user/starclass-course-list'], {queryParams : {"school_id": id}})
  }
}
