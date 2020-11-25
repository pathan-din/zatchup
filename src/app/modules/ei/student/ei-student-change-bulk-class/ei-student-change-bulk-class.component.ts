import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-ei-student-change-bulk-class',
  templateUrl: './ei-student-change-bulk-class.component.html',
  styleUrls: ['./ei-student-change-bulk-class.component.css']
})
export class EiStudentChangeBulkClassComponent implements OnInit {
  error:any=[];
  errorDisplay:any={};
  courseList:any;
  classDataList:any=[];
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService:EiServiceService,
    public baseService:BaseService,
    public formBuilder: FormBuilder,
    private genericFormValidationService:GenericFormValidationService) { }

  ngOnInit(): void {
    this. getUploadClassesIds();
  }
  /**
   * Get Class Ids for bulk upload 
   * 
   */

   getUploadClassesIds(){
     try {
      this.baseService.getData('ei/class-id-of-course-by-ei/').subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();	
       this.courseList = response.results;
       if(this.courseList.length>0)
       {
         var i=1;
        this.courseList.forEach(element => {
          element.standarddata.forEach(newelement => {
            newelement.classdata.forEach(elements => {
              elements.standarddata = newelement;
              elements.coursedata = element;
              elements.standardcount = element.standarddata.length;
              elements.classcount = newelement.classdata.length;
              this.classDataList.push(elements);   
            });
            
          });
        });
        //
       }
       console.log( this.classDataList);
       
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
  
      });
     } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
     }
   }
  
  ///
  uploadXlsSheet(file){
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    try{
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append('upload_student_file',fileData);
      this.eiService.uploadBulkStudent(formData).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();	
          alert(response.message[0]);
        } else {
          //this.SpinnerService.hide();
          this.errorDisplay=this.eiService.getErrorResponse(this.SpinnerService,response.error);
          alert(this.errorDisplay.message);
        }
  
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);
  
      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("vaeryfy Otp Exception", err);
    }
    
    
}
}
