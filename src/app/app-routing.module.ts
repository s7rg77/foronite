import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZonesComponent } from './zones/zones.component';
import { ZoneComponent } from './zone/zone.component';
import { CaseComponent } from './case/case.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'zones' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'zones', component: ZonesComponent },
  { path: 'zone/:id/:page', component: ZoneComponent },
  { path: 'case/:id/:page', component: CaseComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }