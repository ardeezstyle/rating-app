import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AuthGuard } from './services/auth.guard';
import { AuthDataResolverService } from './services/auth-data-resolver.service';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'enroll/:owner_id/:center_name', component: EnrollComponent},
  {path: 'list-property', component: PropertyListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'page', component: IndexComponent, canActivate: [AuthGuard], resolve: {user: AuthDataResolverService},},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
