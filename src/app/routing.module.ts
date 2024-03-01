import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './main/header/header.component';
import { MainComponent } from './main/main.component';
import { PasswordComponent } from './main/password/password.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/:id/password', component: PasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users/:id', component: MainComponent},
]
@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
