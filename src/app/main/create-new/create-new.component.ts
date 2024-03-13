import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InquiriesInfo } from '../../models/inquiries-info';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent implements OnInit {
  form: FormGroup;
  @Input() id: string = '';
  currentComponent: string = 'create-new'; 
  public inquiries: InquiriesInfo[] = [];
constructor(private fb:FormBuilder ,private route: ActivatedRoute, private authService:AuthService
  ){
  this.form = this.fb.group({
    id: [''],
    category: ['', Validators.required],
    priority: ['', Validators.required],
    type: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required],
  });
}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    if (params['id']) {
      this.id = params['id'];
      console.log('ID:', this.id);
    } else {
      console.error('ID parameter is undefined or missing.');
    }
  });  
  this.addRequest()
}
addRequest() {
  const formValues = this.form.value;
  this.authService.addRequest(formValues).subscribe((response: any) => {
    this.inquiries.push(response);
    console.log(response);
  });
}
}
