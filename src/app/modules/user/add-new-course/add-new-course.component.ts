import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit {
  model: any = {}
  errorDisplay: any = {};
  pipe = new DatePipe('en-US');
  schoolId:any;
  constructor(private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.schoolId = params['school_id'];
      
    });
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
          alert(response.message);
          this.router.navigate(['user/add-more-course'], {queryParams: {'school_id':this.schoolId }});
          
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          alert(errorCollection);
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (e) {
    
    }
  }
}
