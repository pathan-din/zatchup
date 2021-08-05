// import { Component, OnInit,ViewChild } from '@angular/core';
// import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
// import { BaseService } from '../../../../services/base/base.service';
// import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
// import { FormBuilder } from "@angular/forms";
// import { NgxSpinnerService } from "ngx-spinner";
// import { NotificationService } from 'src/app/services/notification/notification.service';
// import { Location } from '@angular/common';
// import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;


export interface TotalAlumniListElement {

  'SNo': number;
  ZatchUpID : string;
  Name : string;
  Gender : string;
  Age : number;
  Profession : string;
  Tenure : number;
  Duration: string;
  LastClassTaken: string;
  // VerificationStatusByEI: string;
  EKYCVerificationStatus: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1, 
    ZatchUpID: 'ZATCHUP 5025' , 
    Name: 'Wilma Mumcluya', 
    Gender : 'Male', 
    Age: 19,
    Profession : 'Software Engineer', 
    Tenure : 2017-18, 
    Duration: '3 Year', 
    LastClassTaken: 'B.com 2A',
    // VerificationStatusByEI: 'verified', 
    EKYCVerificationStatus :'complete',
    Action: ''
}
  
];

@Component({
  selector: 'app-ei-alumni-list',
  templateUrl: './ei-alumni-list.component.html',
  styleUrls: ['./ei-alumni-list.component.css']
})
export class EiAlumniListComponent implements OnInit {
  @ViewChild("closeRejectModel") closeRejectModel: any;
	model:any={};
  aluminiList:any=[];
  arrAge:any=[]
  pageSize:any=1;
  totalNumberOfPage:any=10;
  config: any;
  collection = { count: 60, data: [] };
  courseList:any=[];
  standardList:any=[];
  classList:any=[];
  //,'VerificationStatusByEI'
  displayedColumns: string[] = ['SNo', 'ZatchUpID','Name', 'Gender', 'Age',
  'Profession','Duration','LastClassTaken','Action'];

  dataSource = ELEMENT_DATA;
  modelUserId: any;
  modelReason: any={};
  error: any = [];
  errorDisplay: any = {};
  title:any='';
  pageCounts: any;
  objStudent: any = {};
  dataStudent: any = [];
  conversation: any = [];
  currentUser: any;
  recepintDetails: any = {};
  permission: any = [];
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;
  
  constructor(
    private genericFormValidationService:GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public baseService:BaseService,
    public formBuilder: FormBuilder,
    private alert : NotificationService,
    private location: Location,
    public eiService: EiServiceService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
    ) { }

 
  ngOnInit(): void {
    this.model.gender='';
    this.model.profession='';
    this.model.approved='';
    this.model.kyc_approved='';
    this.model.page_size='';
    this.route.queryParams.subscribe(params=>{
      if( params['approved']){
        this.model.approved = params['approved'];
        this.model.course = params['course'];
        this.model.standard = params['standard'];
        this.model.teaching_class = params['teaching_class'];
      }
      
    })
	  this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.displayCourseList();
    this.getAluminiList('','')
	  
  }


