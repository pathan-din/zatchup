import { NgModule } from '@angular/core';
// import { SharedRoutingModule } from './shared-routing.module'
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputSearchComponent } from './input-search/input-search.component';
import { AutoSearchComponent } from './auto-search/auto-search.component';
import { CoverUploaderComponent } from './cover-uploader/cover-uploader.component';
import { CommonTermsConditionsComponent } from './common-terms-conditions/common-terms-conditions.component';
import { from } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ImageUploaderComponent,
    InputSearchComponent,
    AutoSearchComponent,
    CoverUploaderComponent,
    CommonTermsConditionsComponent
  ],
  imports: [
    CommonModule,
    // SharedRoutingModule,
    ImageCropperModule,
    NgxSpinnerModule
  ],
  exports: [
    ImageUploaderComponent,
    InputSearchComponent,
    CoverUploaderComponent,
    CommonTermsConditionsComponent
  ]
})
export class SharedModule { }
