import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ResolveTicket } from '../Modals/tickets-list.modal';

@Component({
  selector: 'app-resolve-tickets',
  templateUrl: './resolve-tickets.component.html',
  styleUrls: ['./resolve-tickets.component.css']
})
export class ResolveTicketsComponent implements OnInit {
  resolveTicket : ResolveTicket
  model:any={};
  params:any;
  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private location: Location,
    private validationService: GenericFormValidationService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.params = params
    })
    this.resolveTicket = new ResolveTicket();
    this.getResolveTicketsList();
    this.resolveTicket.pageCounts = this.baseService.getCountsOfPage();
  }

  
  goBack(): void {
    // let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    // this.router.navigate([returnUrl]);
    this.location.back();
    console.log(location)
  }
  openReasonModel(reason){
    this.model.resolve_comment = reason
  }
  getResolveTicketsList(page?: any) {
    this.loader.show();
    this.resolveTicket.listParams = {
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

}
