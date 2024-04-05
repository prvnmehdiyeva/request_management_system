import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeSuccessDialogComponent } from './password-change-success-dialog/password-change-success-dialog.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() id: string = '';
  changePasswordForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) 
    private platformId: Object,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ],],
      confirmPassword: ['', Validators.required],
      name: ['']
    });
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      const currentUserString = sessionStorage.getItem('currentUser');

      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        this.id = currentUser.id || '';
       
      } else {
        console.error('currentUser not found in sessionStorage.');
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        this.snackBar.open('Please fill in all fields.', 'Close', {
            duration: 4000
        });
        return;
    }

    if (newPassword !== confirmPassword) {
        this.snackBar.open('New password and confirm password do not match.', 'Close', {
            duration: 4000
        });
        return;
    }

    this.authService.getUsers().subscribe(
        (data: any[]) => {
            const user = data.find(user => user.id === this.id && user.password === currentPassword);
            if (user) {
                this.authService.updateUserPassword(user.id, newPassword, user).subscribe(
                    () => {
                        this.openSuccessDialog();
                    },
                    error => {
                        this.errorMessage = 'An error occurred while updating the password.';
                        console.error('Error updating password:', error);
                    }
                );
            } else {
                this.snackBar.open('Current password is incorrect.', 'Close', {
                    duration: 4000
                });
            }
        },
        error => {
            this.errorMessage = 'An error occurred while getting user data.';
            console.error('Error getting user data:', error);
        }
    );
}

  openSuccessDialog() {
    this.dialog.open(PasswordChangeSuccessDialogComponent, {
      width: '400px',
      position: { top: '15%' }
    });
  }
}
