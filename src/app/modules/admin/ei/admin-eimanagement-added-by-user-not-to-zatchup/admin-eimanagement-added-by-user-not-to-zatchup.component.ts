import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { notOnZatchup } from '../modals/ei-pending-approval.modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-eimanagement-added-by-user-not-to-zatchup',
  templateUrl: './admin-eimanagement-added-by-user-not-to-zatchup.component.html',
  styleUrls: ['./admin-eimanagement-added-by-user-not-to-zatchup.component.css'],
  providers: [DatePipe]
})
export class AdminEIManagementAddedByUserNotToZatchupComponent implements OnInit {

  notOnZatchup : notOnZatchup ;

  displayedColumns: string[] = ['position','schoolName', 'state','city', 'board','address', 'zatchUpID','addedBy',
  'messages','action'];  

  dataSource : any;
  maxDate: Date;
  filterFromDate: any;
  filterToDate: any;
  // dataSource = ELEMENT_DATA;
  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
    ) { 
      this.notOnZatchup = new notOnZatchup();
      this.maxDate = new Date();
    }

  ngOnInit(): void {
    this.getnotOnZatchup('');
    this.getAllStates();
  }

  getnotOnZatchup(page?:any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if(this.notOnZatchup.allStates && this.notOnZatchup.stateId){
      cityFind= this.notOnZatchup.allCities.find(val=>{
        return val.id == this.notOnZatchup.cityId
      })
    }
    if(this.notOnZatchup.allCities){
      stateFind= this.notOnZatchup.allStates.find(val=>{
        return val.id == this.notOnZatchup.stateId  
      })
    }
    this.notOnZatchup.listParams = {
      "date_from": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      "date_to": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university":this.notOnZatchup.university,
      "page_size": this.notOnZatchup.pageSize ? this.notOnZatchup.pageSize : 5,
      "page": page ? page : 1
  }

  this.baseService.getData('admin/ei/get_ei_list_not_onZatchUp/', this.notOnZatchup.listParams).subscribe(
    (res: any) => {
      console.log('list params....', res)
      if (res.status == true) {
        if (!page)
          page = this.notOnZatchup.config.currentPage
        this.notOnZatchup.startIndex = res.page_size * (page - 1) + 1;
        this.notOnZatchup.config.itemsPerPage = res.page_size
        this.notOnZatchup.config.currentPage = page
        this.notOnZatchup.config.totalItems = res.count;
        if(res.count > 0)
        this.notOnZatchup.dataSource = res.results
        else
        this.notOnZatchup.dataSource = undefined
    }
    else
    this.alert.error(res.error.message[0], 'Error')
    this.loader.hide();
    }
    ),  (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  generateExcel() {
    delete this.notOnZatchup.listParams.page_size;
    delete this.notOnZatchup.listParams.page;
    this.notOnZatchup.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/ei/export_users_not_on_zatchup/', 'not-on-zatchup', this.notOnZatchup.listParams);
  }

  getAllStates() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count > 0)
        this.notOnZatchup.allStates = res.results
      }
    )
  }
  getcities(){
    this.baseService.getData('user/getcitybystateid/' + this.notOnZatchup.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.notOnZatchup.allCities = res.results
        console.log('get city res ::', res)
      }
    )
  }

}
