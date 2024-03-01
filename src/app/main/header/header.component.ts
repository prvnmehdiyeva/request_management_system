import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() name:string=''
  @Input() id: string = '';
  userId: any;
  userName: any;
  constructor(private route: ActivatedRoute, private authService:AuthService){}
 
  
    ngOnInit(): void {
   this.getUserName()
  }

  getUserName(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);  // 1
  
      this.authService.getUsers().subscribe(users => {
        const user = users.find((user: any) => {
          return user.id === this.userId;
        });
        if (user) {
          this.userName = user.name;
          console.log(this.userName);
        }
      });
    });
  }
}
