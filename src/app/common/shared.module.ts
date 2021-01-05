import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AutoSearchComponent } from './auto-search/auto-search.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    AutoSearchComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class SharedModule { }
