  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthService } from '../../services/auth.service';
  import { Router } from '@angular/router';
  import { ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrl: './password.component.scss'
  })
  export class PasswordComponent implements OnInit {
    id: string = '';
    changePasswordForm:FormGroup
    successMessage: string | null = null
    errorMessage: string | null = null

    constructor(
      private fb:FormBuilder,
      private authService:AuthService,
      private route:ActivatedRoute,
    ){
      this.changePasswordForm = this.fb.group({
        currentPassword:['',Validators.required],
        newPassword:['',[Validators.required, Validators.minLength(8)]],
        confirmPassword:['',Validators.required],
      })
    }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }
    onSubmit() {
      // const currentPassword = this.changePasswordForm.value.currentPassword;
      // const newPassword = this.changePasswordForm.value.newPassword;
      // const confirmPassword = this.changePasswordForm.value.confirmPassword;
  
      // if (currentPassword !== this.authService.getData()) {
      //   this.errorMessage = 'Current password is incorrect.';
      //   return;
      // }
  
      // if (newPassword !== confirmPassword) {
      //   this.errorMessage = 'New password and confirm password do not match.';
      //   return;
      // }
  
      // this.authService.updateData(newPassword).subscribe(
      //   () => {
      //     this.successMessage = 'Password updated successfully.';
      //     this.changePasswordForm.reset();
      //   },
      //   (error) => {
      //     this.errorMessage = 'An error occurred while updating the password.';
      //     console.error('Error updating password:', error);
      //   }
      // );
    }

  }
