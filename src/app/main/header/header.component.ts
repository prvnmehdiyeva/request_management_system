import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() name:string=''
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>this.name=params['name'])
  }

}
