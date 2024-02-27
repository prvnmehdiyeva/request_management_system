import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent {
  form: FormGroup;

constructor(private fb:FormBuilder){
  this.form = this.fb.group({
    category: [''],
    priority: [''],
    type: [''],
    title: [''],
    text: ['']
  });
}

}
