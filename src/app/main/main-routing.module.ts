  import { Component, NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { MainComponent } from './main.component';
  import { LoginComponent } from '../components/login/login.component';
  import { CreateNewComponent } from './create-new/create-new.component';
  import { ProfileComponent } from './profile/profile.component';
  import { PasswordComponent } from './password/password.component';
  import { HomeComponent } from './home/home.component';
  import { RequestDetailComponent } from './home/request-detail/request-detail.component';
import { ReportComponent } from './report/report.component';
import { MessageService } from 'primeng/api';

  const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { 
      path: 'account',
      component: MainComponent,
      children:[
        { 
          path: '', 
          redirectTo: '', 
          pathMatch: 'full' 
        },
        { 
          path: 'requests',
          component: HomeComponent,
        },
        { 
          path: 'reports',
          component: ReportComponent 
        },
        { path: 'create-new', component: CreateNewComponent },
        { path: 'profile', component: ProfileComponent }, 
        { path: 'password', component: PasswordComponent },
        { path: ':requestId', component: RequestDetailComponent },
      ]
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [MessageService],
  })
  export class MainRoutingModule { }
