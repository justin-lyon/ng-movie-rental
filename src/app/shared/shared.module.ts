import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';

import { NaviComponent } from './navi/navi.component';
import { RouterModule } from '@angular/router';

const sharedModules = [
  BrowserModule,
  FlexLayoutModule,
  FormsModule,
  LayoutModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [NaviComponent],
  imports: [CommonModule, ...sharedModules],
  exports: [NaviComponent, ...sharedModules]
})
export class SharedModule {}
