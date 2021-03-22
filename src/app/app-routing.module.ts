import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
