import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
// import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
// import { findIndex } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $: any;
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';

import {ThemePalette} from '@angular/material/core';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.component.html',
  styleUrls: ['./reminder-add.component.css']
})
export class ReminderAddComponent implements OnInit {
  
  model: any = {};
  
  studentList: any = [];
  
  displayedColumns: string[] = ['checked', 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
    'class' ];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any={};
  collection = { count: 60, data: [] };
  dataSource: any;
  errorDisplay: any = {};
  isTeacher: boolean = false;
  classListArrayAccess: any = [];
  
  courseList: any = [];
  courseListModuleAccess: any = [];
  standardList: any = [];
  classList: any = [];
  isModuleAccessStudent: any
  standardListModuleAccess: any = [];
  classListModuleAccess: any = [];

  userId: any;
  sectionIds:any=[];
  pageCounts: number[];
  studentListSendForBulk: any=[];
  attachment:any='';
  constructor(
    private router: Router,
    private location: Location,
    private loader: NgxSpinnerService,
    public baseService: BaseService,
    public eiService: EiServiceService,
    // public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private genericFormValidationService: GenericFormValidationService
  ) { }


  ngOnInit(): void {
  }

  displayCourseListModuleAccess() {
    try {
      this.loader.show();
      this.baseService.getData('ei/course-list/').subscribe(
        (res: any) => {
          this.loader.hide();
          this.courseListModuleAccess = res.results;
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }
  }
  displayStandardListModuleAccess(courseId) {
    try {
      this.loader.show();
        this.baseService.getData('ei/standard-list/', { "course_id": courseId }).subscribe(
          (res: any) => {
            this.loader.hide();
            this.standardListModuleAccess[courseId] = res.standarddata;
          }, (error) => {
            this.loader.hide();
          });
     
    } catch (err) {
      this.loader.hide();
    }
  }

  displayClassListModuleAccess(stId) {
    try {
      this.loader.show();
      this.classList = [];
      this.baseService.getData('ei/class-list/', { "standard_id": stId }).subscribe(
        (res: any) => {
          this.loader.hide();
          this.classListModuleAccess[stId] = res.classdata;
        }, (error) => {
          this.loader.hide();
        });
      
    } catch (err) {
      this.loader.hide();
    }
  }
  task: Task = {
    name: 'M.Com',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: '1st Year', completed: false, color: 'primary'},
      {name: '2nd Year', completed: false, color: 'primary'},
      {name: '3rd Year', completed: false, color: 'primary'},
      {name: '4th Year', completed: false, color: 'primary'}
    ]
  };
getSectionIds(secId){
  
  
  var index=this.sectionIds.findIndex((e)=>{
    return e==secId;
  })
  console.log(index);
  if(index > -1){
    this.sectionIds.splice(index);
  }else{
    this.sectionIds.push(secId)
  }
  this.model.sections = this.sectionIds.join();
  console.log(this.sectionIds.join());
  
}
getGender(data: any) {
  if (data)
    return this.baseService.getGender(data)
  return ''
}
getGetVerifiedStudent(page, strFilter) {

  try {
    this.loader.show();
    this.model.page = page;


if(this.model.teaching_class){
  this.model.approved=1;
  this.baseService.getData('ei/student-list/', this.model).subscribe(
    (res: any) => {
      this.loader.hide();
      this.studentList = res.results;
      this.model.page = page
      this.pageSize = res.page_size;
      this.model.page_size = this.pageSize
      this.totalNumberOfPage = res.count;
      this.config.itemsPerPage = this.pageSize
      this.config.currentPage = page
      this.config.totalItems = this.totalNumberOfPage;
      this.pageCounts = this.baseService.getCountsOfPage();
      let arrStudentList: any = [];
      if (!page) { page = 1 }
      var i = (this.pageSize * (page - 1)) + 1;
      this.studentList.forEach(objData => {
        let objStudentList: any = {};
        objStudentList.checked = '';
        objStudentList.SNo = i;
        objStudentList.zatchupID = objData.zatchup_id;
        objStudentList.student_id = objData.user_id;
        objStudentList.kyc_approved = objData.kyc_approved;
        objStudentList.approved = objData.approved;
        objStudentList.is_rejected = objData.is_rejected;
        objStudentList.reason_reject = objData.reason_reject;
        objStudentList.name = objData.first_name + ' ' + objData.last_name;
        objStudentList.gender = objData.gender;
        objStudentList.age = objData.age;
        objStudentList.userID = objData.admission_no;
        objStudentList.class = objData.class_name;
        objStudentList.alias_class = objData.alias_class;
        objStudentList.roll_no = objData.roll_no;
        objStudentList.firebase_id = objData.firebase_id
        
        objStudentList.Action = '';
        i = i + 1;
        arrStudentList.push(objStudentList);
      })

      this.dataSource = arrStudentList;
      if (res.status == false) {
        this.alert.error(res.error.message[0], 'Error')
      }
    }, (error) => {
      this.loader.hide();
    });
}
   
  } catch (err) {
    this.loader.hide();
  }
}

getStudentBycheckboxClickForStudentBulkAction(stId, event) {

  if (event.checked) {
    if (this.studentListSendForBulk.indexOf(stId) === -1) {
      this.studentListSendForBulk.push(stId)
    }
  } else {
    if (this.studentListSendForBulk.indexOf(stId) === -1) {

    } else {
      var index = this.studentListSendForBulk.indexOf(stId)
      this.studentListSendForBulk.splice(index, 1);
    }
  }
  this.model.studentlists_id=this.studentListSendForBulk.join();
}
submitReminder(){
  try {
    this.errorDisplay=this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements,true,[]);
    console.log(this.errorDisplay);
    
    if(this.errorDisplay.valid)
    {
      return false;
    }
    
    if(this.model.ismoduleaccessclass){
      if(this.studentListSendForBulk.length<=0){
        this.alert.error("Please select any one section student list","Error")
        return 
      }
    }
    this.baseService.action("ei/send-reminder-by-ei/",this.model).subscribe((res:any)=>{

      if(res.status==true){
        this.alert.success(res.message,"Success");
        this.router.navigate(['ei/reminder'])
      }else{
        this.alert.error(res.error.message[0],"Error");
      }
    },(error)=>{
      console.log(error);
      
    })
  } catch (error) {
    
  }
}
  allComplete: boolean = false;
  changeAddClass($event,text) {
    console.log($event);
    
    if (text=='addclass' && $event.checked==true) {
      this.displayCourseListModuleAccess();
    } else if (text=='allstudent' && $event.checked==true){
      this.model.sections="";
    }else{
      this.courseListModuleAccess=[];
      this.standardListModuleAccess=[];
      this.classListModuleAccess=[]
      this.model.sections="";
    }
  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

   
  uploadProfilePic(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
      this.loader.hide();
      this.alert.error("File format not supported", 'Error');
      return
    }
    try {
      this.loader.show();
      const formData = new FormData();
      formData.append('file_name', fileData);
      this.baseService.action('ei/uploaddocsfile/', formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.loader.hide();
          this.model.reminderimage = response.filename;
          this.attachment=this.baseService.serverImagePath+'/'+this.model.reminderimage
        } else {
          this.loader.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.loader.hide();
        console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      console.log("vaeryfy Otp Exception", err);
    }
  }

}
