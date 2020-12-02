import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const MaterialDesignComponents = [
  MatButtonModule, MatRadioModule, CdkStepperModule, 
  MatStepperModule, MatInputModule, MatCheckboxModule,
  MatSidenavModule, FormsModule, MatToolbarModule,
  MatMenuModule, MatIconModule,MatListModule,
  LayoutModule,MatTableModule,CdkTableModule,
  MatCardModule,MatProgressSpinnerModule,MatSliderModule,MatPaginatorModule,MatExpansionModule,
  MatSlideToggleModule,MatAutocompleteModule
];

@NgModule({
  imports: [MaterialDesignComponents],
  exports: [MaterialDesignComponents]
})

export class MaterialDesignModule { }
