import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  //   { path: 'home', component: HomeComponent },
  //   { path: 'account', component: AccountComponent },
  //   { path: 'settings', component: SettingsComponent },
  //   { path: 'signup', component: SignupComponent },
  //   { path: '', redirectTo: '/home', pathMatch: 'full' },
  //   { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [PagesRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
