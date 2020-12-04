import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserDashboard, UserManagement } from '../modals/admin-user.modal';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  dashboardData: any;
  userDashboard: UserDashboard;
  errorDisplay: any = {};
  filterFromDate: any;
  filterToDate: any;
  maxDate: Date;
  userManagement: UserManagement;
  search: string = ''
  constructor(
    
    private router: Router,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private datePipe: DatePipe,
  ) { 
    this.userDashboard = new UserDashboard();
    this.userManagement = new UserManagement();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    
    this.getUserDashboardData();
    this.getAllState();
   this.userManagement.stateId=''

  }

  getUserDashboardData() {
    this.baseService.getData('admin/user/get_user_dashboard_summary/').subscribe(
      (res: any) => {
        if (res.status == true){
          this.dashboardData = res.data
          this.userDashboard = res.data;
          console.log(this.userDashboard)
        }
        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ), err => {
      this.loader.hide()
    }
  }

  signupUsers(){
    this.router.navigate(['admin/signed-up-users'], {queryParams: { returnUrl: 'admin/user'}})
  }

  kycVerifiedUsers(){
    this.router.navigate(['admin/kyc-verified-users'], {queryParams: { returnUrl: 'admin/user'}})
  }


  getUserManagement(){
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if(this.userManagement.allStates && this.userManagement.stateId){
      cityFind = this.userManagement.allCities.find(val=>{
        return val.id == this.userManagement.cityId
      })
    }
    
    if(this.userManagement.allCities){
      stateFind = this.userManagement.allStates.find(val=>{
        return val.id == this.userManagement.stateId
      }) 
    }
  this.userManagement.modal ={
    'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd'): '',
    'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd'): '',
    "city": cityFind ? cityFind.city : '',
    "state": stateFind ? stateFind.state : '',
  }
  }

  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count >0)
        this.userManagement.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.userManagement.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.userManagement.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  searchRoute() {
    if(this.search.length >= 1)
      this.router.navigate(['admin/user-search', this.search])
  }

}
