import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AccountComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    SettingsComponent,
    SignupComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class PagesModule {}
