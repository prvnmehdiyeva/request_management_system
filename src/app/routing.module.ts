import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './main/header/header.component';
import { MainComponent } from './main/main.component';
import { PasswordComponent } from './components/password/password.component';

const routes: Routes = [
  { 
    path: 'users/:id', 
    component: MainComponent, 
    children: [
      { path: 'changePassword', component: PasswordComponent }
    ] 
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
