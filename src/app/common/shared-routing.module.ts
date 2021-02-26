import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonTermsConditionsComponent } from './common-terms-conditions/common-terms-conditions.component';


const routes: Routes = [
  {
    path: 'shared/common-terms-conditions', component:CommonTermsConditionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
