import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogService } from './confirm-dialog.service';



@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    ConfirmDialogService
  ]
})
export class ConfirmDialogModule { }
