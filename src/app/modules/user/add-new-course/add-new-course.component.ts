import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../services/notification/notification.service';
import { EiServiceService } from 'src/app/services/EI/ei-service.service';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  model: any = {}
  errorDisplay: any = {};
  pipe = new DatePipe('en-US');
  schoolId:any;
  imageUrl:any='';
  checkincourse:boolean=false;
  title:any;
  constructor(private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private eiService:EiServiceService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem("checkincourse")=="true")
    {
      this.checkincourse=true;
    }
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      if(params['title']){
        this.title = params['title'];
      }
    });
    this.model.school_id = this.schoolId;
    this.getEiInfo(this.model);
  }


  getEiInfo(model) {
    try {
       this.SpinnerService.show();
      this.baseService.action("user/get-admission-number-detail-by-school/", model).subscribe((res: any) => {
        if (res.status == true) {
          this.SpinnerService.hide();
          this.model = res.data;
          // this.model.join_standard_id = res.data.join_standard_id
          // this.model.current_standard_id = res.data.current_standard_id
          // if (this.model.course_id) {
          //   this.model.existing_course_id = this.model.course_id;

          // }
          // this.model.comment = res.data.description;
          // this.model.school_id = this.schoolId;
          // this.displayClassList(res.data.join_standard_id);
          //this.displayClassList(res.data.current_standard_id);
        } else {
          this.SpinnerService.hide();
        }

      }, (error) => {
        this.SpinnerService.hide();
      })
    } catch (e) {
      this.SpinnerService.hide();
    }
  }

  /** 
   * Function Name : fileUploadDocument
  */
 fileUploadDocument(files, document) {
  let fileList: FileList = files;
  let fileData: File = fileList[0];
  if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
    this.SpinnerService.hide();
    this.alert.error("File format not supported", 'Error');
    this.myInputVariable.nativeElement.value = '';
    return
  }else{
     
    
  }
  const formData = new FormData();
  formData.append('file_name', fileData);
  try {
    this.SpinnerService.show();
    this.eiService.uploadFile(formData).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.SpinnerService.hide();
          this.imageUrl = this.eiService.imagePath+res.filename;
          return res.filename;
        } else {
          this.imageUrl =''
          this.SpinnerService.hide();
          var collection = this.eiService.getErrorResponse(this.SpinnerService, res.error);
          this.alert.error(collection, 'Error')
          return '';
        }
      }, (error) => {
        this.SpinnerService.hide();
        this.alert.error(error.message, 'Error')
        return '';
      });
  } catch (err) {
    this.SpinnerService.hide();
    this.alert.error(err, 'Error')
  }
}
editEi(schoolId){
  this.router.navigate(["user/add-ei"],{queryParams:{
    school_id:schoolId
  }});
}
  addCourseData(){
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    console.log(this.errorDisplay)
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      //
     this.model.school_id = this.schoolId;
      this.model.start_date=this.pipe.transform(this.model.start_date, 'yyyy-MM-dd');
      this.model.end_date=this.pipe.transform(this.model.end_date, 'yyyy-MM-dd');
      this.baseService.action('user/add-course-by-user/',this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success(response.message, 'Success')
          this.router.navigate(['user/add-more-course'], {queryParams: {'school_id':this.schoolId ,'title':this.title}});
          
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
         this.alert.error(errorCollection, 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (e) {
    
    }
  }
}
