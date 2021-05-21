import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-ei-search',
  templateUrl: './ei-search.component.html',
  styleUrls: ['./ei-search.component.css']
})
export class EiSearchComponent implements OnInit {
  searchText: any;
  dataSource: any;
  filterBy: any = 'STUDENTS' ;
  page_size: any = 5;
  startIndex: any;
  config = {
      itemsPerPage: 0,
      currentPage: 1,
      totalItems: 0
  };
  pageCounts: any;

  currentCitySearchConfig: any = {
    "api_endpoint": "user/city-list/",
    "displayImage": false,
    "placeholder": "Current City",
    "seeMoreResults": false
  }

  currentSchoolSearchConfig: any = {
    "api_endpoint": "user/all-school-list-of-user/",
    "displayImage": true,
    "placeholder": "Current School",
    "display": ["name_of_school"],
    "seeMoreResults": false
  }

  pastSchoolSearchConfig: any = {
    "api_endpoint": "user/all-school-list-of-user/",
    "displayImage": true,
    "placeholder": "Past School",
    "display": ["name_of_school"],
    "seeMoreResults": false
  }

  schoolSearchId: any;
  cityId: any = '';
  currentSchoolName = '';
  pastSchoolName = '';
  currentUser: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.searchText = this.route.snapshot.queryParamMap.get('searchText');
    this.currentUser = localStorage.getItem('userId')
    if (this.searchText)
      this.getSearchData()
  }


  getSearchData(page? : any) {
    let params = {
      "search": this.searchText,
      "filter_by": this.filterBy,
      "school_id": this.schoolSearchId,
      "city_id": this.cityId
    }
    this.baseService.getData('user/search-list/', params).subscribe(
      (res: any) => {
        if (res.status == true) {

          if (!page)
            page = this.config.currentPage
            this.startIndex = res.page_size * (page- 1) + 1;
            this.page_size = res.page_size
            this.config.itemsPerPage = this.page_size
            this.config.currentPage = page
            this.config.totalItems = res.count
            if(res.count > 0) {
              this.dataSource = res.results;
              this.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.dataSource = undefined
              this.pageCounts = undefined
            }
        }
        else {

        }
      }
    )
  }

  getfilteredData(data: TabDirective): void {
    if (data.heading == 'Student')
      this.filterBy = 'STUDENTS';
    else
      this.filterBy = 'ALUMINI';
    this.cityId = '';
    this.getSearchData()
  }

  getCurrentSchoolSearchResult(data: any) {
    this.filterBy = "current";
    this.schoolSearchId = data.id;
    this.cityId = '';
    this.pastSchoolName = ''
    this.getSearchData()
  }

  getPastSchoolSearchResult(data: any) {
    this.filterBy = "past";
    this.schoolSearchId = data.id;
    this.cityId = '';
    this.currentSchoolName = '';
    this.getSearchData()
  }

  getCurrentCitySearchResult(data: any, filterBy: any) {
    this.filterBy = filterBy;
    this.schoolSearchId = '';
    this.cityId = data.id
    this.getSearchData();
  }

  userProfile(id: any) {
    this.router.navigate(['ei/student-profile'], { queryParams: { 'stId': id } });
  }

  getUserSearchData() {
    this.filterBy = 'user';
    this.schoolSearchId = '';
    this.getSearchData();
  }

}
