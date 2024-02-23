import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  myForm: FormGroup ;
  isSubmitting: boolean = false;

  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router){
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
   
  }
  onSubmit() {
    this.isSubmitting = true;
  const name = this.myForm.get('name')?.value;
  const password = this.myForm.get('password')?.value;
  console.log(name , password);
  this.authService.getData().subscribe(data=> {
    console.log("🚀 ~ LoginComponent ~ this.authService.getData ~ data:", data)
    const user = data.find((user: any) => user.name === name && user.password === password)
    if(user){
      this.isSubmitting = true;

      
      console.log("success");
      setTimeout(() => {
        this.myForm.reset();
        this.isSubmitting = false;
        this.router.navigate(['/main'],{queryParams:{name:user.name}});
      }, 2000);
    } else{
      console.log("error");

      setTimeout(() => {
        this.myForm.reset();
        this.isSubmitting = false;
      }, 2000);
    }
  })
  }
  
}
