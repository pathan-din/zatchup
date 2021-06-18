import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ResolveTicket } from '../Modals/tickets-list.modal';

@Component({
  selector: 'app-resolve-tickets',
  templateUrl: './resolve-tickets.component.html',
  styleUrls: ['./resolve-tickets.component.css']
})
export class ResolveTicketsComponent implements OnInit {
  resolveTicket: ResolveTicket
  model: any = {};
  params: any;
  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.resolveTicket = new ResolveTicket();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params
    })
    this.getAllState()
    this.getResolveTicketsList();
    this.resolveTicket.pageCounts = this.baseService.getCountsOfPage();
  }


  goBack(): void {
    this.location.back();
  }
  openReasonModel(reason) {
    this.model.resolve_comment = reason
  }
  getResolveTicketsList(page?: any) {
    this.loader.show();
    let stateFind: any;
    if (this.resolveTicket.allStates && this.resolveTicket.stateId) {
      stateFind = this.resolveTicket.allStates.find(val => {
        return val.id == this.resolveTicket.stateId
      })
    }
    this.resolveTicket.listParams = {
      'start_date': this.resolveTicket.filterFromDate !== undefined ? this.datePipe.transform(this.resolveTicket.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.resolveTicket.filterToDate !== undefined ? this.datePipe.transform(this.resolveTicket.filterToDate, 'yyyy-MM-dd') : '',
      "state": stateFind ? stateFind.state : '',
      "status": this.resolveTicket.status,
      "page_size": this.resolveTicket.pageSize,
      "page": page,
      "ticket_status": this.params.ticket_status
    }
    this.baseService.getData('admin/contact_query_admin_list/', this.resolveTicket.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.resolveTicket.config.currentPage
          this.resolveTicket.startIndex = res.page_size * (page - 1) + 1;
          this.resolveTicket.config.itemsPerPage = res.page_size;
          this.resolveTicket.pageSize = res.page_size;
          this.resolveTicket.config.currentPage = page
          this.resolveTicket.config.totalItems = res.count;
          if (res.count > 0)
            this.resolveTicket.dataSource = res.results
          else
            this.resolveTicket.dataSource = undefined
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

  getAllState() {
    this.loader.show()
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.resolveTicket.allStates = res.results
        this.loader.hide()
      }
    )
  }

}
