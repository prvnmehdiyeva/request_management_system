import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  @Input() id: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });  
  }

}
