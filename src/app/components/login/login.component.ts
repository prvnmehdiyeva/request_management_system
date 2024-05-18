import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { fadeDelayedAnimation } from '../../animations/fade.animation';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadeDelayedAnimation],

})
export class LoginComponent implements OnInit {
  myForm: FormGroup ;
  isSubmitting: boolean = false;
  overlayVisible: boolean = true;

  

  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router,private sessionStorageService:SessionstorageService, @Inject(PLATFORM_ID) private platformId: Object, private snackBar: MatSnackBar
){
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          overlay.remove();
        }
      }, 2000);
    }
  }
  onSubmit() {
    this.isSubmitting = true;
  const name = this.myForm.get('name')?.value;
  const email = this.myForm.get('email')?.value;
  const password = this.myForm.get('password')?.value;
  console.log(name , password);
  if (isPlatformBrowser(this.platformId)) {
  this.authService.getUsers().subscribe(data=> {
    console.log("🚀 ~ LoginComponent ~ this.authService.getUsers ~ data:", data)
    const user = data.find((user: any) => user.email === email && user.password === password)
    if(user){
      this.sessionStorageService.setItem("currentUser",user)
      this.isSubmitting = true;
      console.log("success");
      this.snackBar.open('Login Successful', 'Close', { duration: 2000 });

      setTimeout(() => {
        this.myForm.reset();
        // this.isSubmitting = false;
        this.router.navigate(['main/account','requests']);
      }, 1500);
    } else{
      console.log("error");
      this.snackBar.open('Invalid Form', 'Close', { duration: 2000 });


      setTimeout(() => {
        this.myForm.reset();
        this.isSubmitting = false;
      }, 200);
    }
  },
  (error) => {
    console.error("Error getting user data:", error);
  })
  }
  }
}
