import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('openModalButton') openModalButton: any;
  @ViewChild('closeButton') closeButton: any;
  @Output() imageData: EventEmitter<any> = new EventEmitter();
  @Input() get uploadInfo(): any {
    return this._uploadInfo
  };
  set uploadInfo(upload: any) {
    this.icon = upload.icon ? upload.icon : undefined;
    this.image = upload.image ? upload.image : undefined;
    this.url = upload.url ? upload.url : undefined;
    this.image_type = upload.image_type ? upload.image_type : 'image';
    this.class_div = upload.url ? upload.class : undefined;
    this.params = upload.params ? upload.params : undefined;
  }


  imageChangedEvent: any = '';
  croppedImage: any = '';
  profile_pic: any;
  fileData: File
  _uploadInfo: any;
  image_type: any;
  url: any;
  icon: any;
  image: any;
  class_div: any;
  params: any = {};

  constructor(
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService

  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (this.imageChangedEvent) {
      let fileList: FileList = this.imageChangedEvent.target.files;
      this.fileData = fileList[0];
      if (this.fileData.type !== 'image/jpeg' && this.fileData.type !== 'image/jpg' && this.fileData.type !== 'image/png') {
        this.loader.hide();
        this.alert.error("File format not supported", 'Error');
        return
      }
      this.openModalButton.nativeElement.click()
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // debugger
    /* show cropper */
  }
  cropperReady() {
    // debugger
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  closeModal() {
    try {
      var file = this.dataURLtoFile(this.croppedImage, this.fileData.name)
      const formData = new FormData();
      formData.append(this.image_type, file);
      if (this.params) {
        for (var key in this.params) {
          formData.append(key, this.params[key])
        }
      }
      this.baseService.action(this.url, formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, 'Success');
            this.imageData.emit(res);
            this.closeButton.nativeElement.click();
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();
      console.log("exception", err);
    }
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
