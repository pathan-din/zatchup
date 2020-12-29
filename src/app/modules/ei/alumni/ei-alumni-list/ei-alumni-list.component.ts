import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
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
  VerificationStatusByEI: string;
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
    VerificationStatusByEI: 'verified', 
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
  displayedColumns: string[] = ['SNo', 'ZatchUpID','Name', 'Gender', 'Age',
  'Profession','Tenure','Duration','LastClassTaken','VerificationStatusByEI',
  'EKYCVerificationStatus','Action'];

  dataSource = ELEMENT_DATA;
  modelUserId: any;
  modelReason: any={};
  error: any = [];
  errorDisplay: any = {};
  title:any='';
  pageCounts: any;

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
    private route: ActivatedRoute
    ) { }

 
  ngOnInit(): void {
    this.model.gender='';
    this.model.profession='';
    this.model.approved='';
    this.model.kyc_approved='';
    this.model.page_size='';
    this.route.queryParams.subscribe(params=>{
      this.model.approved = params['approved'];
    })
	  this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    
    this.getAluminiList('','')
	  this.displayCourseList();
  }
  /** Function name: displayCourseList
   * Data bind in course list dropdown filter
   * 
   */
   displayCourseList(){
	try{
      this.SpinnerService.show(); 
	  
      this.model.course='';
	    this.model.standard='';
	    this.model.teaching_class='';
      this.baseService.getData('ei/course-list/').subscribe(res => {
        let response:any={};
        response=res;
        // if(response.status == true){
		    this.courseList=response.results;
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
		 this.model.standard='';
		//this.model.course_id='';
    this.model.teaching_class='';
    let data:any={}
    
    data.course_id=courseId
	  this.baseService.getData('ei/standard-list/',data).subscribe(res => {
        this.SpinnerService.hide(); 
        let response:any={};
        response=res;
        // if(response.status == true){
		this.standardList=response.standarddata;
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
        objAlumniList.Gender=objData.gender=='C'?objData.gender+'('+objData.pronoun+')':objData.gender;
        objAlumniList.Age=objData.age?objData.age:'0';
        objAlumniList.Profession=objData.profession?objData.profession:'';
        objAlumniList.Tenure=objData.work_tenure?objData.work_tenure:'';
        objAlumniList.Duration=objData.workduration?objData.workduration:'0';
        objAlumniList.LastClassTaken=objData.class_name?objData.class_name:'';
        objAlumniList.VerificationStatusByEI=objData.approved=="1"?'Approved':'Unapproved';
        objAlumniList.EKYCVerificationStatus=objData.kyc_approved=='1'?'Complete':'Incomplete';
        objAlumniList.kyc_approved = objData.kyc_approved;
        objAlumniList.approved = objData.approved;
        objAlumniList.is_rejected = objData.is_rejected;
        objAlumniList.student_id = objData.user_id;
        objAlumniList.reason_reject = objData.reason_reject;
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
