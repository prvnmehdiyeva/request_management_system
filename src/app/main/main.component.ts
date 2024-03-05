import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  currentComponent: string = 'home';

  constructor(private router: Router){}
  
  onMenuItemSelected(menuItem: string) {
    this.currentComponent = menuItem;
  }
}
