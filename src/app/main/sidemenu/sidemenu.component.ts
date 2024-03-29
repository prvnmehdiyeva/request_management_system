import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input() id: string='';
  @Input() name: string='';
  userName: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.id) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

    if (!this.userName) {
      this.route.queryParams.subscribe(params => {
        this.userName = params['name'] || '';
      });
    }
  }
}
