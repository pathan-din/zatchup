import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubadminCompleteRequest } from '../../registration/modal/contact-us.mdal';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  subadminCompleteRequest : SubadminCompleteRequest
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any = [];
  modelteacher: any = {};
  model:any={};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;
  studentList: any=[];
  standardIds:any=[];
  courseIds:any=[];


   
  totalNumberOfPage: any = 10;
 
  isTeacher: boolean = false;
  classListArrayAccess: any = [];
  
  courseList: any = [];
  courseListModuleAccess: any = [];
  standardList: any = [];
  classList: any = [];
  isModuleAccessStudent: any
  standardListModuleAccess: any = [];
  classListModuleAccess: any = [];

  
  sectionIds:any=[];
   
  studentListSendForBulk: any=[];
  attachment:any='';
  teacherList:any=[];
  addTeacherList:any=[];
  isaccess:boolean=false;
  params:any={};
  isAddedTeacher:boolean=false;
  displayedColumns: string[] = ['checked', 'SNo', 'ZatchUpID', 'Name', 'userID', 'roll_no', 'Gender', 'Age',
  'class' ];
  constructor(
    private location: Location,
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService,
    private route:ActivatedRoute
  ) {
     
   }
 

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.params = params;
    })
     
      if(localStorage.getItem("groupclasscheck")=='true'){
        this.model.ismoduleaccessclass=localStorage.getItem("groupclasscheck");
        this. displayCourseListModuleAccess();
        this.sectionIds=JSON.parse(localStorage.getItem("sections"));
        if(localStorage.getItem("courseIds")){
          if(JSON.parse(localStorage.getItem("courseIds")).length>0){
          
            this.courseIds=JSON.parse(localStorage.getItem("courseIds"))
            JSON.parse(localStorage.getItem("courseIds")).forEach(element => {
              this.displayStandardListModuleAccess(element,true);
            });
          }
        }
       if(localStorage.getItem("standardIds")){
        if(JSON.parse(localStorage.getItem("standardIds")).length>0){
          this.standardIds=JSON.parse(localStorage.getItem("standardIds"))
          JSON.parse(localStorage.getItem("standardIds")).forEach(element => {
            this.displayClassListModuleAccess(element,true);
          });
          
        }
       }
       
      }
    
   
  
    this.getTeacherList(100)
    
  }
  isAccess(id,action){
    if(action=='course'){
      if(localStorage.getItem("courseIds")){
        if(JSON.parse(localStorage.getItem("courseIds")).length>0){
          var index = JSON.parse(localStorage.getItem("courseIds")).findIndex(e=>{
            return e == id
          })
          if(index>-1){
            return true;
          }else{
            return false;
          }
        }
      }
      
    }else if(action=='standard'){
      
      if(localStorage.getItem("standardIds")){
        if(JSON.parse(localStorage.getItem("standardIds")).length>0){
          var index = JSON.parse(localStorage.getItem("standardIds")).findIndex(e=>{
            return e == id
          })
          if(index>-1){
            return true;
          }else{
            return false;
          }
        }
      }
    }else{
      

      if(localStorage.getItem("sections")){
        if(JSON.parse(localStorage.getItem("sections")).length>0){
          var index = JSON.parse(localStorage.getItem("sections")).findIndex(e=>{
            return e == id
          })
          if(index>-1){
            return true;
          }else{
            return false;
          }
        }
      }
    }
   
    
    
   
    return false;
  } 
  displayCourseListModuleAccess() {
    try {
      this.loader.show();
      this.model.page_size=1000
      this.baseService.getData('ei/course-list/',this.model).subscribe(
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
  displayStandardListModuleAccess(courseId,ev) {
    try {
      var eve = false;
      if(ev == true){
        eve =true
      }else{
        eve =ev.checked
      }
      
      if(eve){
        this.loader.show();
        this.baseService.getData('ei/standard-list/', { "course_id": courseId,page_size:1000 }).subscribe(
          (res: any) => {
            this.loader.hide();
            this.standardListModuleAccess[courseId] = res.standarddata;
          }, (error) => {
            this.loader.hide();
          });
     
      }else{
        this.standardListModuleAccess=[];
      }
     
    } catch (err) {
      this.loader.hide();
    }
  }

  displayClassListModuleAccess(stId,ev) {
    try {
      var eve = false;
      if(ev == true){
        eve =true
      }else{
        eve =ev.checked
      }
      if(eve){
        this.loader.show();
        this.classList = [];
        this.baseService.getData('ei/class-list/', { "standard_id": stId ,page_size:1000}).subscribe(
          (res: any) => {
            this.loader.hide();
            this.classListModuleAccess[stId] = res.classdata;
          }, (error) => {
            this.loader.hide();
          });
      }else{
        this.classListModuleAccess=[]
      }
     
      
    } catch (err) {
      this.loader.hide();
    }
  }
 
getSectionIds(secId){
  
  
  var index=this.sectionIds.findIndex((e)=>{
    return e==secId;
  })
  
  
  if(index == -1){
    this.sectionIds.push(secId)
  }else{
    this.sectionIds.splice(index, 1);
    
  }
 
  
}
getStandardIds(stId){
  
  
  var index=this.standardIds.findIndex((e)=>{
    return e==stId;
  })
  
  
  if(index == -1){
    this.standardIds.push(stId)
  }else{
    this.standardIds.splice(index, 1);
    
  }
 
  
}
getCourseIds(courseId){
  
  
  var index=this.courseIds.findIndex((e)=>{
    return e==courseId;
  })
  
  
  if(index == -1){
    this.courseIds.push(courseId)
  }else{
    this.courseIds.splice(index, 1);
    
  }
 
  
}

addTeacherInGroup(obj,i,action){
  var index=this.addTeacherList.findIndex((e)=>{
    return e.id==obj.id;
  })
  if(index == -1){
    this.addTeacherList.push(obj)
  }else{
    this.addTeacherList.splice(index, 1);
    
  }
  if(action == 'del'){
    this.teacherList[i].isadded  = false;
  }else{
    this.teacherList[i].isadded  = true;
  }
  
  
  
}
createGroupConfirmationList(){
 // this.model.sections = this.sectionIds.join();
 this.teacherList.forEach(element => {
   if(element.isadded)
   {
    this.isAddedTeacher=true;
   } 
 });
  if(!this.isAddedTeacher){
    return this.alert.error("Atleast one teacher in this group","Error")
  }
  // if(this.sectionIds.length==0){
  //   return this.alert.error("Select one section","Error")
  // }
  localStorage.setItem("teachers",JSON.stringify(this.teacherList));
  localStorage.setItem("sections",JSON.stringify(this.sectionIds));
  localStorage.setItem("courseIds",JSON.stringify(this.courseIds));
  localStorage.setItem("standardIds",JSON.stringify(this.standardIds));
  if(this.params.editgroup){
     
    this.router.navigate(["ei/students-list"],{queryParams:{"editgroup":this.params.editgroup,"groupId":this.params.groupId}});
  }else{
    this.router.navigate(["ei/students-list"]);
  }
  
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
    this.model.page_size = 1000;

 
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


 
  getTeacherList(page){
    this.loader.show();
    this.modelteacher.page_size = 1000;
    this.modelteacher.module_id='31'
    this.baseService.getData('ei/subadmin-lists-by-ei/',this.modelteacher).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.teacherList =res.results;
          var tList =[];
          if(localStorage.getItem("teachers")){
            tList = JSON.parse(localStorage.getItem("teachers"));
            
            
          }
          this.teacherList.forEach(element => {
            if(tList.length>0){

              var index = tList.findIndex(e=>{
                console.log(e.user_id);
                return e.user_id == element.user_id
              })
             
              if(index>-1){
                element.isadded = tList[index].isadded
              }else{
                element.isadded = false;
              }
              
            }else{
              element.isadded = false;
            }
            
          });
          
          
          
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
          
        }
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }
 
  changeAddClass($event,text) {
     localStorage.setItem("groupclasscheck",$event.checked);
    if (text=='addclass' && $event.checked==true) {
      this.displayCourseListModuleAccess();
    } else if (text=='allstudent' && $event.checked==true){
      this.model.sections="";
    }else{
      this.courseListModuleAccess=[];
      this.standardListModuleAccess=[];
      this.classListModuleAccess=[]
      this.model.sections="";
      this.dataSource =[];
      this.studentList = [];
      this.model.ismoduleaccessclass=false;
      this.model.course = "";
    }
  }
  goBack(): void{
    this.location.back();
  }
 
}
