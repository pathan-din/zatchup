import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MessagesHistory } from '../modals/education-institute.modal';
export interface PeriodicElement {
  position: number;
  ticketId: string;
  dateOfMessage: string;
  message: string;
  resolutionDate: string;
  resolveComment: string;
  attachment: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {'position': 1, 'ticketId': 'TICKET 2020', 'dateOfMessage' : '01 June, 2020', 'message':'',
//   'resolutionDate': '01 june, 2020', 'resolveComment': ' ', 'attachment': ' '}
// ];

@Component({
  selector: 'app-message-resolved',
  templateUrl: './message-resolved.component.html',
  styleUrls: ['./message-resolved.component.css']
})
export class MessageResolvedComponent implements OnInit {
  dataSource: any;
  messagesHistory: MessagesHistory;
  params: any;
  ei_id: any;
  ticket_status: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) {
    this.messagesHistory = new MessagesHistory
  }

  ngOnInit(): void {
    this.ei_id = this.route.snapshot.queryParamMap.get('ei_id');
    this.ticket_status = this.route.snapshot.queryParamMap.get('ticket_status')
    this.getMessagesHistory();

    // this
  }

  getMessagesHistory(page?: any) {
    this.loader.show();
    this.messagesHistory.params = {
      'page': page,
      'page_size': this.messagesHistory.page_size,
      'ei_id': this.ei_id,
      'ticket_status': this.ticket_status
    }
    this.baseService.getData('admin/get_onboarded_contactus_history', this.messagesHistory.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.messagesHistory.config.currentPage
          this.messagesHistory.startIndex = res.page_size * (page - 1) + 1;
          this.messagesHistory.page_size = res.page_size
          this.messagesHistory.config.itemsPerPage = this.messagesHistory.page_size
          this.messagesHistory.config.currentPage = page
          this.messagesHistory.config.totalItems = res.count;
          if (res.count > 0) {
            this.messagesHistory.dataSource = res.results;
            this.messagesHistory.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.messagesHistory.dataSource = undefined;
            this.messagesHistory.pageCounts = undefined
          }
        } else {
          this.loader.hide();
          this.alert.error(res.error.message, 'Error')
        }
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  goBack() {
    this.location.back()
  }
}
