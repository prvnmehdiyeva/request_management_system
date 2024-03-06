import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() name:string=''
  @Input() id: string | null = '';
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private authService:AuthService,private router: Router){}
 
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id') || ''; 
        console.log('ID', this.id);
      });

      this.route.queryParams.subscribe(params => {
    this.name = params['name'];
    console.log('Name:', this.name);
  });
  }
}
