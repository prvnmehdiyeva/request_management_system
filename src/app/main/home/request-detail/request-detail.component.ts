  import { Component, Input, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { InquiriesInfo } from '../../../models/inquiries-info';
  import { AuthService } from '../../../services/auth.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AppComment } from '../../../models/appcomment';
  import { v4 as uuidv4 } from 'uuid';
  import { isPlatformBrowser } from '@angular/common';
  import { RequestsService } from '../../../services/requests.service';
  import { CommentsService } from '../../../services/comments.service';
  import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
  import { Status } from '../../../models/status';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { MessageService } from 'primeng/api'; 


  @Component({
    selector: 'app-request-detail',
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.scss']
  })
  export class RequestDetailComponent implements OnInit {
    @Input() requestId: string = '';
    @Input() id: any = '';
    @Input() userName: any = '';
    @Input() userJob: any = '';
    defaultStatus: string = "Closed";
    form: FormGroup;
    formRequest!: FormGroup;
    public filteredInquiries: InquiriesInfo[] = [];
    public request$!: Observable<InquiriesInfo[]> ;
    public lastComment$!: Observable<any>;
    public status$!: Observable<Status[]> ;
    private myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    comments$: Observable<AppComment[]> = this.myData.asObservable();

    now:string=''
    activeItem: string = 'commentButton';
    newCommentTitle: string='';
    newCommentText: string='';
    currentUser: any;
    submitted = false;
    isSubmitting:boolean  = false;



    constructor(
      private fb: FormBuilder, 
      private route: ActivatedRoute, 
      private router: Router, 
      public authService: AuthService, 
      public requestService: RequestsService, 
      public commentsService: CommentsService, 
      @Inject(PLATFORM_ID) 
      private platformId: Object,
      private snackBar: MatSnackBar,
      private messageService: MessageService
    ) {
      this.form = this.fb.group({
        title: ['', Validators.required],
        text: ['', Validators.required],
      });
      this.formRequest = this.fb.group({
        prioritet: ['', Validators.required],
        requesttype: ['', Validators.required],
        result: ['', Validators.required],
        solution: ['', Validators.required],
        execution: ['', Validators.required],
        planned: ['', Validators.required],
        type: ['', Validators.required],
        sender: ['', [Validators.required, Validators.maxLength(30)]],
        solman: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        contact:  ['', Validators.required],
        code: ['', Validators.required],
        root:['', Validators.required],
        routine:[''],
      });
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.requestId = params.get('requestId') || '';

        if(isPlatformBrowser(this.platformId)){
          const currentUserString = sessionStorage.getItem('currentUser');

          if (currentUserString) {
            const currentUser = JSON.parse(currentUserString);
            this.id = currentUser.id || '';
            this.userName = currentUser.name || '';
            this.userJob = currentUser.userJob || '';

            console.log('Inquiry ID:', this.requestId);
            console.log('User ID:', this.id);

            this.request$ = this.requestService.getRequestById(this.requestId).pipe(
              map(request => Array.isArray(request) ? request : [request]) 
            );       
            this.getComments();
            this.nowDate();
          } else {
            console.error('currentUser not found in sessionStorage.');
          }
        }
      });
      this.getStatus();
    }

    nowDate(){
      const now = new Date();
      this.now = now.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    }

    toggleActive(buttonId: string) {
      this.activeItem = buttonId;
    }

    getStatus(){
      this.status$= this.authService.getStatus();
    }

    getComments(){
      this.comments$ = this.commentsService.getComments();
      this.lastComment$ = this.comments$.pipe(
        map(comments => comments.length > 0 ? comments[comments.length - 1] : null)
      );
    } 

    addComment() { 
      const newComment: AppComment = {
        ID: uuidv4(),
        user_id: this.id,
        request_id: this.requestId,
        name: this.userName,
        title: this.form.value.title,
        text: this.form.value.text
      };
      this.comments$ = this.commentsService.addComment(newComment).pipe(
        switchMap(() => this.commentsService.getComments())
      );
  // use toast here !reminder for me
      this.form.reset();
    }
    

    updateStatus(newStatus: string) {
      this.request$ = this.request$.pipe(
        map(requests => {
          return requests.map(request => {
            if (request.id.toString() === this.requestId) {
              const updatedRequest = { ...request, Status: newStatus };
              console.log('Updated requet:', updatedRequest);
              this.requestService.updateRequestStatusById(this.requestId, newStatus, request).subscribe(
                () => {
                  this.router.navigate(['/main/requests']); 
                }
              );
              return updatedRequest;
            }
            return request; 
          });
        })
      );
    }
    
    addInfo() {
      this.submitted = true;
    
      const controlsToCheck = ['prioritet', 'requesttype', 'result', 'solution', 'execution', 'planned', 'type', 'sender', 'solman', 'contact', 'code', 'root'];
    
      if (controlsToCheck.some(controlName => this.formRequest.get(controlName)?.invalid)) {
        this.openSnackBar('Please fill in all required fields', 'Close');
        return;
      }
    
      const formRequestData = {
        prioritet: this.formRequest.get('prioritet')?.value || 'Low',
        requesttype: this.formRequest.get('requesttype')?.value || 'APP Change',
        result: this.formRequest.get('result')?.value || '',
        solution: this.formRequest.get('solution')?.value || '',
        execution: this.formRequest.get('execution')?.value || '',
        planned: this.formRequest.get('planned')?.value || '',
        type: document.querySelector('input[name="inlineRadioApp"]:checked')?.getAttribute('value') || '',
        sender: this.formRequest.get('sender')?.value || '',
        solman: this.formRequest.get('solman')?.value || '',
        contact: document.querySelector('input[name="inlineRadio"]:checked')?.getAttribute('value') || '',
        code: this.formRequest.get('code')?.value || '',
        root: this.formRequest.get('root')?.value || '',
        routine: (document.getElementById('gridCheck') as HTMLInputElement)?.checked || false
      };
    
      this.request$ = this.request$.pipe(
        map(requests => {
          return requests.map(request => {
            if (request.id.toString() === this.requestId) {
              this.requestService.updateRequestStatus(this.requestId, formRequestData, request).subscribe(
                () => {
                  this.showToast();
                  this.isSubmitting = true;
                  setTimeout(() => {
                    this.router.navigate(['/main/requests']);
                  }, 3000);
                }
              );
            }
            return request;
          });
        })
      );
    }
    
    
    private openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 5000,
      });
  }
  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
  }
  showToastMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment sent successfully' });
  }
  }
