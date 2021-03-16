import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-star-class-course-add',
  templateUrl: './admin-star-class-course-add.component.html',
  styleUrls: ['./admin-star-class-course-add.component.css']
})
export class AdminStarClassCourseAddComponent implements OnInit {
  planDetails: any = [];
  model: any = {};
  uploadedContent: File;
  filename: string;
  uploadedImage: File;
  uploadedContent_image: File;
  errorDisplay : any = {};
  courseDetails: any;

  constructor(
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private validation: GenericFormValidationService,
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.getPlanList()
    if(this.activeRoute.snapshot.queryParamMap.get('id')){
      this.getCourseDetails()
    }
    
  }

  // getPlanList(){
  //    try {
  //     this.loader.show()
  //     this.baseService.getData('starclass/plan_list/', this.model).subscribe(
  //       (res: any) =>{
  //         if(res.status == true){
  //           this.planDetails = res.results
  //           console.log(this.planDetails);

  //         }
  //         else{
  //           this.alert.error(res.error.message, 'Error')
  //         } 
  //         this.loader.hide()
  //       },
  //       err => {
  //         this.alert.error(err, 'Error')
  //         this.loader.hide()
  //       }
  //     )
  //   } catch (error) {
  //     this.alert.error(error.error, 'Error')
  //   }
  // }
  //  setPriceAllPlan(objPlan){
  //   console.log(objPlan);
    
  //  }

  //  submitCourse(){
  //    this.model.plan= this.planDetails
  //    console.log(this.model);
     
  //  }

   handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent = fileData;
    console.log(this.uploadedContent);
  }

  handleFileImage(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent_image = fileData;
    console.log(this.uploadedContent_image);
  }
  
  getCourseDetails(){
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.queryParamMap.get('id')
      }
      console.log(params);
      
      this.baseService.getData('starclass/course_preview/' , params).subscribe(
        (res:any) => {
          if(res.status == true){
            this.model = res.results[0]
            console.log(this.model);
          }
          else{
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err =>{
          this.alert.error(err, 'Error')
          this.loader.hide()
        } )
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  createCourse(){
    try {
      this.errorDisplay={};
      this.errorDisplay=this.validation.checkValidationFormAllControls(document.forms[0].elements,false,[]);
      if(this.errorDisplay.valid)
      {
        return false;
      }
      this.loader.show()
      var url='starclass/star-class-course-admin/';
      
      if(this.model.id){
        url = 'starclass/edit-course/';
         
      }
      const formData = new FormData();
      formData.append('id', this.activeRoute.snapshot.queryParamMap.get('id'));
      formData.append('course_name', this.model.course_name);
      formData.append('level_of_education', this.model.level_of_education);
      formData.append('course_preview', this.uploadedContent);
      formData.append('course_image', this.uploadedContent_image);
      formData.append('field', this.model.field);
      formData.append('standard', this.model.standard);
      formData.append('subject', this.model.subject);
      formData.append('faculty_details', this.model.faculty_details)
      formData.append('topic_cover', this.model.topic_cover)
      formData.append('description', this.model.description)
      this.baseService.action(url, formData).subscribe(
        (res : any) =>{
          if(res.status == true){
            this.alert.success(res.message, 'Success')
            this.location.back()
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, 
        err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      )
        console.log(this.model);
        console.log(formData);
        
        
    } catch (error) {
      this.alert.error(error.error, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }
}
