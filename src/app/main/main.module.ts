import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateNewComponent } from './create-new/create-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    CreateNewComponent,
    PasswordComponent,
    ProfileComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule
  ]
})
export class MainModule { }
