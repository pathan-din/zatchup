import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputSearchComponent } from './input-search/input-search.component';
import { AutoSearchComponent } from './auto-search/auto-search.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    InputSearchComponent,
    AutoSearchComponent
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
