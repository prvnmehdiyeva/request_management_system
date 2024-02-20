import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
// import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  myForm: FormGroup ;
  constructor(private authService:AuthService,private fb: FormBuilder){
    this.myForm = this.fb.group({
      name: [''],
      password: ['']
    });
  }
  ngOnInit(): void {
   
  }
  onSubmit() {
  const name = this.myForm.get('name')?.value;
  const password = this.myForm.get('password')?.value;
  console.log(name , password);
  this.authService.getData().subscribe(data=> {
    console.log("🚀 ~ LoginComponent ~ this.authService.getData ~ data:", data)
    const user = data.find((user: any) => user.name === name && user.password === password)
    if(user){
      // this.snackbar.openSnackBar("Successfully logged in", "success")
      console.log("success");
      this.myForm.reset();
    } else{
      console.log("error");
    }
  })
  }
    
  
}
