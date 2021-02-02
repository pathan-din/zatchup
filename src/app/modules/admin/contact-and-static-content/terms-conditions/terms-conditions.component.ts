import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {
  action: any;
  type: any;
  content: any;
  contentList: any;
  contentId: any;
  errorDisplay: any = {};
  @ViewChild("editor") editor: any;
  htmlContent: any = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      }
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.action = this.route.snapshot.params.action
    this.type = this.route.snapshot.params.type;
    this.contentId = this.route.snapshot.queryParamMap.get("content-id")
    if (this.action == 'view' || this.action == 'edit')
      this.getContents()
  }

  getContents() {
    let data = {
      "page_name": 'Terms and Conditions'
    }

    this.baseService.getData('admin/view_static_content/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.results.length > 0) {
            let find = res.results.find(val => {
              return val.user_type == this.type
            })
            this.htmlContent = find ? find.page_content : undefined
          }
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  addContent() {

    console.log('html text is as ::',this.htmlContent)
    // this.errorDisplay = {};
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }

    let data = {
      "page_name": 'Terms and Conditions',
      "user_type": this.type,
      "page_content": this.htmlContent,
    }
    let url = 'admin/add_static_content/';
    if(this.action == 'edit')
      url = 'admin/update_static_content/'+this.contentId + '/'

    console.log('url is as ::',url)
    this.baseService.action(url, data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success('Terms and Conditions added successfully', 'Success')
          this.goBack();
        } else {
          this.alert.error(res.error.message, "Error")
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err.message, "Error")
      this.loader.hide()
    }
  }

  goBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

}
