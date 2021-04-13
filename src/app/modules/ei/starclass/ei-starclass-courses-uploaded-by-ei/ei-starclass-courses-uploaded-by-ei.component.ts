import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EiCourseList } from '../../registration/modal/contact-us.mdal';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-ei-starclass-courses-uploaded-by-ei',
  templateUrl: './ei-starclass-courses-uploaded-by-ei.component.html',
  styleUrls: ['./ei-starclass-courses-uploaded-by-ei.component.css']
})
export class EiStarclassCoursesUploadedByEiComponent implements OnInit {
 eiCourseList : EiCourseList
 modal: { id: any; };
 message: any;
  roleOfSubadmin: any;

  constructor(
    private router: Router,
    private location: Location,
    private baseService : BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private route : ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,

    ) {
      this.eiCourseList= new EiCourseList()
     }

  ngOnInit(): void {
    // console.log('ttttttttttt.......',JSON.parse(localStorage.getItem('getreject')))
    this.roleOfSubadmin = JSON.parse(localStorage.getItem('getreject'))
    console.log(this.roleOfSubadmin.role, 'fjdsngjng....');
    
    this.eiCourseList.id = this.route.snapshot.queryParamMap.get('id')
    this.getEiCourseList('');
    this.getLevelOfEducation();
    this.getField();
    this.getStandardFilter();
    this.getSubject();
  }

  goBack(){
    this.location.back()
  }

  
  goToCourseView(data){
    this.router.navigate(['ei/ei-starclass-course-view', data.id])
    console.log(data);
  }

  deleteCourse(id: any ): any {
    this.modal ={
      "id": id,
    }
    console.log(this.modal);
    
   this.message = 'Are you sure you want to delete this Course ?'
    this.confirmDialogService.confirmThis(this.message, () => {
      this.loader.show()
      this.baseService.action('starclass/ei-course_delete/', this.modal).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getEiCourseList();
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

  getEiCourseList(page? : any){
    try {
      this.loader.show()
      
      let params = {
        'page' :page,
        'page_size':this.eiCourseList.page_size,
        'level_of_education': this.eiCourseList.levelOfEducationName,
        'field': this.eiCourseList.fieldName,
        'standard': this.eiCourseList.standardName,
        'subject': this.eiCourseList.subjectName
      }
      
      this.baseService.getData('starclass/star-class-course-ei-list/', params).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.eiCourseList.config.currentPage
            this.eiCourseList.startIndex = res.page_size * (page- 1) + 1;
            this.eiCourseList.page_size = res.page_size
            this.eiCourseList.config.itemsPerPage = this.eiCourseList.page_size
            this.eiCourseList.config.currentPage = page
            this.eiCourseList.config.totalItems = res.count
            if(res.count > 0) {
              this.eiCourseList.dataSource = res.results;
              this.eiCourseList.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.eiCourseList.dataSource = undefined
              this.eiCourseList.pageCounts = undefined
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

  goToCreateCourse(){
    this.router.navigate(['ei/star-class-course-add'], {queryParams:{'action': 'add'}})
  }

  goToStudentAudienceAdd(id){
    this.router.navigate(['ei/star-class-audience-student-list'],{queryParams:{ 'course_id': id}})
    console.log(id);
  }

  goToCourseHistory(){
    this.router.navigate(['ei/starclass-course-history'])
  }

  generateExcel() {
    delete this.eiCourseList.params.page_size;
    delete this.eiCourseList.params.page;
    this.eiCourseList.params['export_csv'] = true
    this.baseService.generateExcel('starclass/export-csv-ei-course/', 'ei-course-list', this.eiCourseList.params);
  }

  getLevelOfEducation() {
    this.baseService.getData('starclass/common_get_level_of_education/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eiCourseList.levelOfEducation= res.results
      }
    )
  }

  getField() {
    this.baseService.getData('starclass/common_get_field/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eiCourseList.field= res.results
      }
    )
  }

  getStandardFilter() {
    this.baseService.getData('starclass/common_get_class_standard/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eiCourseList.standard= res.results
      }
    )
  }

  getSubject() {
    this.baseService.getData('starclass/common_get_subject/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.eiCourseList.subject= res.results
      }
    )
  }

}
