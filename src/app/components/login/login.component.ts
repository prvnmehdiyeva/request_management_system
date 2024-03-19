import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { fadeDelayedAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadeDelayedAnimation],

})
export class LoginComponent implements OnInit {
  myForm: FormGroup ;
  isSubmitting: boolean = false;

  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router,private sessionStorageService:SessionstorageService){
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.display = 'none';
      }
    }, 4000);
  
  }
  onSubmit() {
    this.isSubmitting = true;
  const name = this.myForm.get('name')?.value;
  const password = this.myForm.get('password')?.value;
  console.log(name , password);
  this.authService.getUsers().subscribe(data=> {
    console.log("🚀 ~ LoginComponent ~ this.authService.getUsers ~ data:", data)
    const user = data.find((user: any) => user.name === name && user.password === password)
    if(user){
      this.sessionStorageService.setItem("currentUser",user)
      this.isSubmitting = true;
      console.log("success");
      setTimeout(() => {
        this.myForm.reset();
        this.isSubmitting = false;
        this.router.navigate(['main/users', user.id],{queryParams:{name:user.name}});
      }, 2000);
    } else{
      console.log("error");

      setTimeout(() => {
        this.myForm.reset();
        this.isSubmitting = false;
      }, 2000);
    }
  },
  (error) => {
    console.error("Error getting user data:", error);
    // Handle error (e.g., show error message to user)
  })
  }
  
}
