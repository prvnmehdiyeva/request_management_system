import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  currentComponent: string = 'create-new'; 

constructor(private fb:FormBuilder ,private route: ActivatedRoute,
  ){
  this.form = this.fb.group({
    category: [''],
    priority: [''],
    type: [''],
    title: [''],
    text: ['']
  });
}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });  
  } 
  

}
