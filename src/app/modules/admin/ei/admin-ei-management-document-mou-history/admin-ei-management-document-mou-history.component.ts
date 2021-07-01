import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageViewerConfig, CustomEvent } from 'src/app/common/image-viewer/image-viewer-config.model';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DocHistory } from '../modals/education-institute.modal';

@Component({
  selector: 'app-admin-ei-management-document-mou-history',
  templateUrl: './admin-ei-management-document-mou-history.component.html',
  styleUrls: ['./admin-ei-management-document-mou-history.component.css']
})
export class AdminEiManagementDocumentMouHistoryComponent implements OnInit {
  @ViewChild('closeUploadMOUModel') closeUploadMOUModel: any;
  docHistory: DocHistory;
  images: any = [];
  imageIndexOne = 0;
  // config: ImageViewerConfig = {customBtns: [{name: 'print', icon: 'fa fa-print'}, {name: 'link', icon: 'fa fa-link'}]};
  // EiId: any;

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) {
    this.docHistory = new DocHistory();
  }


  ngOnInit(): void {
    this.docHistory.school_id = this.route.snapshot.params.ei_id;
    this.getDocHistory();
  }

  handleEvent(event: CustomEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }

  getDocHistory(page?: any) {
    this.loader.show();

    this.docHistory.params = {
      'page': page,
      'page_size': this.docHistory.page_size,
      'ei_id': this.docHistory.school_id,
      'ascending_order': this.docHistory.ascendingOrder,
      'type': this.docHistory.doc_type
    }
    this.baseService.getData('admin/ei/get_document_mou_history/', this.docHistory.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.docHistory.config.currentPage
          this.docHistory.startIndex = res.page_size * (page - 1) + 1;
          this.docHistory.page_size = res.page_size
          this.docHistory.config.itemsPerPage = this.docHistory.page_size
          this.docHistory.config.currentPage = page
          this.docHistory.config.totalItems = res.count;
          if (res.count > 0) {
            this.docHistory.dataSource = res.results;
            this.docHistory.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.docHistory.dataSource = undefined;
            this.docHistory.pageCounts = undefined;
          }
        }
        else {
          this.loader.hide();
          this.alert.error(res.error.message, 'Error');
        }
        // this.loader.hide();
      }
    ),
      (err: any) => {
        this.loader.hide();
        this.alert.error(err, 'Error')
      }
  }
  goBack() {
    this.location.back()
  }

  fileUploadDocument(files) {
    this.loader.show()
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    const formData = new FormData();
    formData.append('file_name', fileData);
    this.baseService.action('ei/uploaddocsfile/', formData).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, 'Success')
          this.docHistory.existingZatchIDMOUDoc = res.filename
          this.docHistory.requiredMOU = true
        } else {
          this.alert.error(res.message, 'Error')
        }

        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  }

  viewImage(src) {
    this.images = []
    this.images.push(src);
  }

  addMouDoc() {
    this.docHistory.errorDisplay = {};
    this.docHistory.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.docHistory.errorDisplay.valid) {
      if (!this.docHistory.existingZatchIDMOUDoc)
        this.docHistory.requiredMOU = false

      return false;
    } else if (!this.docHistory.existingZatchIDMOUDoc) {
      this.docHistory.requiredMOU = false;
      return false;
    }

    this.loader.show()
    let data = {
      'ei_id': this.docHistory.school_id,
      'filename': this.docHistory.existingZatchIDMOUDoc,
      'remarks': this.docHistory.remarks
    }
    this.baseService.action('admin/ei/upload_new_mou/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeUploadMOUModel.nativeElement.click();
          this.alert.success(res.message, 'Success');
          this.getDocHistory()
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

  fileType(file: any) {
    return file.split('.').pop();
  }

  generatePDF(file: any) {

    this.baseService.generatePdf(file, 'mou_doc')
  }

  download_file(fileURL) {
    window.open(fileURL, '_blank');
  }
}
