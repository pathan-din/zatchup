import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputSearchComponent } from './input-search/input-search.component';
import { AutoSearchComponent } from './auto-search/auto-search.component';
import { CoverUploaderComponent } from './cover-uploader/cover-uploader.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    InputSearchComponent,
    AutoSearchComponent,
    CoverUploaderComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImageUploaderComponent,
    InputSearchComponent,
    CoverUploaderComponent
  ]
})
export class SharedModule { }
