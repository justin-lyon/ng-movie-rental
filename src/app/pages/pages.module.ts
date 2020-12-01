import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AccountComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    SignupComponent
  ],
  imports: [CommonModule, PagesRoutingModule]
})
export class PagesModule {}
