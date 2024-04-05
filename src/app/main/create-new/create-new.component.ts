import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InquiriesInfo } from '../../models/inquiries-info';
import { RequestsService } from '../../services/requests.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, of, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent implements OnInit {
  form: FormGroup;
  @Input() id: string = '';
  @Input() name: string = '';
  currentComponent: string = 'create-new'; 
  public inquiries$!: Observable<InquiriesInfo[]> 
  
  constructor(
    private fb:FormBuilder, 
    private route: ActivatedRoute, 
    private authService:AuthService, 
    private requestService:RequestsService, 
    @Inject(PLATFORM_ID) private platformId:Object
  )
  {
  this.form = this.fb.group({
    id: ['', [Validators.required]],
    request_id: [this.generateRandomNumber(), [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    Sender: ['', Validators.required],
    Title: ['', [Validators.required, Validators.maxLength(10)]],
    Text: ['', Validators.required],
    Executor:  ['', Validators.required],
    Category: ['', Validators.required],
    Date:new Date().toISOString().substring(0, 10),
    Status:['Closed', Validators.required],
    Prioritet: ['', Validators.required],
    Type: ['', Validators.required],
  });
}

ngOnInit(): void {
  if(isPlatformBrowser(this.platformId)){
    const currentUserString = sessionStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
 
      this.id = currentUser.id || '';
      this.name = currentUser.name || '';

    } else {
      console.error('currentUser not found in sessionStorage.');
    }
  }
}
addRequest() {
  this.form.patchValue({ 
    Sender: this.name,
    Executor: this.name
  }); 
  const formValues = this.form.value;
  this.requestService.addRequest(formValues).pipe(
    switchMap(newInquiry => {
      return this.inquiries$.pipe(
        map(inquiries => {
          inquiries.unshift(newInquiry); 
          return inquiries;
        })
      );
    })
  ).subscribe();
}

generateRandomNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

}
