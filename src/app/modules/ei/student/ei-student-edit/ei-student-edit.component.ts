import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from '../../../../services/notification/notification.service';
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
  constructor(
    private alert:NotificationService,
    private router: Router, 
    private route: ActivatedRoute,
    private loader: NgxSpinnerService, 
    public eiService: EiServiceService,
    private location: Location,
    private genericFormValidationService: GenericFormValidationService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.model.studentId = params['stId'];
      this.modelEdit.studentId = params['stId'];
      this.modelEdit.roll_no = this.model.roll_no;
      this.modelEdit.admission_no = this.model.userID;
      this.is_approve=params['approve']
      this.getStudent()
    });
    console.log('returnUrl....',JSON.parse(this.route.snapshot.queryParamMap.get('returnUrl')))
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
        this.loader.show();
        this.classList = [];
        
        this.eiService.displayClassList(stId).subscribe(res => {
          this.loader.hide();
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
          this.loader.hide();
          //console.log(error);

        });
      }else{this.classList=[];}

    } catch (err) {
      this.loader.hide();
      //console.log(err);
    }
  }
  getStudent() {
    try {

      this.loader.show();
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/

      this.eiService.getStudent(this.modelEdit.studentId).subscribe(res => {

        let response: any = {};
        response = res;
        //this.model=response;
        if (response.status == true) {
          this.loader.hide();
          this.model = response.data;

        } else {
         
        }

      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
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


      this.loader.show();
      this.eiService.editStudent(formData, this.modelEdit.studentId).subscribe(
        (res: any) => {
       
        this.router.navigate(['ei/student-management']);
       
      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
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
  goBack(){
    this.location.back()
  }

}