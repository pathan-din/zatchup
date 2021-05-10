import { Location } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-starclass-course-add',
  templateUrl: './ei-starclass-course-add.component.html',
  styleUrls: ['./ei-starclass-course-add.component.css']
})
export class EiStarclassCourseAddComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  planDetails: any = [];
  model: any = {};
  uploadedContent: File;
  filename: string;
  uploadedImage: File;
  uploadedContent_image: File;
  errorDisplay: any = {};
  courseDetails: any;
  action: any;
  // url: any

  constructor(
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private validation: GenericFormValidationService,
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.action = this.activeRoute.snapshot.queryParamMap.get('action');
    if (this.action == 'edit')
      this.getCourseDetails()
  }

  handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    if (fileData.type !== 'video/mp4') {
      this.loader.hide();
      this.alert.error("File format not supported", 'Error');
      this.myInputVariable.nativeElement.value = '';
      return
    }
    this.filename = fileData.name;
    this.uploadedContent = fileData;
    // var reader = new FileReader();
    // reader.readAsDataURL(fileData);
    // reader.onload = (event) => {
    //   console.log('course_preview is as ::',this.model.course_preview)
    //   this.model.course_preview = ''
    //   this.model.course_preview = (<FileReader>event.target).result;
    //   console.log('url is as ::',this.model.course_preview)
    // }
  }

  handleFileImage(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent_image = fileData;
    console.log(this.uploadedContent_image);
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validation.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  getCourseDetails() {
    try {
      this.loader.show()
      let params = {
        "id": this.activeRoute.snapshot.queryParamMap.get('id')
      }
      console.log(params);

      this.baseService.getData('starclass/ei_course_preview/', params).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.model = res.results[0]
            console.log(this.model);
          }
          else {
            this.alert.error(res.error.message, 'Error')
          } this.loader.hide()
        }, err => {
          this.alert.error("Please try again.", 'Error')
          this.loader.hide()
        })
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  createCourse() {
    try {
      this.errorDisplay = {};
      this.errorDisplay = this.validation.checkValidationFormAllControls(document.forms[0].elements, false, []);
      if (this.errorDisplay.valid) {
        return false;
      }
      this.loader.show()
      var url = 'starclass/ei-course-create/';
      if (this.model.id) {
        url = 'starclass/ei-course-edit/';
      }
      const formData = new FormData();
      if (this.action == 'edit') {
        formData.append('id', this.activeRoute.snapshot.queryParamMap.get('id'));
      }
      formData.append('course_name', this.model.course_name);
      formData.append('level_of_education', this.model.level_of_education);
      if (this.uploadedContent) {
        formData.append('course_preview', this.uploadedContent);
      }

      if (this.uploadedContent_image) {
        formData.append('course_image', this.uploadedContent_image);
      }

      // let audience = [{"user_id":944,"permission_type":"edit"}]
      //  let audience=  JSON.stringify([{"user_id":944,"permission_type":"edit"}]);
      //   formData.append('audience',audience);
      formData.append('field', this.model.field);
      formData.append('standard', this.model.standard);
      formData.append('subject', this.model.subject);
      formData.append('faculty_details', this.model.faculty_details)
      formData.append('topic_cover', this.model.topic_cover)
      formData.append('description', this.model.description)
      this.baseService.action(url, formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
            if (this.action == 'add') {
              this.router.navigate(['ei/star-class-courses-uploaded-by-ei'])
            } else {
              this.location.back()
            }
          }
          else {
            this.alert.error(res.message, 'Error')
          }
          this.loader.hide()
        },
        err => {
          this.alert.error("Please try again.", 'Error')
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
