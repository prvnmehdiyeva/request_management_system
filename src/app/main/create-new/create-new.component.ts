import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InquiriesInfo } from '../../models/inquiries-info';
import { RequestsService } from '../../services/requests.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';


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
  submitted = false;
  isSubmitting:boolean  = false;

  
  constructor(
    private fb:FormBuilder, 
    private route: ActivatedRoute, 
    private authService:AuthService, 
    private requestService:RequestsService, 
    @Inject(PLATFORM_ID) private platformId:Object,
    private snackBar: MatSnackBar,
    private router: Router, 
    private messageService: MessageService

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
  this.inquiries$ = this.requestService.getRequests();

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
  this.submitted=true
  const controlsToCheck = ['Title', 'Text', 'Category', 'Prioritet', "Type"];

if (controlsToCheck.some(controlName => this.form.get(controlName)?.invalid)) {
  this.openSnackBar('Please fill in all required fields', 'Close');
  return; 
}
  this.form.patchValue({ 
    Sender: this.name,
    Executor: this.name
  }); 
  const formValues = this.form.value;
  this.requestService.addRequest(formValues).pipe(
    switchMap(newRequest => {
      return this.inquiries$.pipe(
        map(inquiries => {
          inquiries.unshift(newRequest); 
          this.showToast()
          this.isSubmitting=true
          setTimeout(() => {
            this.router.navigate(['/main/requests']);
          }, 3000);
          return inquiries;
        })
      );
    })
  ).subscribe();
}

generateRandomNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
private openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 5000,
  });
}
showToast() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
}
}
