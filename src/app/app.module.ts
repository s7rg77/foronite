import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ZonesComponent } from './zones/zones.component';
import { LastcasesComponent } from './lastcases/lastcases.component';
import { HeaderComponent } from './header/header.component';
import { CasesComponent } from './cases/cases.component';
import { CaseComponent } from './case/case.component';
import { PostsComponent } from './posts/posts.component';
import { ZoneComponent } from './zone/zone.component';
import { NewcaseComponent } from './newcase/newcase.component';
import { NewpostComponent } from './newpost/newpost.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { PostlikesComponent } from './postlikes/postlikes.component';
import { CaselikesComponent } from './caselikes/caselikes.component';
import { LikecasesComponent } from './likecases/likecases.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { AccesscasesComponent } from './accesscases/accesscases.component';
import { SelectComponent } from './select/select.component';

@NgModule({

  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ZonesComponent,
    LastcasesComponent,
    HeaderComponent,
    CasesComponent,
    CaseComponent,
    PostsComponent,
    ZoneComponent,
    NewcaseComponent,
    NewpostComponent,
    UserComponent,
    FooterComponent,
    PostlikesComponent,
    CaselikesComponent,
    LikecasesComponent,
    AccountComponent,
    SearchComponent,
    AccesscasesComponent,
    SelectComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],

  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp({ "projectId": "...", "appId": "...", "storageBucket": "...", "apiKey": "...", "authDomain": "...", "messagingSenderId": "..." })),
    provideAuth(() => getAuth())
  ],
  
  bootstrap: [AppComponent]

})

export class AppModule { }