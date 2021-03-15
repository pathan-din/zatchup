import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-lecture-upload',
  templateUrl: './lecture-upload.component.html',
  styleUrls: ['./lecture-upload.component.css']
})
export class LectureUploadComponent implements OnInit {
  errorDisplay: any ={};
  model: any = {};
  filename: string;
  uploadedContent: File;
  params: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert:NotificationService,
    private loader: NgxSpinnerService,
    private validation: GenericFormValidationService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent = fileData;
    console.log(this.uploadedContent);
  }

  uploadLecture(){
    try {
      // this.errorDisplay={};
      // this.errorDisplay=this.validation.checkValidationFormAllControls(document.forms[0].elements,false,[]);
      // if(this.errorDisplay.valid)
      // {
      //   return false;
      // }
      this.loader.show()
     
      
      const formData = new FormData();
      // debugger
      console.log(formData);
      formData.append('lecture_title', this.model.lecture_title);
      formData.append('lecture_description', this.model.lecture_description);
      formData.append('name_of_teaching_faculty', this.model.name_of_teaching_faculty);
      formData.append('lecture', this.uploadedContent);
      formData.append('course', this.activeRoute.snapshot.params.id)
      this.baseService.action('starclass/lecture-upload/', formData).subscribe(
        (res: any)=>{
          if(res.status == true){
            this.alert.success(res.message, 'Success')
            this.location.back()
          }
          else{
            this.alert.error(res.error.message, 'Error')
          } 
          this.loader.hide()
        }, err =>{
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      )
    } catch (error) {
      this.alert.error(error.error, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }
}
