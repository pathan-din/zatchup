import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-starclass-lecture-upload',
  templateUrl: './ei-starclass-lecture-upload.component.html',
  styleUrls: ['./ei-starclass-lecture-upload.component.css']
})
export class EiStarclassLectureUploadComponent implements OnInit {
  errorDisplay: any = {};
  model: any = {};
  filename: string;
  uploadedContent: File;
  params: any;
  action: any;
  lecture: any;
  levelOfEducation: any;
  constructor(
    private baseService: BaseService,
    private router: Router,
    private location : Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validation: GenericFormValidationService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.action = this.activeRoute.snapshot.queryParamMap.get('action');
    console.log('action is as ::', this.action)
    if (this.action == 'edit')
      this.getLectureDetails()
  }

  handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent = fileData;
    console.log(this.uploadedContent);
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validation.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  getLectureDetails() {
    try {
      this.loader.show()
      
      console.log(this.model);
   
      this.baseService.getData('starclass/ei_lecture_detail/' + this.activeRoute.snapshot.params.id).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.model = res.data;
          }
          else {
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err => {
          this.alert.error(err, 'Error')
          this.loader.hide()
        })
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  uploadLecture() {
    try {
      this.errorDisplay={};
      this.errorDisplay=this.validation.checkValidationFormAllControls(document.forms[0].elements,false,[]);
      
      if(this.errorDisplay.valid)
      {
        return false;
      }
      
      this.loader.show()
      var url = 'starclass/ei_lecture_upload/';

      if (this.model.id) {
        url = 'starclass/ei_lecture_edit/';

      }
      const formData = new FormData();
      // debugger
      console.log(formData);
      //  this.action = this.activeRoute.snapshot.queryParamMap.get('action');
      formData.append('lecture_title', this.model.lecture_title);
      formData.append('lecture_description', this.model.lecture_description);
      formData.append('name_of_teaching_faculty', this.model.name_of_teaching_faculty);
      formData.append('topic_cover', this.model.topic_cover);
      // let content = this.uploadedContent ? this.uploadedContent : this.model.lecture
      // formData.append('lecture', content);
      if(this.uploadedContent){
        formData.append('lecture', this.uploadedContent);
      }
      if (this.action == 'edit'){
        formData.append('id', this.activeRoute.snapshot.params.id);
      }
      else{
        formData.append('course', this.activeRoute.snapshot.params.id)
      }
      this.baseService.action(url, formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
            this.location.back()
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, err => {
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
