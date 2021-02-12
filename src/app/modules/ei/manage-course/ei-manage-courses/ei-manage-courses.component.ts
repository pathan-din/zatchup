import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';


export interface subAdminManagementElement {

  'SNo': number;
  courseName : string;
  startYear : number;
  endYear : number;
  noOfStandards: number;
  noOfClass: number;
  noOfStudents: number;
  noOfAlumni: number;
  Action: string;

}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-ei-manage-courses',
  templateUrl: './ei-manage-courses.component.html',
  styleUrls: ['./ei-manage-courses.component.css']
})
export class EiManageCoursesComponent implements OnInit {
  model:any={};
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  courseList:any=[];
  collection = { count: 60, data: [] };
  displayedColumns: string[] = ['SNo', 'courseName','startYear', 
  'endYear','noOfStandards','noOfClass',
  'noOfStudents','noOfAlumni','Action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(
    private router: Router,
    private baseService:BaseService,
    private SpinnerService: NgxSpinnerService,
    private alert : NotificationService,
    private confirmDialogService:ConfirmDialogService) { }


  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.getCourseList('','');
  }
  goToEiEditPage(id){
    this.router.navigate(["ei/manage-courses-add"],{queryParams:{action:'edit',course_id:id}});
  }
  goToDelete(courseId: any): any {
    this.confirmDialogService.confirmThis('Are you sure you want to delete ?', () => {
      this.SpinnerService.show()
      this.baseService.action("ei/get-course-by-id/"+courseId+"/",{}).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.SpinnerService.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.SpinnerService.hide();
      }
    }, () => {
    });
  }
  // goToDelete(courseId){
  //     try {
  //       this.SpinnerService.show();
  //       this.baseService.action("ei/get-course-by-id/"+courseId+"/",{}).subscribe((res:any)=>{
  //         if(res.status==true){
  //           this.SpinnerService.hide();
  //           this.alert.success(res.message,"Success");
  //         }else{
  //           this.SpinnerService.hide();
  //           this.alert.error(res.error.message[0],"Error");
  //         }
          
  //       },(error)=>{
  //         this.SpinnerService.hide();

  //       })
  //     } catch (e) {
  //       this.SpinnerService.hide();
  //     }
  // }

  getCourseList(page, strFilter) {

    try {

      this.SpinnerService.show();

      this.baseService.getData('ei/list-of-course/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        if(response.status==false)
        {
          this.dataSource=[];
          return;
        }
        this.SpinnerService.hide();
        this.courseList = response.results;
        this.pageSize = response.page_size;
        this.totalNumberOfPage = response.count;
        let arrCourseList: any = [];
        if(arrCourseList)
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage

        this.courseList.forEach(objData => {
          let objCourseList: any = {};
          objCourseList.SNo = i;
          objCourseList.courseName = objData.course_name;
          objCourseList.id = objData.id;
          objCourseList.startYear = objData.start_year;
          objCourseList.endYear = objData.end_year;
          objCourseList.noOfStandards = objData.num_of_standard;
          objCourseList.noOfClass = objData.num_of_class;
          objCourseList.noOfStudents = objData.num_of_student;
          objCourseList.noOfAlumni = objData.num_of_alumni;
          objCourseList.Action = '';
          arrCourseList.push(objCourseList);
          i = i + 1;
        })

        this.dataSource=arrCourseList;
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
  goToCourseHistoryPage(){
    this.router.navigate(['ei/manage-coursesHistory']);
  }
  
  goToManageCourseAddPage(){
    this.router.navigate(['ei/manage-courses-add']);
  }

  goToEiManageCoursesDetailsPage(id){
    this.router.navigate(['ei/manage-courses-details', id]);
  }
}
