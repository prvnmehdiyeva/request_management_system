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
import { RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PasswordChangeSuccessDialogComponent } from './password/password-change-success-dialog/password-change-success-dialog.component';
import { RequestDetailComponent } from './home/request-detail/request-detail.component';
import { ProfilechangedialogComponent } from './profile/profilechangedialog/profilechangedialog.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    CreateNewComponent,
    PasswordComponent,
    ProfileComponent,
    SidemenuComponent,
    PasswordChangeSuccessDialogComponent,
    RequestDetailComponent,
    ProfilechangedialogComponent,
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
    RouterModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatMenuModule
  ]
})
export class MainModule { }
