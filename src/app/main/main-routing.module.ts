import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { LoginComponent } from '../components/login/login.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { HomeComponent } from './home/home.component';
import { RequestDetailComponent } from './home/request-detail/request-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { 
    path: 'users/:id',
    component: MainComponent,
    children:[
      { 
        path: '', 
        redirectTo: 'inquiries', 
        pathMatch: 'full' 
      },
      { 
        path: 'inquiries', 
        component: HomeComponent,
        
      },
      { path: 'create-new', component: CreateNewComponent },
      { path: 'request-detail/:id', component: RequestDetailComponent },
      { path: 'profile', component: ProfileComponent }, 
      { path: 'password', component: PasswordComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
