import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../../services/base/base.service';
declare var $: any;

export interface subAdminManagementElement {

  'SNo': number;
  courseName : string;
  durationOfCourse: string;
  startYear : number;
  endYear : string;
  noOfStandards: number;
  noOfClass: number;
  noOfStudents: number;
  noOfAlumni: number;

}

const ELEMENT_DATA: subAdminManagementElement[] = [];

@Component({
  selector: 'app-ei-manage-courses-details',
  templateUrl: './ei-manage-courses-details.component.html',
  styleUrls: ['./ei-manage-courses-details.component.css']
})
export class EiManageCoursesDetailsComponent implements OnInit {
  courseDetails:any;
  model:any={};
  editModel:any={};
  editStModel:any={};
  editClassModel:any = {};
  month:any=[];
  year:any=[];
  pageSize: any = 1;
  totalNumberOfPage: any = 10;
  config: any;
  courseList:any;
  standardList:any;
  classList:any=[];
  classStandardList:any=[];
  lengthOfStandard:any=0
  collection = { count: 60, data: [] };
  check=0;
  displayedColumns: string[] = ['SNo', 'courseName','startYear', 
  'endYear','durationOfCourse','noOfStandards','noOfClass',
  'noOfStudents','noOfAlumni','action'];

  dataSource = ELEMENT_DATA;
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  // dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private router: Router,
    private baseService:BaseService,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    private activeRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
    
    this.activeRoute.queryParams.subscribe(params => {
      var id = params['id'];
      this.model.course_id = id;
      this.getCourseById(id);
      this.getCourseListDetails('','');
    });
   
    //this.getCourseList('','');
     	/*************************Year and month Loop*****************/
	var i=1;
	for(i=1;i<=12;i++)
	{
		this.month.push(i);
	}
	 
	for(i=this.eiService.globalYear;i<=this.eiService.globalCurrentYear;i++)
	{
		this.year.push(i);
	}
	/*************************************************************/

  }
   
  getstandardList(standard){
    this.standardList=standard;
    this.standardList.forEach(element => {
      this.getClassList(element.class_lists,element)
    });
   // 
  }
 
  getClassList(classList,standard){
   
    var st_name='';
   
    classList.forEach(element => {
      if(standard.standard_name!=st_name){
        element.class_count =   standard.num_of_class;
      }else{
        element.class_count =0;
      }
    st_name=element.standard_name;
    this.classList.push(element);
   });
   console.log(this.classList);
  }
/**get Standard by id */
getStandardById(id){
  try {
        
    this.SpinnerService.show();
    this.baseService.getData('ei/get-standard-by-id/'+id+'/').subscribe(res => {

      let response: any = {};
      response = res;
      this.editStModel = response.data;
      $("#editStandardModel").modal({
        backdrop: 'static',
        keyboard: false
       });
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);
    });
    
  } catch (e) {
    this.SpinnerService.hide();
  }
}

/**Put Data Of Standard */

editStandard(id){
  try {
        
    this.SpinnerService.show();
    this.baseService.actionForPutMethod('ei/get-standard-by-id/'+id+'/',this.editStModel).subscribe(res => {

      let response: any = {};
      response = res;
      this.getCourseListDetails('','');
      $("#editStandardModel").modal("hide");
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);
    });
    
  } catch (e) {
    this.SpinnerService.hide();
  }
}
/**get SubSection by id */
/**get Standard by id */
getClassById(id){
  try {
    this.editClassModel={};
    this.SpinnerService.show();
    this.baseService.getData('ei/get-class-by-id/'+id+'/').subscribe(res => {

      let response: any = {};
      response = res;
      this.editClassModel = response.data;
      $("#editClassModel").modal({
        backdrop: 'static',
        keyboard: false
       });
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);
    });
    
  } catch (e) {
    this.SpinnerService.hide();
  }
}
editClassById(id){
  try {
        
    this.SpinnerService.show();
    this.baseService.actionForPutMethod('ei/get-class-by-id/'+id+'/',this.editClassModel).subscribe(res => {

      let response: any = {};
      response = res;
      this.getCourseListDetails('','');
      $("#editClassModel").modal('hide');
    }, (error) => {
      this.SpinnerService.hide();
      console.log(error);
    });
    
  } catch (e) {
    this.SpinnerService.hide();
  }
}
  /**get course by id */
  getCourseById(id){
    
      try {
       
        
        this.SpinnerService.show();
        this.baseService.getData('ei/get-course-by-id/'+id+'/').subscribe(res => {
  
          let response: any = {};
          response = res;
          this.editModel = response.data;
         
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
        });
        
      } catch (e) {
        this.SpinnerService.hide();
      }
     
      
    
  }
  /**Edit Course Data */
  openModel(modelname){
    if(modelname=='course'){
      $("#editCourseModel").modal({
        backdrop: 'static',
        keyboard: false
    });
      
    }
  }
  editCourse(){
    try {
      
      this.SpinnerService.show();
      this.baseService.actionForPutMethod('ei/get-course-by-id/'+this.activeRoute.snapshot.paramMap.get('id')+'/', this.editModel).subscribe(res => {

        let response: any = {};
        response = res;
        this.getCourseListDetails('','');
        $("#editCourseModel").modal("hide");
        this.SpinnerService.hide();
        // if(response.status == 'true'){
         
        // }else{
        //   this.SpinnerService.hide();
        // }
        
       
      }, (error) => {
        this.SpinnerService.hide();
         
      });
      
    } catch (e) {
      this.SpinnerService.hide();
    }
   
    
  }
  getCourseListDetails(page, strFilter) {

    try {
      
      this.classList = [];
     // this.model.course_id=this.activeRoute.snapshot.paramMap.get('id');
      
      this.SpinnerService.show();

      this.baseService.getData('ei/list-of-course-by-ei/', this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        this.courseList = response.results;
        this.pageSize = response.page_size;
        this.totalNumberOfPage = response.count;
        let arrCourseList: any = [];
        
        if (!page) { page = 1 }
        var i = 1;
        this.config.itemsPerPage = this.pageSize
        this.config.currentPage = page
        this.config.totalItems = this.totalNumberOfPage

        this.courseList.forEach(objData => {
          let objCourseList: any = {};
          objCourseList.SNo = i;
          objCourseList.courseName = objData.course_name;
          objCourseList.course_id = objData.course_id;
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
        if(!this.courseList[0].standard_list)
        {

        }else{
          this.getstandardList(this.courseList[0].standard_list);
          this.lengthOfStandard=this.courseList[0].standard_list.length;
        }
        
        this.dataSource=arrCourseList;
        this.courseDetails = response.results;
       
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
