import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';


export interface UnVerifiedAlumniListElement {

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

const ELEMENT_DATA: UnVerifiedAlumniListElement[] = [
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
    VerificationStatusByEI: 'unverified', 
    EKYCVerificationStatus :'complete',
    Action: ''
}
  
];

@Component({
  selector: 'app-ei-unverified-alumni',
  templateUrl: './ei-unverified-alumni.component.html',
  styleUrls: ['./ei-unverified-alumni.component.css']
})

export class EiUnverifiedAlumniComponent implements OnInit {
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
  // alert: any;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(
    private genericFormValidationService:GenericFormValidationService,
    private router: Router, 
    private alert: NotificationService,
    private SpinnerService: NgxSpinnerService,
    public baseService:BaseService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    this.model.gender='';
    this.model.profession='';
    this.model.approved='';
    this.model.kyc_approved='';
    this.model.page_size=''
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
          this.courseList=response.results;
          
          },(error) => {
            this.SpinnerService.hide(); 
            //console.log(error);
            
          });
      }catch(err){
        this.SpinnerService.hide(); 
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
      this.standardList=response.standarddata;
          
          },(error) => {
            this.SpinnerService.hide(); 
            //console.log(error);
            
          });
      }catch(err){
        this.SpinnerService.hide(); 
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
        this.baseService.getData('ei/unverified-alumni/',data).subscribe(res => {
        let response:any={};
        response=res;
        this.SpinnerService.hide(); 
      
        this.aluminiList=response.results;
        this.pageSize=response.page_size;
        this.model.page_size=this.pageSize;
        this.totalNumberOfPage=response.count;
        this.config.itemsPerPage=this.pageSize
        this.config.currentPage=page
        this.config.totalItems=this.totalNumberOfPage
        let arrAlumniList:any=[];
        
        var i=1;
        this.aluminiList.forEach(objData=>{
          let objAlumniList:any={};
          objAlumniList.SNo=i;
          objAlumniList.ZatchUpID=objData.zatchup_id;
          objAlumniList.Name=objData.first_name+ ' '+objData.last_name;
          objAlumniList.Gender=objData.gender;
          objAlumniList.Age=objData.age?objData.age:'';
          objAlumniList.Profession=objData.profession?objData.profession:'';
          objAlumniList.Tenure=objData.tenure?objData.tenure:'';
          objAlumniList.Duration=objData.duration?objData.duration:'';
          objAlumniList.LastClassTaken=objData.lastclasstaken?objData.lastclasstaken:'';
          objAlumniList.VerificationStatusByEI=objData.approved=='1'?'Approved':'Unapproved';
          objAlumniList.EKYCVerificationStatus=objData.kyc_approved=='1'?'Complete':'Incomplete';
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

    /**
     * Export
     */
    getExportData(){
      try {
        let params:any=[];
        params['export_csv'] = true
        this.baseService.generateExcel('ei/export-unverifiedalumni-by-ei/', 'unveryfy-alumni-list', params)
      
        
      } catch (error) {
        console.log(error)
      }
    }
  
}
