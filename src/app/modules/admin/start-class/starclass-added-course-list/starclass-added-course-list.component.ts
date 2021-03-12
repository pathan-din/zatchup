import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CourseList } from '../../ei/modals/education-institute.modal';

// export interface TotalAlumniListElement {
//   'SNo': number;
//   courseTitle : string;
//   dateOfBuying: string;
//   dateOfCourseExpiry: string;
//   totalViewAllowed: string;
//   numberOfLectures : string;
//   numberOfViews: string;
//   viewInvoice: string;
// }

// const ELEMENT_DATA: TotalAlumniListElement[] = [
//   {
//     'SNo': 1, 
//     courseTitle : 'Information Technology', 
//     dateOfBuying: '05 May 2020', 
//     dateOfCourseExpiry: '15 Dec 2020',
//     totalViewAllowed :'500',
//     numberOfLectures: '15',
//     numberOfViews: '50',
//     viewInvoice: 'View Invoice'
//   }
  
// ];
@Component({
  selector: 'app-starclass-added-course-list',
  templateUrl: './starclass-added-course-list.component.html',
  styleUrls: ['./starclass-added-course-list.component.css']
})
export class StarclassAddedCourseListComponent implements OnInit {

 courseList: CourseList

 dataSource : any;
  modal: { id: any; };
  message: any;
  constructor(
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.courseList = new CourseList()
   }

  ngOnInit(): void {
    this.courseList.id = this.route.snapshot.queryParamMap.get('id')
    this.getCourseList()
  }
  
  goToCourseView(data){
    this.router.navigate(['admin/starclass-course-preview', data.id])
    console.log(data);
    
  }

  goToAddCourse(){
    this.router.navigate(['admin/starclass-course-add'])
  }

  getCourseList(page? : any){
    try {
      this.loader.show()
      this.courseList.modal ={
        'page': page,
        'page_size': this.courseList.page_size,
        'id': this.courseList.id
      }
      this.baseService.getData('starclass/star-class-course-admin-list/', this.courseList.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if(!page)
            page = this.courseList.config.currentPage
            this.courseList.startIndex = res.page_size * (page - 1) + 1;
            this.courseList.page_size = res.page_size
            this.courseList.config.itemsPerPage = this.courseList.page_size
            this.courseList.config.currentPage = page
            this.courseList.config.totalItems = res.count;
            if(res.count >0){
              this.courseList.dataSource = res.results;
              this.courseList.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.courseList.dataSource = undefined
              this.courseList.pageCounts = undefined
            } }
            else{
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

  deleteCourse(id: any ): any {
    this.modal ={
      "id": id,
    }
   this.message = 'Are you sure you want to delete this Course ?'
    this.confirmDialogService.confirmThis(this.message, () => {
      this.loader.show()
      this.baseService.action('starclass/delete-course/', this.modal).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getCourseList();
          } else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }
  goBack(){
    this.location.back()
  }
}
