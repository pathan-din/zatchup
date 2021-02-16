import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
// environment
import { environment } from './../environments/environment'
// app routing
import { AppRoutingModule } from './app-routing.module';
//modules
import { UserwebModule } from './modules/user/userweb.module';
import { AdminModule } from './modules/admin/admin.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
// common module
import { ConfirmDialogModule } from './common/confirm-dialog/confirm-dialog.module';

//http interceptor
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

//services
import { UsersServiceService } from './services/user/users-service.service';
import { GenericFormValidationService } from './services/common/generic-form-validation.service';

// components
import { AppComponent } from './app.component';

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
    ConfirmDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NgxSpinnerModule],
  providers: [
    NgxSpinnerService,
    UsersServiceService,
    GenericFormValidationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
