import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ImageViewerModule } from "ngx-image-viewer";

import { AppRoutingModule } from './app-routing.module';
/*********************/
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';

import { UserwebModule } from './modules/user/userweb.module';
// import { EIModule } from './modules/ei/eiweb.module';
import { AdminModule } from './modules/admin/admin.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersServiceService } from './services/user/users-service.service';
import { GenericFormValidationService } from './services/common/generic-form-validation.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner"; 
import { NgxPaginationModule } from 'ngx-pagination';
// import { SharedModule } from './common/shared.module';
import { ConfirmDialogModule } from './common/confirm-dialog/confirm-dialog.module';
// import { ImageViewerModule } from './common/image-viewer/image-viewer.module';

// import { ImageCropperModule } from 'ngx-image-cropper';

// export const config = {
//   btnClass: 'default', // The CSS class(es) that will apply to the buttons
//   zoomFactor: 0.1, // The amount that the scale will be increased by
//   containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
//   wheelZoom: true, // If true, the mouse wheel can be used to zoom in
//   allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
//   allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
//   btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
//     zoomIn: 'fa fa-plus',
//     zoomOut: 'fa fa-minus',
//     rotateClockwise: 'fa fa-repeat',
//     rotateCounterClockwise: 'fa fa-undo',
//     next: 'fa fa-arrow-right',
//     prev: 'fa fa-arrow-left',
//     fullscreen: 'fa fa-arrows-alt',
//   },
//   btnShow: {
//     zoomIn: true,
//     zoomOut: true,
//     rotateClockwise: true,
//     rotateCounterClockwise: true,
//     next: true,
//     prev: true
//   }
// };


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserwebModule,
    AdminModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    // ImageViewerModule.forRoot(config),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ConfirmDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [NgxSpinnerModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    UsersServiceService,NgxSpinnerService,GenericFormValidationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
