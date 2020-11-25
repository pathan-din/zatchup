import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MyAssignedEI } from '../modal/assigned-ei.modal';


@Component({
  selector: 'app-my-assigned-ei',
  templateUrl: './my-assigned-ei.component.html',
  styleUrls: ['./my-assigned-ei.component.css']
})
export class MyAssignedEiComponent implements OnInit {
  assignedEI: MyAssignedEI
 

  constructor(
    private router: Router,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService
  ) {
    this.assignedEI = new MyAssignedEI()
  }

  ngOnInit(): void {
 
 
    this.getCourseList('');
    this.getAllState();
  }

  goToAdminEiManagementIncompleteOnboardingViewPage(data) {
    this.router.navigate(['admin/ei-profile-details', data.id]);
  }


  getCourseList(page: any) {
    this.loader.show()
    let stateFind: any;
    let cityFind: any;
    if (this.assignedEI.allStates && this.assignedEI.stateId) {
      stateFind = this.assignedEI.allStates.find(val => {
        return val.id == this.assignedEI.stateId
      })
    }
    if (this.assignedEI.allCities) {
      cityFind = this.assignedEI.allCities.find(val => {
        return val.id == this.assignedEI.cityId
      })
    }
    this.assignedEI.params = {
      "page_size": this.assignedEI.config.itemsPerPage,
      "page": page,
      "state": stateFind ? stateFind.state : '',
      "city": cityFind ? cityFind.city : '',
      "university": this.assignedEI.university ? this.assignedEI.university : ''
    }

    this.baseService.getData('admin/my-assigned-ei-list/', this.assignedEI.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.assignedEI.config.currentPage
          this.assignedEI.startIndex = res.page_size * (page - 1) + 1;
          this.assignedEI.config.itemsPerPage = res.page_size
          this.assignedEI.config.currentPage = page
          this.assignedEI.config.totalItems = res.count;
          this.assignedEI.dataSource = res.results
        }

        else
          this.alert.error(res.error.message, 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  generateExcel() {
    this.baseService.generateExcel('admin/export-my-assigned-ei-list/', 'assigned-ei',)
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        console.log('get state res ::', res)
        if (res.count > 0)
          this.assignedEI.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.assignedEI.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.assignedEI.allCities = res.results
        console.log('get state res ::', res)
      }
    )
  }
}
