import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InquiriesInfo } from '../../../models/inquiries-info';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComment } from '../../../models/appcomment';
import { v4 as uuidv4 } from 'uuid';
import { isPlatformBrowser } from '@angular/common';
import { RequestsService } from '../../../services/requests.service';
import { CommentsService } from '../../../services/comments.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { Status } from '../../../models/status';

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
  public comments$!: Observable<AppComment[]>
  public lastComment$!: Observable<any>;
  public status$!: Observable<Status[]> ;

  now:string=''
  activeItem: string = 'requestButton';
  newCommentTitle: string='';
  newCommentText: string='';
  currentUser: any;


  constructor(private fb:FormBuilder, private route: ActivatedRoute,private router:Router, public authService: AuthService,  public requestService: RequestsService, public commentsService: CommentsService, @Inject(PLATFORM_ID) private platformId:Object) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.formRequest = this.fb.group({
      id: ['', [Validators.required]],
      request_id: ['', [Validators.required]],
      Sender: ['', Validators.required],
      Title: ['', Validators.required],
      Text: ['', Validators.required],
      Executor:  ['', Validators.required],
      Category: ['', Validators.required],
      Date:['', Validators.required],
      Status:['', Validators.required],
      Prioritet: ['', Validators.required],
      Type: ['', Validators.required],
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


// request ID
        this.request$ = this.requestService.getRequestById(this.requestId).pipe(
          map(request => Array.isArray(request) ? request : [request]) 
        );       
          this.getComments();
          this.nowDate();
        } else {
          console.error('currentUser not found in sessionStorage.');
        }
      }
      })
      this. getStatus()
  }


  nowDate(){
    const now = new Date();
    this.now = now.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
  }

  toggleActive(buttonId: string) {
    this.activeItem = buttonId;
  }

  getStatus(){
    this.status$= this.authService.getStatus()
  }
  getComments(){
    this.comments$ = this.commentsService.getComments()
    this.lastComment$ = this.comments$.pipe(
      map(comments => comments.length > 0 ? comments[comments.length - 1] : null)
    );
  } 

  addComment() { 
      const newComment: AppComment = {
        ID:uuidv4(),
        user_id: this.id,
        request_id: this.requestId,
        name: this.userName,
        title: this.form.value.title,
        text: this.form.value.text
      };

      this.commentsService.addComment(newComment).pipe(
        switchMap(response =>{
          return this.comments$.pipe(
            map(comments=>{
              comments.unshift(response);
              console.log(response);
              this.form.reset();
              return comments
            }) 
          )
        })
      ).subscribe()
    
  }
  updateStatus(newStatus: string) {
    this.request$ = this.request$.pipe(
      map(requests => {
        return requests.map(request => {
          if (request.id.toString() === this.requestId) {
            const updatedRequest = { ...request, Status: newStatus };
            console.log('Updated request:', updatedRequest);
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
  
  
  
}
