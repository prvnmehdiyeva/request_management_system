import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './components/login/login.component';
import { CreateNewComponent } from './main/create-new/create-new.component';
import { ProfileComponent } from './main/profile/profile.component';
import { PasswordComponent } from './main/password/password.component';


// Existing routes
const existingRoutes: Routes = [
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

// New routes to be added
const newRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-new', component: CreateNewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users/:id/password', component: PasswordComponent },
  { path: 'users/:id', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot([...existingRoutes, ...newRoutes])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
