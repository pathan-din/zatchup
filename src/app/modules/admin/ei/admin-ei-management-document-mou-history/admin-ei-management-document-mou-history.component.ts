import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DocHistory } from '../modals/education-institute.modal';

// export interface LastLoginUser {

//   'position': number;
//   DateOfUploading: string;
//   // profilePic: string;
//   NameofDocument: string;
//   ViewDocument: string;
//   DownloadDocument: string;
//   Remarks: string;
//   UploadedByEI: string;
//   UploadedByEmployeeName: string;

// }

// const ELEMENT_DATA: LastLoginUser[] = [
//   {
//     'position': 1,
//     DateOfUploading: '10 June 2020',
//     NameofDocument: 'MOU',
//     ViewDocument: 'assets/images/userWebsite/image-icon.png',
//     DownloadDocument: 'Download',
//     Remarks: '',
//     UploadedByEI: '',
//     UploadedByEmployeeName: 'Prashant(Employee 5252)',
//   }

// ];

@Component({
  selector: 'app-admin-ei-management-document-mou-history',
  templateUrl: './admin-ei-management-document-mou-history.component.html',
  styleUrls: ['./admin-ei-management-document-mou-history.component.css']
})
export class AdminEiManagementDocumentMouHistoryComponent implements OnInit {
  docHistory : DocHistory;
  EiId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
    ) { 
      this.docHistory = new DocHistory();
    }


  ngOnInit(): void {
    this.docHistory.EiId = this.route.snapshot.params.ei_id;
    this.getDocHistory();
  }

  getDocHistory(page? : any){
    this.loader.show();

    this.docHistory.params ={
      'page': page,
      'page_size': this.docHistory.page_size,
      'ei_id':this.docHistory.EiId,
      'ascending_order': this.docHistory.ascendingOrder
    }
    this.baseService.getData('admin/ei/get_document_mou_history/', this.docHistory.params  ). subscribe(
      (res: any) => {
        if(res.status == true){
          if(!page)
          page = this.docHistory.config.currentPage
          this.docHistory.startIndex = res.page_size * (page - 1) + 1;
          this.docHistory.page_size = res.page_size
          this.docHistory.config.itemsPerPage = this.docHistory.page_size
          this.docHistory.config.currentPage = page
          this.docHistory.config.totalItems = res.count;
          if(res.count > 0){
            this.docHistory.dataSource = res.results;
            this.docHistory.pageCounts = this.baseService.getCountsOfPage()
          }
          else{
            this.docHistory.dataSource = undefined;
            this.docHistory.pageCounts = undefined; 
          }
        }
        else{
          this.loader.hide();
          this.alert.error(res.error.message, 'Error');
        }
      }
    ),
    (err: any) => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  goBack(){
    this.location.back()
  }
}
