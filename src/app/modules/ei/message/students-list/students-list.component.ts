import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
export interface PeriodicElement {
  selectCheckbox: string;
  position: number;
  profilePick: string;
  nameOfStudents: string;
  relationship: string;
  classDetails: Array<string>;
  classAlias: string;
  rollNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
export interface PeriodicElement1 {
  selectCheckbox: string;
  position: number;
  profilePick: string;
  nameOfStudents: string;
  relationship: string;
  rollNumber: string;
}

// const ELEMENT_DATA1: PeriodicElement1[] = [
//    {'selectCheckbox':'','position': 1,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
//   'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 8543'},
//    {'selectCheckbox':'','position': 2,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
//   'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 8545'},
//    {'selectCheckbox':'','position': 3,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
//   'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3578'},
//    {'selectCheckbox':'','position': 4,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
//   'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3755'},
//    {'selectCheckbox':'','position': 5,'profilePick' : '','nameOfStudents':'Wilma Mumduya', 
//   'relationship': 'Teacher', 'rollNumber': 'EMPLOYEE 3568'},
// ];
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  modelteacher: any = {};
  model:any={};
  errorDisplay: any = {};
  userId: any;
  pageCounts: any;
  studentList: any=[];
  studentLists: any=[];
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
  studentListSendForBulk: any=[];
  attachment:any='';
  addTeacherList:any=[];
  isaccess:boolean=false;
  displayedColumns: string[] = ['selectCheckbox', 'position', 'profilePick', 'nameOfStudents', 
  'relationship', 'classDetails','classAlias', 'rollNumber'];   
   dataSource = ELEMENT_DATA;
   displayedColumns1: string[] = ['selectCheckbox', 'position', 'profilePick', 'nameOfStudents', 
  'relationship', 'rollNumber'];   

  dataSource1 = []
  sectionsList: any;
  groupCollectionPerson:any=[];
  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService) { }
  sectionIds:any;
  teacherList:any=[];
  ngOnInit(): void {
    if(localStorage.getItem("sections")){
      this.getGetVerifiedStudent('','')
    }
    if(localStorage.getItem("teachers")){
      this.teacherList = JSON.parse(localStorage.getItem("teachers"));
      this.dataSource1 = this.teacherList;
    }
  }


  getGetVerifiedStudent(page, strFilter) {

    try {
  
      this.loader.show();
      this.model.page = page;
      if(localStorage.getItem("sections")){
        this.sectionsList = JSON.parse(localStorage.getItem("sections"));
        if(JSON.parse(localStorage.getItem("sections")).length>0){
          this.model.class_ids = JSON.parse(localStorage.getItem("sections")).join(",");
        }
        
      }
     
   
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
        let arrGroupUserList:any=[]
        if(localStorage.getItem("groupUsers")){
         
          JSON.parse(localStorage.getItem("groupUsers")).forEach(element => {
            if(element.student_id){
              arrGroupUserList[element.student_id]=element
            }
            
          });
          
        }
        if (!page) { page = 1 }
        var i = (this.pageSize * (page - 1)) + 1;
        this.studentList.forEach(objData => {
          let objStudentList: any = {};
          
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
          objStudentList.checkedAll = true;
          if(localStorage.getItem("groupUsers")){
             if(arrGroupUserList[objData.user_id]){
              objStudentList.checked = arrGroupUserList[objData.user_id].checked;
             }
          }else{
            objStudentList.checked =true;
          }
          
          objStudentList.Action = '';
          
          i = i + 1;
          arrStudentList.push(objStudentList);
        })
         
        this.studentLists=arrStudentList;
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
 
  selectAll(ev,type){
    if(type=='student')
    {
     
     var i=0;
      this.studentLists.forEach(objData => {
        objData.checked = ev.checked;
        i=i+1;
      })
      this.dataSource = this.studentLists;
    }else{
       
     var i=0;
      this.teacherList.forEach(objData => {
        objData.isadded = ev.checked;
        i=i+1;
      })
      this.dataSource1 = this.teacherList;
    }
   
  }
   
  selectOne(ev,type,user){
    if(type=='student')
    {
     this.studentLists.forEach(objData => {
       if(user==objData.student_id)
        objData.checked = ev.checked;
      })
      
    }else{
      this.teacherList.forEach(objData => {
        if(user==objData.user_id)
        objData.isadded = ev.checked;
        
      })
    }
   
  }
  createGroup(){
    let atLeastOneStudent:any=false;
    let atLeastOneTeacher:any=false;
    let groupReceipentUser:any=[];
    this.studentLists.forEach(objDataStu => {
      console.log(objDataStu.checked);
      
      if(objDataStu.checked){
        groupReceipentUser.push(objDataStu)
        atLeastOneStudent=true;
      } 
    })
    this.teacherList.forEach(objData => {
      
      if(objData.isadded ){
        groupReceipentUser.push(objData)
        atLeastOneTeacher=true;
      } 
      
    })
    if(!atLeastOneStudent){
      return this.alert.error("Please atleast one student in this group","Error");
    }
    if(!atLeastOneTeacher){
      return this.alert.error("Please atleast one teacher in this group","Error");
    }
    localStorage.removeItem("groupUsers");
    localStorage.setItem("groupUsers",JSON.stringify(groupReceipentUser));
    this.router.navigate(["ei/create-group-chat"]);
  }
 
}
