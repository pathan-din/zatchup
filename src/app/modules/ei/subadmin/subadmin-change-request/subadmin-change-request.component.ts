import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';

declare var $: any;
export interface PeriodicElement {
  position: number;
  name: string;
  zatchupid: string;
  classalias: string;
  fieldChange: string;
  oldDetails: string;
  newDetails: string;
  viewAttachments: string;
  status: string;
  remarks: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-subadmin-change-request',
  templateUrl: './subadmin-change-request.component.html',
  styleUrls: ['./subadmin-change-request.component.css']
})
export class SubadminChangeRequestComponent implements OnInit {
  startIndex:any;
  requestStatusList:any;//,'action'
  displayedColumns: string[] = ['position','name','zatchupid', 'fieldChange', 'oldDetails', 'newDetails',
  'status','action'];   

  dataSource = ELEMENT_DATA;
  pageSize:any=1;
  totalNumberOfPage:any=10;
  config: any;
  collection = { count: 60, data: [] };
  model:any={};
  modelReason: any={};
  error: any[];
  errorDisplay: any={};

  constructor(
    private baseService: BaseService,
    private validationService: GenericFormValidationService,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private alert: NotificationService,
    private router: Router,
    private location : Location,
    private confirmBox:ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
    };
  this.getViewChangesRequestStatus('');
  }

  getViewChangesRequestStatus(page){
    
    try {
      let data:any={};
      if(page){
        data=this.model;
        data.page= page 
      }else{data=this.model;}
      this.loader.show();
      this.baseService.getData('user/get-request-changing-for-panding-subadmin',data).subscribe(res=>{
       let responce :any={};
       responce = res;
       this.pageSize=responce.page_size;
       this.model.page_size=this.pageSize;
       this.totalNumberOfPage=responce.count;
       this.config.itemsPerPage=this.pageSize
       this.config.currentPage=page
       this.config.totalItems=this.totalNumberOfPage
       if(responce.status==false){
         this.loader.hide();
         
         return;
       }
       this.loader.hide();
      
       if(!page){page=1;}
       var i= (this.pageSize*(page-1))+1;
       this.startIndex = i;
       let arrDataList:any=[];
       responce.results.forEach(objData=>{
         let objList:any={};
       
         objList.position=i;
         objList.name=objData.first_name + ' '+objData.last_name;
         objList.zatchupid=objData.zatchupId;
         objList.class_alias=objData.class_alias;
         objList.request_id=objData.id;
         objList.fieldChange=objData.field_name.replace(/_/g, ' ').charAt(0).toUpperCase()+objData.field_name.replace(/_/g, ' ').slice(1);
         objList.oldDetails=objData.old_value;
         objList.newDetails=objData.new_value;
          
         objList.status=objData.approved?'Accepted':'Pending';
         
         objList.action='';
         arrDataList.push(objList);
        })
        this.dataSource = arrDataList;
       
       
      },(error)=>{
       this.loader.hide();
       this.alert.error("Something went wrong",'Error');
      })
     } catch (e) {
      this.loader.hide();
      this.alert.error(e,'Error');
     }
  }
  approveRequest(id){
    this.confirmBox.confirmThis('Are you sure you want to approve this request ?', () => {
      this.loader.show()
      this.baseService.action('ei/approved-subadmin-request-changed/', { "request_id": id}).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.error.message[0], "Success")
            this.getViewChangesRequestStatus('')
            // this.router.navigate(['ei/student-management']); 
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
  
  goBack(): void{
    this.location.back()
  }

  openRejectModel(id){
    console.log(id);
    
    this.modelReason.request_id = id;
    
    
    
  }
  closeRejectModel(){
    $("#rejectModel").modal('hide');
  }
  rejectCourse() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      
      /***************Merge dob after all selected dropdown *****************/
      //this.model.profile.dob=this.yearModel+'-'+this.monthModel+'-'+this.dateModel;
      /**********************************************************************/
      //ei/reject-course-by-ei/
      this.baseService.action('ei/reject-subadmin-request-change/',this.modelReason).subscribe(res => {

        let response: any = {};
        response = res;

        if (response.status === true)// Condition True Success 
        {
          this.closeRejectModel();
          this.alert.success(response.error.message, 'Success')
          this.getViewChangesRequestStatus('')
          // this.router.navigate(['ei/student-management']); 
        } else { // Condition False Validation failure
          this.loader.hide();
          this.alert.error(response.error.message, 'Error')
          // var errorCollection = '';
          // for (var key in response.error) {
          //   if (response.error.hasOwnProperty(key)) {
          //     errorCollection = errorCollection + response.error[key][0] + '\n'

          //   }
          // }
          // this.alert.error(errorCollection,"Error");

        }

        /*End else*/
        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.loader.hide();
        //console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      //console.log(err);
    }
  }

}
