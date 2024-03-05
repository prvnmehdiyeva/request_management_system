import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() openDialogEvent = new EventEmitter<void>();

  @Input() name:string=''
  @Input() id: string = '';
  userId: any;
  currentComponent: string = 'home';
  userName: any;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private authService:AuthService){}
 
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
   this.getUserName()
  }

  openDialog(page:string) {
      this.currentComponent=page
    this.openDialogEvent.emit();
  }
  getUserName(): void {
    this.route.params.subscribe(params => {
      console.log("🚀 ~ HeaderComponent ~ getUserName ~ params:", params['name'])

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
