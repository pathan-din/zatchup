import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { ConfirmDialogModule } from './common/confirm-dialog/confirm-dialog.module';

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
