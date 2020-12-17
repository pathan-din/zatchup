import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user-search',
  templateUrl: './admin-user-search.component.html',
  styleUrls: ['./admin-user-search.component.css']
})
export class AdminUserSearchComponent implements OnInit {
  search: any;
  startIndex: Number;
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  allCities: any;
  allStates: any;
  university: any;
  cityId: any = '';
  stateId: any = '';
  onboardedStatus: any = '';
  displayedColumns: string[] = ['position','Name','profilePic','ZatchUpID','userType', 
  'currentEI','pastEI'];
   dataSource: any; 
  page_size: any;
  params: any= {};
  currentEi: any;
  previousEi: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.search = this.activeRoute.snapshot.params.search;
    this.searchUserList('');
    this.getAllState();
    this.stateId=''
  }

  searchUserList(page? : any){
    let stateFind: any;
    let cityFind: any;
    if(this.allStates && this.stateId){
      cityFind = this.allCities.find(val=>{
        return val.id == this.cityId
      })
    }
    
    if(this.allCities){
      stateFind = this.allStates.find(val=>{
        return val.id == this.stateId
      }) 
    }
    this.params = {
      "search": this.search,
      'page': page,
      'page_size': this.page_size,
      "city": this.cityId ? this.getValue(this.allCities, this.cityId, 'city') : '',
      "current_ei": this.currentEi,
      "previous_ei": this.previousEi
    }

    this.loader.show();
    this.baseService.getData('admin/user/search', this.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.page_size = res.page_size;
          this.config.itemsPerPage = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;

          if (res.count > 0)
            this.dataSource = res.results
          else
            this.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    )
  }
  generateExcel() {
    this.baseService.generateExcel('admin/user/export_search_list/', 'user-search-list', this.params);
  }
  getValue(data, id, value) {
    let find = data.find(val => {
      return val.id == id
    })

    return find[value];
  }
  getAllState(){
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count >0)
        this.allStates = res.results
      }
    )
  }
  getCities(){
    this.baseService.getData('user/getcitybystateid/' + this.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
        this.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }

  goBack(): void{
    this.location.back()
  }
}
