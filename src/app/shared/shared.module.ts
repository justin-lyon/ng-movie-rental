import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ToasterModule } from './toaster/toaster.module';

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
  declarations: [NavBarComponent],
  imports: [CommonModule, ...sharedModules, ToasterModule],
  exports: [NavBarComponent, ...sharedModules]
})
export class SharedModule {}
