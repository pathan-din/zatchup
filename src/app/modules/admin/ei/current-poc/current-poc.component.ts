import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CurrentPocDetails, PastPocDetails} from '../modals/education-institute.modal';

@Component({
  selector: 'app-current-poc',
  templateUrl: './current-poc.component.html',
  styleUrls: ['./current-poc.component.css']
})

export class CurrentPocComponent implements OnInit {
  @ViewChild('closeModel') closeModel: ElementRef;
  pastPocDetails: PastPocDetails;
  currentPocDetails: CurrentPocDetails
  dataSource: any;
  ei_id: any;
  response: any;
  filterFromDate: any;
  filterToDate: any;
  maxDate: Date;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
    ) { 
      this.currentPocDetails = new CurrentPocDetails
      this.pastPocDetails = new PastPocDetails;
      this.maxDate = new Date();
    }

  ngOnInit(): void {
     this.ei_id = this.route.snapshot.params.ei_id;
     this.getCurrentPocDetails();
    this.getPastPocDetails();
  }

  getPastPocDetails(page? : any){
    this.loader.show();

    this.pastPocDetails.params = {
      'page' : page ,
      'page_size': this.pastPocDetails.page_size,
      'ei_id': this.ei_id,
      'start_date': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
    }
    this.baseService.getData('admin/get_poc_details_history_based_on_ei/', this.pastPocDetails.params).subscribe(
      (res : any) =>{
        if(res.status == true){
          if (!page)
          page = this.pastPocDetails.config.currentPage
        this.pastPocDetails.startIndex = res.page_size * (page - 1) + 1;
        this.pastPocDetails.config.itemsPerPage = res.page_size
        this.pastPocDetails.config.currentPage = page
        this.pastPocDetails.config.totalItems = res.count;
        if (res.count > 0) {
          this.pastPocDetails.dataSource = res.results;
        }
        else{
          this.pastPocDetails.dataSource = undefined
            this.pastPocDetails.pageCounts =undefined;
          }
        } else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  getCurrentPocDetails(){
    this.loader.show();
    this.currentPocDetails.params ={
      'ei_id': this.ei_id
    }
    this.baseService.getData('admin/get_poc_details_based_on_ei/', this.currentPocDetails.params).subscribe(
      (res: any) => {
        if(res.status == true)
        this.currentPocDetails.response = res.data
        else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  goBack(){
    this.location.back()
  }
  pocDetails(data) {

    
    this.currentPocDetails.model.fullName = data.full_name;
    // this.currentPocDetails.model.lastNAme = data.last_name;
    this.currentPocDetails.model.phone = data.phone;
    this.currentPocDetails.model.email = data.email;
    this.currentPocDetails.model.ei_id = parseInt(this.ei_id);
    this.currentPocDetails.model.employee_id = data.employee_id;
    this.currentPocDetails.model.poc_required = true;
    console.log('model data....',data)
  }

  changePoc() {
    // debugger
    // this.errorDisplay = {};
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }

    try {
      this.loader.show()
      // let data = this.currentPocDetails.model
      // data.date_of_birth = this.datePipe.transform(data.date_of_birth, 'yyyy-MM-dd')
      this.baseService.action('admin/get_poc_details_based_on_ei/', this.currentPocDetails.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success("Added successfully", "Success");
            this.closeModel.nativeElement.click();
            this.getCurrentPocDetails();
            this.getPastPocDetails();
            //this.router.navigate(['admin/subadmin-dashboard'])
          }
          else {
            if (res.error)
              this.alert.error(res.error.message, "Error")
            else{
              let error =  this.baseService.getErrorResponse(this.loader, res)
              this.alert.error(error, "Error")
            }
          }
          this.loader.hide()
        }
      ), err => {
        this.loader.hide()
      }
    }
    catch (e) {
      this.alert.error(e, "Error")
      // console.log("Something Went Wrong!")
    }
  }
}
