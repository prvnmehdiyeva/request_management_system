import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { fadeInAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [fadeInAnimation],
})
export class HeaderComponent implements OnInit {

  @Input() name:string=''
  @Input() id: string | null = '';
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private authService:AuthService,private router: Router){}
 
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id') || ''; 
        console.log('ID', this.id);
        this.getUserName()
      });

  }
  getUserName(){
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString)
        this.name=currentUser.name
    }
  }
}
