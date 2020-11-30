import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
