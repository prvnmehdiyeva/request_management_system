import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { LoginComponent } from '../components/login/login.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
  path: '',
  component:MainComponent,
  children:[
    { path: 'inquiries', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create-new', component: CreateNewComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users/:id/password', component: PasswordComponent },
    { path: 'users/:id', component: HomeComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
