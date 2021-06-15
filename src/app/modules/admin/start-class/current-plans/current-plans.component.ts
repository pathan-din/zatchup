import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { PlanDetails } from '../../ei/modals/education-institute.modal';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-current-plans',
  templateUrl: './current-plans.component.html',
  styleUrls: ['./current-plans.component.css']
})
export class CurrentPlansComponent implements OnInit {
  @ViewChild('closecreateNewPlan') closecreateNewPlan: any;
  planDetails: PlanDetails
  dataSource :any = {} ;
  planName: any;
  validity: any;
  viewsPerLecture: any;
  model : any ={};
  errorDisplay : any = {};
  error: any[];
  message: any= {};
  constructor(
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validation: GenericFormValidationService,
    private confirmDialogService: ConfirmDialogService,
    ) { 
      this.planDetails = new PlanDetails()
    }
  ngOnInit(): void {
    this.getPlanDetails()
  }

  goBack(){
    this.location.back()
  }

  goToPlanHistory(){
    this.router.navigate(['admin/starclass-plan-history'])
  }
  editPlan(objModel){
    console.log(objModel);
    this.model=objModel;
    
  }
  createAndUpdatePlan(){
    try {
      this.errorDisplay={};
      this.errorDisplay=this.validation.checkValidationFormAllControls(document.forms[0].elements,false,[]);
      if(this.errorDisplay.valid)
      {
        return false;
      }
    
      this.loader.show()
      var url='starclass/plan/';
      
      if(this.model.id){
        url = 'starclass/edit-plan/';
         
      }
    this.baseService.action(url, this.model).subscribe(
      (res:any) =>{
        if(res.status == true){
          this.closecreateNewPlan.nativeElement.click();
          this.model = {};
          this.alert.success(res.message, 'Success');
          this.getPlanDetails()
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
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  getPlanDetails(page? : any){
    try {
      this.loader.show()
      this.planDetails.modal= {
        'page': page,
        'page_size': this.planDetails.page_size,
        'id': this.planDetails.id
      }
      this.baseService.getData('starclass/plan_list/', this.planDetails.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.planDetails.config.currentPage
          this.planDetails.startIndex = res.page_size * (page - 1) + 1;
          this.planDetails.page_size = res.page_size
          this.planDetails.config.itemsPerPage = this.planDetails.page_size
          this.planDetails.config.currentPage = page
          this.planDetails.config.totalItems = res.count;
          if (res.count > 0) {
            this.planDetails.dataSource = res.results;
            this.planDetails.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.planDetails.pageCounts = undefined;
            this.planDetails.dataSource = undefined
          }
          } else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        },
        err =>{
          this.alert.error(err, 'Error')
          this.loader.hide()
        }
      )
    } catch (error) {
      this.alert.error(error.error, 'Error')
    }
  }

  deletePlan(id: any ): any {
    this.model ={
      "id": id,
    }
   this.message = 'Are you sure you want to delete this Plan ?'
    this.confirmDialogService.confirmThis(this.message, () => {
      this.loader.show()
      this.baseService.action('starclass/plan_delete/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getPlanDetails('');
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }

  generateExcel() {
    delete this.planDetails.modal.page_size;
    delete this.planDetails.modal.page;
    this.planDetails.modal['export_csv'] = true
    this.baseService.generateExcel('starclass/export-csv/', 'my_order_list', this.planDetails.modal);
  }
}
