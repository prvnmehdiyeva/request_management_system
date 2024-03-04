import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  @Input() id: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
  })
}

}
