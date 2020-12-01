import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { NaviComponent } from './navi/navi.component';

const passThroughs = [
  FlexLayoutModule,
  LayoutModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [NaviComponent],
  exports: [NaviComponent, ...passThroughs],
  imports: [CommonModule, RouterModule, ...passThroughs]
})
export class SharedModule {}
