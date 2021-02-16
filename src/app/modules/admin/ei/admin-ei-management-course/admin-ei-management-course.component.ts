import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-ei-management-course',
  templateUrl: './admin-ei-management-course.component.html',
  styleUrls: ['./admin-ei-management-course.component.css']
})
export class AdminEiManagementCourseComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'courseName', 'startYera',
    'endYear', 'noOfStandards', 'noOfClass',
    'noOfStudents', 'noOfAlumni', 'Action'];

  dataSource: any;
  eiId: any;
  courseList: any;
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  startIndex: any;
  pageSize: any = 5;
  pageCounts: any;

  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService
  ) { }



  ngOnInit(): void {
    this.eiId = this.activeRoute.snapshot.params.id
    if (this.eiId)
      this.getCourseList('')
      this.pageCounts = this.baseService.getCountsOfPage();
  }

  getCourseList(page) {
    this.loader.show()

    let params = {
      "id": this.eiId,
      "page_size": this.pageSize ? this.pageSize : 5,
      "page": page ? page : 1
    }

    this.baseService.getData('admin/ei-list-of-course/', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          this.courseList = res.results
        }

        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  goBack(){
    this.location.back();
  }

}
