import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputSearchComponent } from './input-search/input-search.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImageUploaderComponent,
    InputSearchComponent
  ]
})
export class SharedModule { }
