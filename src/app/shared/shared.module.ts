import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { NaviComponent } from './navi/navi.component';

@NgModule({
  declarations: [NaviComponent],
  exports: [MaterialModule, FlexLayoutModule, LayoutModule, NaviComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, LayoutModule]
})
export class SharedModule {}
