import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  searchText: any;
  dataSource: any;
  pastSchools: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  pastSchoolsSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name_of_school',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  countries: Array<any> = [];
  selCountries = [
    {
      item_id: 1,
      item_text: "India",
      image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg"
    },
    {
      item_id: 5,
      item_text: "Israel",
      image: "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg"
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {


    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.searchText = this.route.snapshot.queryParamMap.get('searchText');
    if (this.searchText)
      this.getSearchData()
    // this.getCurrentSchools();
    this.getPastSchools()
  }

  getSearchData() {
    let params = {
      "search": this.searchText
    }
    this.baseService.getData('user/search-list-for-school-student', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.count == 0)
            this.dataSource = undefined
          else
            this.dataSource = res.results;
        }
        else {

        }
      }
    )
  }

  goToMyBuddiesPage() {
    this.router.navigate(['user/my-buddies']);
  }

  get getItems() {
    return this.countries.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

  getCurrentSchools() {
    let params = {
      "search": this.searchText
    }
    this.baseService.getData('user/current-school-list-of-user/').subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.count == 0)
            this.dataSource = undefined
          else
            this.dataSource = res.results;
        }
        else {

        }
      }
    )
  }

  getPastSchools() {
    let params = {
      "search": this.searchText
    }
    this.baseService.getData('user/past-school-list-of-user/').subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.count == 0)
            this.pastSchools = undefined
          else
            this.pastSchools = res.results;
        }
        else {

        }
      }
    )
  }
}
