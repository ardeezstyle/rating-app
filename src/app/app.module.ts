import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IndexModule } from './components/index/index.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';

import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EnrollComponent,
    PropertyListComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    IndexModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
