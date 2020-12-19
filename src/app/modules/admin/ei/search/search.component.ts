import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: any;
  startIndex: Number;
  pageSize: any = 5;
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

  displayedColumns: string[] = ['position', 'nameOfEi', 'profilePick', 'state', 'city',
    'boardUniversity', 'status'];

  dataSource: any;
  page_size: any;
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
    this.searchEIList('');
    this.getAllState();
  }


  searchEIList(page) {
    let params = {
      "search": this.search,
      "page": page,
      "page_size": this.page_size,
      "university": this.university,
      "city": this.cityId ? this.getValue(this.allCities, this.cityId, 'city') : '',
      "state": this.stateId ? this.getValue(this.allStates, this.stateId, 'state') : '',
      "is_onboarded": this.onboardedStatus
    }

    this.loader.show();
    this.baseService.getData('admin/ei_search/', params).subscribe(
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
    this.baseService.generateExcel('admin/ei_search_export/', 'ei');
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.allCities = res.results
      }
    )
  }

  getValue(data, id, value) {
    let find = data.find(val => {
      return val.id == id
    })

    return find[value];
  }

  goBack(): void{
    this.location.back()
  }

}
