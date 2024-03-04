import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  currentComponent: string = 'home'; 
  id: any;

  constructor(private router: Router){}
  
  openDialog() {
    this.currentComponent = 'create-new';
  }
  goBack() {
    this.currentComponent = 'home';
    this.router.navigate(['/users', this.id]);
  }
}
