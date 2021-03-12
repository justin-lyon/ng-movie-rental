import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';
import { PipesModule } from './../pipes/pipes.module';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieGridComponent } from './movie-grid/movie-grid.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HeaderComponent } from './header/header.component';

const sharedModules = [
  BrowserModule,
  FlexLayoutModule,
  FormsModule,
  LayoutModule,
  MaterialModule,
  PipesModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    NavBarComponent,
    MovieGridComponent,
    MovieCardComponent,
    HeaderComponent
  ],
  imports: [CommonModule, ...sharedModules],
  exports: [
    NavBarComponent,
    ...sharedModules,
    MovieGridComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
