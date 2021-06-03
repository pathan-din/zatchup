import { Location } from "@angular/common"
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-bulk-promote',
  templateUrl: './bulk-promote.component.html',
  styleUrls: ['./bulk-promote.component.css']
})
export class BulkPromoteComponent implements OnInit {
  displayedColumns: string[] = ['checked', 'SNo', 'Name', 'roll_no'];
  user_id: any = '';
  classId: any = '';
  courseId: any = '';
  standardId: any = '';
  currentStandardId: any = '';
  classList: any = [];
  studentCourseList: any = [];
  studentStandardList: any = [];
  dataSource: any;

  constructor(
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem('userprofile')).user_id;
    this.dataSource = JSON.parse(localStorage.getItem('bulkStudents')).studentList;
    this.courseId = JSON.parse(localStorage.getItem('bulkStudents')).courseId;
    // this.classId = JSON.parse(localStorage.getItem('bulkStudents')).classId;
    this.currentStandardId = JSON.parse(localStorage.getItem('bulkStudents')).standardId;
    this.setData()
    this.getCourseList();
    this.getStandardList(this.courseId,);
    // this.getClassList(this.currentStandardId)

  }

  setData() {
    this.dataSource.forEach(ele => {
      ele['status'] = true
    })
  }

  selectUnselectStudents(evt: any, index: any) {
    this.dataSource[index].status = evt.checked
  }

  getCourseList() {
    try {
      this.loader.show();
      this.baseService.getData("ei/course-list/").subscribe((res: any) => {
        this.loader.hide()
        this.studentCourseList = res.results;
      }, (error) => {
        this.loader.hide()
        this.alert.error(error.error, "Error");
      })
    } catch (e) {
      this.loader.hide()
      this.alert.error(e.error, "Error");
    }
  }

  getStandardList(courseId) {
    // debugger
    try {
      this.loader.show();
      let params = {
        "standard_id": this.standardId ? this.standardId : this.currentStandardId,
        "course_id": courseId
      }
      this.baseService.getData("user/next-standard-list/", params).subscribe((res: any) => {
        this.loader.hide()
        this.studentStandardList = res.results;
      }, (error) => {
        this.loader.hide()
        this.alert.error(error.error, "Error");
      })
    } catch (e) {
      this.loader.hide()
      this.alert.error(e.error, "Error");
    }
  }

  getClassList(stId) {
    try {
      this.loader.show();
      this.classList = [];
      this.baseService.getData("ei/class-list/", { standard_id: stId }).subscribe(
        (res: any) => {
          this.classList = res.classdata;
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }


  submit() {
    let promoteData: any = [];
    promoteData = this.dataSource.filter(x => x.status == true)

    if (promoteData.length == 0) {
      this.alert.error('Please select students first.', 'Error')
      return;
    }
    else if(!this.standardId && !this.classId){
      this.alert.error('Please select standard and class first.', 'Error')
      return;
    }
    else if(this.standardId && !this.classId){
      this.alert.error('Please select class first.', 'Error')
      return;
    }
    else {
      let rollNums = promoteData.map(a => a.roll_no);
      let userIds = promoteData.map(a => a.student_id);
      let params = {
        "course": this.courseId,
        "standard": this.standardId,
        "teaching_class": this.classId,
        "user_id": userIds.toString(),
        "roll_no": rollNums.toString()
      }

      this.loader.show();
      this.baseService.action('ei/bulk-promote-class-by-ei/',params).subscribe(
        (res: any) =>{
          this.loader.hide()
          if(res.status){
            this.alert.success(res.message, "Success")
            this.location.back()
          }else{
            this.alert.error(res.error.message[0], "Error")
          }
          
        },
        err =>{
          this.loader.hide()
        }
      )
    }
  }

  goBack() {
    this.location.back()
  }

}
