import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeSuccessDialogComponent } from './password-change-success-dialog/password-change-success-dialog.component';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ],],
      confirmPassword: ['', Validators.required],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || ''; 
    });
  }

  onSubmit() {
    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
  
    this.authService.getUsers().subscribe(
      (data: any[]) => {
        const user = data.find(user => user.id === this.id && user.password === currentPassword);
        if (user) {
          if (newPassword === confirmPassword) {
            this.authService.updateUserPassword(user.id, newPassword, user.name).subscribe(
              () => {
                this.openSuccessDialog();
                this.changePasswordForm.reset();
                
              },
              error => {
                this.errorMessage = 'An error occurred while updating the password.';
                console.error('Error updating password:', error);
              }
            );
          } else {
            this.openSnackBar('New password and confirm password do not match.');
          }
        } else {
          this.openSnackBar('Current password is incorrect.');
        }
      },
      error => {
        this.openSnackBar('An error occurred while getting user data.');
        console.error('Error getting user data:', error);
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000, 
      verticalPosition: 'top' 
    });
  }
  openSuccessDialog() {
    this.dialog.open(PasswordChangeSuccessDialogComponent, {
      width: '400px',
      position: { top: '20%' }
    });
  }
}
