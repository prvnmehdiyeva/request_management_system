import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilechangedialog',
  templateUrl: './profilechangedialog.component.html',
  styleUrl: './profilechangedialog.component.scss'
})
export class ProfilechangedialogComponent {
  constructor(public dialogRef: MatDialogRef<ProfilechangedialogComponent>, private router: Router) {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['../inquiries']);
    }, 2000);
  }
}
