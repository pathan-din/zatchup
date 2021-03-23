import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './number-only.directive';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';



@NgModule({
  declarations: [
    NumberOnlyDirective,
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [NumberOnlyDirective]
})
export class DirectiveModule { }
