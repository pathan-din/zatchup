import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-information-and-bank',
  templateUrl: './information-and-bank.component.html',
  styleUrls: ['./information-and-bank.component.css']
})
export class InformationAndBankComponent implements OnInit {
  bankDetails: any
  model:any={};
  title:any;
  constructor(
    private baseService: BaseService,
    private validationService: GenericFormValidationService,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private alert: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getBankDetails()
  }

  getBankDetails() {
    
    this.baseService.getData('ei/ei-bank-detail/').subscribe(
      (res: any) => {
        console.log('info is as ::',res)
        if (res.status == true) {
          this.bankDetails = res.data
        }
      }
    )
  }
  openChangeDetailsPopup(label,key,value){
    this.model={};
     this.model.key = key;
     this.model.old_value =value;
     this.model.value = value;
     this.model.image = '';
     this.title = label;
     $("#editModel").modal({
      keyboard: false
    });
  }
  /**Edit Data for personal information */
  editDetails(){
    console.log(this.model);
    
    if(this.model.value==''){
      
    }else if(this.model.image){

    }
  }
  /** 
   * Function Name : fileUploadDocument
  */
 fileUploadDocument(files) {
  let fileList: FileList = files;
  let fileData: File = fileList[0];
  if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
    this.loader.hide();
    this.alert.error("File format not supported", 'Error');
    return
  }
  const formData = new FormData();
  formData.append('file_name', fileData);
  try {
    this.loader.show();
    this.eiService.uploadFile(formData).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.loader.hide();
          this.model.image = res.filename;
          return res.filename;
        } else {
          this.loader.hide();
          var collection = this.eiService.getErrorResponse(this.loader, res.error);
          this.alert.error(collection, 'Error')
          return '';
        }
      }, (error) => {
        this.loader.hide();
        this.alert.error(error.message, 'Error')
        return '';
      });
  } catch (err) {
    this.loader.hide();
    this.alert.error(err, 'Error')
  }
}
}
