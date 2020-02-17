import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'enroll', component: EnrollComponent},
  {path: 'list-property', component: PropertyListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'page', component: IndexComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
