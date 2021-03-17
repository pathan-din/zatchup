import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LectureDetailsEdit } from '../modals/education-institute.modal';

@Component({
  selector: 'app-lecture-upload',
  templateUrl: './lecture-upload.component.html',
  styleUrls: ['./lecture-upload.component.css']
})
export class LectureUploadComponent implements OnInit {
  lectureDetailsEdit: LectureDetailsEdit
  errorDisplay: any = {};
  model: any = {};
  filename: string;
  uploadedContent: File;
  params: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validation: GenericFormValidationService,
    private activeRoute: ActivatedRoute
  ) {
    this.lectureDetailsEdit = new LectureDetailsEdit()
  }

  ngOnInit(): void {
    let action = this.activeRoute.snapshot.queryParamMap.get('action');
    console.log('action is as ::', action)
    if (action == 'edit')
      this.getLectureList()
  }

  handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent = fileData;
    console.log(this.uploadedContent);
  }

  getLectureList() {
    try {
      this.loader.show()
      this.model = {
        'id': this.activeRoute.snapshot.params.id,
      }
      this.baseService.getData('starclass/lecture-detail/' + this.activeRoute.snapshot.params.id).subscribe(
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
      // this.errorDisplay={};
      // this.errorDisplay=this.validation.checkValidationFormAllControls(document.forms[0].elements,false,[]);
      // if(this.errorDisplay.valid)
      // {
      //   return false;
      // }
      this.loader.show()
      var url = 'starclass/lecture-upload/';

      if (this.model.id) {
        url = 'starclass/lecture-edit/';

      }
      const formData = new FormData();
      // debugger
      console.log(formData);
      let action = this.activeRoute.snapshot.queryParamMap.get('action');
      formData.append('lecture_title', this.model.lecture_title);
      formData.append('lecture_description', this.model.lecture_description);
      formData.append('name_of_teaching_faculty', this.model.name_of_teaching_faculty);
      formData.append('topic_cover', this.model.topic_cover);
      formData.append('lecture', this.uploadedContent);
      if (action == 'edit'){
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

  goBack() {
    this.location.back()
  }
}
