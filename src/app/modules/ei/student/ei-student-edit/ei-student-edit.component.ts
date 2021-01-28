import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MatCheckboxChange } from '@angular/material/checkbox';
declare var $: any;

@Component({
  selector: 'app-ei-student-edit',
  templateUrl: './ei-student-edit.component.html',
  styleUrls: ['./ei-student-edit.component.css']
})
export class EiStudentEditComponent implements OnInit {
  model: any = {};
  modelEdit: any = {};
  error: any = [];
  errorDisplay: any = {};
  uploaded: any = '';
  classList: any = [];
  is_approve:any;
  class_edit:boolean=false;
  constructor(private genericFormValidationService: GenericFormValidationService,
    private alert:NotificationService,
    private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService, public eiService: EiServiceService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.router)
    this.route.queryParams.subscribe(params => {
      this.model.studentId = params['stId'];
      this.modelEdit.studentId = params['stId'];
      this.modelEdit.roll_no = this.model.roll_no;
      this.modelEdit.admission_no = this.model.userID;
      this.is_approve=params['approve']
      this.getStudent()

    });

  }

  showOptionsMark(event:MatCheckboxChange): void {
   if(event.checked){
    this.class_edit = false;
    this.model.mark_as_alumni=true;
   }
  }
  showOptions(event:MatCheckboxChange): void {
    if(event.checked){
     this.class_edit = true;
     this.model.mark_as_alumni=false;
    }
   }

  displayClassList(stId, check) {
    try {
      
      
      if (check) {
        this.SpinnerService.show();
        this.classList = [];
        
        this.eiService.displayClassList(stId).subscribe(res => {
          this.SpinnerService.hide();
          let response: any = {};
          response = res;
          let checkValue:boolean=false;
          this.classList = response.classdata;
          var i =0;
          this.classList.forEach(element => {
              if(element.id==this.model.class_id)
              {
                checkValue=true;
              }else{
                checkValue=false;
              }
              this.classList[i].check=checkValue;
              i=i+1;
            });
            console.log(this.classList);
            
        }, (error) => {
          this.SpinnerService.hide();
          //console.log(error);

        });
      }else{this.classList=[];}

    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  getStudent() {
    try {

      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/

      this.eiService.getStudent(this.modelEdit.studentId).subscribe(res => {

        let response: any = {};
        response = res;
        //this.model=response;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.model = response.data;

        } else {
          //this.SpinnerService.hide(); 
          // if(response.error)
          // {
          // this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService, response.error)
          // this.alert.error(this.errorDisplay.message,'Error')
          // }else{
          //   this.alert.error(response.message[0],'Error')
          // }
          
        }

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  editStudent() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      const formData = new FormData();
      formData.append('roll_no', this.model.roll_no);
      formData.append('admission_no', this.model.admission_no);
      formData.append('profile_pic', this.uploaded);
      if (this.model.mark_as_alumni) {
        formData.append('mark_as_alumni', this.model.mark_as_alumni);
      }
      formData.append('class_id', this.model.class_id);


      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/

      this.eiService.editStudent(formData, this.modelEdit.studentId).subscribe(res => {

        let response: any = {};
        response = res;
        this.router.navigate(['ei/student-verified-list']);
        // if(response.status===true)// Condition True Success 
        // {
        // //alert(response.message)

        // }else{ // Condition False Validation failure
        // this.SpinnerService.hide(); 
        // var errorCollection='';
        // for (var key in response.error) {
        // if (response.error.hasOwnProperty(key)) {
        // errorCollection = errorCollection+response.error[key][0]+'\n'

        // }
        // }
        // alert(errorCollection);

        // }

        /*End else*/
        //this.router.navigate(['userWeb/userSignUp']);
      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }

  }
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }

  }
  handleCancelChequeFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploaded = fileData;
    console.log(this.uploaded);

  }


}