  goToChatScreen(objStudent) {
    this.conversation = [];
    this.dataStudent =[];
    this.objStudent = objStudent;
    this.getRecepintUserDetails(objStudent.firebase_id)
    return new Promise<any>((resolve, reject) => {
      let data: any = {};
      var date = new Date();

      var uuid = objStudent.firebase_id;
      data.user_request_id = localStorage.getItem('fbtoken');
      data.user_accept_id = uuid;
      data.is_block = 0
      data.is_seen = 0
      data.is_active = 1
      data.is_read = 0
      data.created_on = this.baseService.getDateFormat(date);
      let getFriendListExistingData: any = {}
      this.getFriendListBySender(localStorage.getItem('fbtoken'), uuid, data)



    })


  }
  getFriendListBySender(loginfirebase_id: any, user_accept_id: any, data) {
    this.conversation = [];
    this.dataStudent = [];
    this.firestore.collection('user_friend_list').valueChanges().subscribe((res:any)=>{
      let dataEle = res.find(elem=>{
                      return ((elem.user_request_id===loginfirebase_id && elem.user_accept_id===user_accept_id) || (elem.user_request_id===user_accept_id && elem.user_accept_id===loginfirebase_id))  
                    })
            console.log(dataEle);
                   
                    
      if(dataEle){
        
        this.firestore.collection('user_friend_list').get()
         
        .subscribe(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.map(doc => {
            
              let res:any=[]
              res=doc.data();
             if(dataEle.user_request_id==res.user_request_id && dataEle.user_accept_id== res.user_accept_id)
             {
              localStorage.setItem("friendlidt_id", doc.id)
              this. getDocumentsChat();
              
             }
              
            });
          }
  
        });
      } else{
        this.firestore.collection("user_friend_list").add(data).then(res => {
          localStorage.setItem("friendlidt_id",res.id)
           this. getDocumentsChat();
          
         })
      }             
     
      
    })
     
       
       }

       
  getDocumentsChat() {
    if(JSON.parse(localStorage.getItem('getreject')).role == 'EISUBADMIN'){
      if(this.isValidModule('MODULE013')==false){
        this.alert.error("You Don't have permission to chat with Alumni. Please contact school for more information","Error")
        this.getAluminiList('','')
        return 
      }
    }
    this.conversation = [];
    this.dataStudent =[];
    var uuid= localStorage.getItem("friendlidt_id");
    var dataSet=this.firestore.collection('chat_conversation').doc(uuid).valueChanges();
    dataSet.subscribe((res:any)=>{
      if(res){
        this.conversation = res.data;
        this.dataStudent = res.data;
      }else{
        this.conversation = [];
        this.dataStudent = [];
      }
      this.router.navigate(["ei/messages-details"]);
    })
    
    
    
  }
  isValidModule(module_code) {
    let moduleList: any = {};
    this.permission = JSON.parse(sessionStorage.getItem('permission'))
    if (this.permission !== undefined && this.permission !== null && this.permission !== '') {
      moduleList = this.permission;
      
      var data = moduleList.find(el => {
        return el.module_code == module_code
      })
      console.log(data, 'djsdj');
      
      if (data) {
        return data.is_access;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getRecepintUserDetails(uuid) {
    localStorage.setItem("receipent",uuid);
      this.firestore.collection('users').doc(uuid).ref.get().then(res => {
      this.recepintDetails = res.data();
      });
      
  }
  /** Function name: displayCourseList
   * Data bind in course list dropdown filter
   * 
   */
   displayCourseList(){
	try{
      this.SpinnerService.show(); 
	  
      let data = {
        'page': 1,
        'page_size': 1000
      }
      this.baseService.getData('ei/course-list/',data).subscribe(res => {
        let response:any={};
        response=res;
        // if(response.status == true){
        this.courseList=response.results;
        if(!this.model.course){
          this.model.course='';
	        this.model.standard='';
	        this.model.teaching_class='';
        }else{
          this.displayStandardList(this.model.course)
        }
      // }else{
      //   this.SpinnerService.hide();
      //   this.alert.error(response.error.message[0], 'Error')
      // }
        },(error) => {
          this.SpinnerService.hide(); 
          //console.log(error);
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      //this.alert.error(err, 'Error')
      //console.log(err);
    } 
 }
 /** Function Name : displayStandardList
   * Data bind in Standard list dropdown filter
   * Standard List By course Id
   */
  displayStandardList(courseId){
	try{
      this.SpinnerService.show(); 
        this.standardList=[]
		 
    let data:any={}
    
    data.course_id=courseId
	  this.baseService.getData('ei/standard-list/',data).subscribe(res => {
        this.SpinnerService.hide(); 
        let response:any={};
        response=res;
        // if(response.status == true){
    this.standardList=response.standarddata;
    if(!this.model.standard){
       
      this.model.standard='';
      this.model.teaching_class='';
    }else{
      this.displayClassList(this.model.standard)
    }
        // }
        // else{
        //   this.SpinnerService.hide();
        //   this.alert.error(response.error.message[0], 'Error')
        // }
        },(error) => {
          this.SpinnerService.hide(); 
          //console.log(error);
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      //this.alert.error(err, 'Error')
      //console.log(err);
    } 
 }
 /** Function Name : displayClassList
   * Data bind in Class list dropdown filter
   * Class List By standard Id
   */
  displayClassList(stId){
	try{
      this.SpinnerService.show(); 
        this.classList=[];
        let data:any={}
    
        data.standard_id=stId
        this.baseService.getData('ei/class-list/',data).subscribe(res => {
        this.SpinnerService.hide();
        let response:any={};
        response=res;
		    this.classList=response.classdata;
        
        },(error) => {
          this.SpinnerService.hide(); 
          //console.log(error);
          
        });
    }catch(err){
      this.SpinnerService.hide(); 
      //console.log(err);
    } 
 }
 /**
  * Function Name : getAluminiList
  * @param page 
  * @param strFilter 
  * Using this Get Alumni list
  */
getAluminiList(page,strFilter){
	 
	    try{
      let data:any={};
      if(page){
        data=this.model;
        data.page= page 
      }else{data=this.model;}
      
			this.SpinnerService.show(); 
      this.baseService.getData('ei/alumni-list/',data).subscribe(res => {
      let response:any={};
      response=res;
      this.SpinnerService.hide(); 
		
		  this.aluminiList=response.results;
      this.pageSize=response.page_size;
      this.model.page_size=this.pageSize;
		  this.totalNumberOfPage=response.count;
		  this.config.itemsPerPage=this.pageSize
	    this.config.currentPage=page
      this.config.totalItems=this.totalNumberOfPage;
      this.pageCounts = this.baseService.getCountsOfPage();
      let arrAlumniList:any=[];
      if(!page){page=1;}
      var i= (this.pageSize*(page-1))+1;
		  this.aluminiList.forEach(objData=>{
        let objAlumniList:any={};
       

        objAlumniList.SNo=i;
        objAlumniList.ZatchUpID=objData.zatchup_id;
        objAlumniList.Name=objData.first_name+ ' '+objData.last_name;
        if(objData.gender=='C'){
          objAlumniList.Gender=objData.pronoun;
        }else if(objData.gender=='F'){
          objAlumniList.Gender='Female';
        }else if(objData.gender=='M'){
          objAlumniList.Gender='Male';
        }
        
        objAlumniList.Age=objData.age?objData.age:'0';
        objAlumniList.Profession=objData.profession?objData.profession:'';
        objAlumniList.Tenure=objData.work_tenure?objData.work_tenure:'';
        objAlumniList.Duration=objData.workduration?objData.workduration:'0';
        objAlumniList.LastClassTaken=objData.class_name?objData.class_name:'';
       // objAlumniList.VerificationStatusByEI=objData.approved=="1"?'Approved':'Unapproved';
        objAlumniList.EKYCVerificationStatus=objData.kyc_approved=='1'?'Complete':'Incomplete';
        objAlumniList.kyc_approved = objData.kyc_approved;
        objAlumniList.approved = objData.approved;
        objAlumniList.is_rejected = objData.is_rejected;
        objAlumniList.student_id = objData.user_id;
        objAlumniList.reason_reject = objData.reason_reject;
        objAlumniList.firebase_id = objData.firebase_id;
        objAlumniList.Action='';
			
      arrAlumniList.push(objAlumniList);
			i=i+1;
		  })
		
    this.dataSource=arrAlumniList;
    if (response.status == false)
    {
      this.alert.error(response.error.message[0], 'Error')
    }
		},(error) => {
          this.SpinnerService.hide(); 
          // console.log(error);
          this.alert.error(error, 'Error')
        });
    }catch(err){
      this.SpinnerService.hide(); 
      console.log(err);
      // this.alert.error(err, 'Error')
    }
  }
  openRejectModel(studentId) {
    this.modelReason.student_id = studentId;
  }


  openModel(studentID)
  {
    this.modelUserId = studentID;
    $("#verifiedModel").modal({
      backdrop: 'static',
      keyboard: false
    });
   
  }
  closeModel(){
    $("#verifiedModel").modal('hide');
  }
  goToEiAlumniProfilePage(){
    this.router.navigate(['ei/alumni-profile']);
  }

  /**
   * Export Data
   */
  getExportData(){
    try {
      let params:any=[];
      params['export_csv'] = true
      this.baseService.generateExcel('ei/export-alumni-by-ei/', 'alumni-list', params)
    
      
    } catch (error) {
      console.log(error)
    }
  }
  
  goBack(): void{
    this.location.back();
  }


  goToEiStudentEditPage(id) {
    this.router.navigate(['ei/student-edit'], { queryParams: { 'stId': id } });
  }
  goToEiStudentProfilePage(id,title) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id ,'title':title} });
  }
  rejectStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/

      this.eiService.postRejectReason(this.modelReason).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {

          this.alert.success(response.message, 'Success')
          this.closeRejectModel.nativeElement.click();
          this.getAluminiList('', '')

        } else { // Condition False Validation failure
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection,'Error');

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }

  approveStudent(action, studentId) {
    let data: any = {};
    data.student_id = studentId;
    data.approve_student = action;
    try {

      this.SpinnerService.show();

      this.eiService.approveStudent(data).subscribe(res => {
        let response: any = {};
        response=res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.closeModel();
          this.getAluminiList('','');
          this.alert.success(response.message,'Success');
        } else {
          this.SpinnerService.hide();
          //this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService, response.error);
          this.alert.error(response.error,'Error');
           
        }

      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log(err);
    }
  }
}
