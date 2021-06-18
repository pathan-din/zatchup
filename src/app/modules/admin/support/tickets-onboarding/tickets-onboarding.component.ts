import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TicketsList } from '../Modals/tickets-list.modal';

@Component({
  selector: 'app-tickets-onboarding',
  templateUrl: './tickets-onboarding.component.html',
  styleUrls: ['./tickets-onboarding.component.css']
})
export class TicketsOnboardingComponent implements OnInit {
  @ViewChild('closeModel') closeModel: any;
  ticketsList: TicketsList
  errorDisplay: any = {};
  id: any;
  ticket_status: any;
  resolve_comment: any;

  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location,
    private validationService: GenericFormValidationService,
    private router: Router,
  ) {
    this.ticketsList = new TicketsList();
    this.ticketsList.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getAllState();
    this.getTicketsList('');
    this.ticketsList.pageCounts = this.baseService.getCountsOfPage();

  }

  resolveTicket() {
    this.router.navigate(['admin/resolve-ticket'], { queryParams: { ticket_status: 'true' } })
  }
  getTicketsList(page?: any) {
    this.loader.show();
    let stateFind: any;
    // let cityFind: any;
    if (this.ticketsList.allStates && this.ticketsList.stateId) {
      stateFind = this.ticketsList.allStates.find(val => {
        return val.id == this.ticketsList.stateId
      })
    }
    // if (this.ticketsList.allCities) {
    //   stateFind = this.ticketsList.allStates.find(val => {
    //     return val.id == this.ticketsList.stateId
    //   })
    // }
    this.ticketsList.listParams = {
      'start_date': this.ticketsList.filterFromDate !== undefined ? this.datePipe.transform(this.ticketsList.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.ticketsList.filterToDate !== undefined ? this.datePipe.transform(this.ticketsList.filterToDate, 'yyyy-MM-dd') : '',
      // "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "status": this.ticketsList.status,
      "page_size": this.ticketsList.pageSize,
      "ticket_status": 'false',
      "page": page
    }
    // debugger
    this.baseService.getData('admin/contact_query_admin_list/', this.ticketsList.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.ticketsList.config.currentPage
          this.ticketsList.startIndex = res.page_size * (page - 1) + 1;
          this.ticketsList.config.itemsPerPage = res.page_size;
          this.ticketsList.pageSize = res.page_size;
          this.ticketsList.config.currentPage = page
          this.ticketsList.config.totalItems = res.count;
          if (res.count > 0)
            this.ticketsList.dataSource = res.results
          else
            this.ticketsList.dataSource = undefined
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  generateExcel() {
    delete this.ticketsList.listParams.page_size;
    delete this.ticketsList.listParams.page;
    this.ticketsList.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/export_contact_query_admin_list/', 'ticket-list', this.ticketsList.listParams);
  }


  getAllState() {
    this.loader.show()
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.ticketsList.allStates = res.results
        this.loader.hide()
      }
    )
  }

  // getCities() {
  //   this.baseService.getData('user/getcitybystateid/' + this.ticketsList.stateId).subscribe(
  //     (res: any) => {
  //       if (res.count > 0)
  //         this.ticketsList.allCities = res.results
  //     }
  //   )
  // }

  resolveComment(form: NgForm) {
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }

    this.loader.show()
    let data = {
      'id': this.id,
      'ticket_status': true,
      'resolve_comment': this.resolve_comment,
    }
    this.baseService.action('admin/update_ticket_status/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, 'Success')
          this.closeResolveComment();
          form.reset();
          this.getTicketsList(this.ticketsList.config.currentPage);
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  closeResolveComment() {
    this.closeModel.nativeElement.click()
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  goBack(): void {
    // let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    // this.router.navigate([returnUrl]);
    this.location.back();
    console.log(location)
  }
  viewMessage(data: any) {
    this.ticketsList.messageFromSchool = data.message
  }

  setResolveData(data: any) {
    this.id = data.id
  }

}
