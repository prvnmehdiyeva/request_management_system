import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change-success-dialog',
  templateUrl: './password-change-success-dialog.component.html',
  styleUrl: './password-change-success-dialog.component.scss'
})
export class PasswordChangeSuccessDialogComponent {
  constructor(public dialogRef: MatDialogRef<PasswordChangeSuccessDialogComponent>, private router: Router) {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['/login']);
    }, 9000);
  }

}
