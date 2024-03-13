import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InquiriesInfo } from '../../../models/inquiries-info';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComment } from '../../../models/appcomment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  @Input() inquiryId: string = '';
  @Input() id: any = '';
  @Input() userName: any = '';
  @Input() userJob: any = '';

  form: FormGroup;
  public filteredInquiries: InquiriesInfo[] = [];
  public inquiries: InquiriesInfo[] = [];
  public comments: AppComment[] = [];
  now:string=''
  activeItem: string = 'commentButton'; 
  newCommentTitle: string='';
  newCommentText: string='';

  constructor(private fb:FormBuilder, private route: ActivatedRoute, public authService: AuthService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.inquiryId = params.get('id') || '';
      
      const currentUserString = sessionStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);

        this.id = currentUser.id || '';
        this.userName = currentUser.name || '';
        this.userJob = currentUser.job || '';

        console.log('Inquiry ID:', this.inquiryId);
        console.log('User ID:', this.id);
        
        this.getInquiries(); 
        this.getComments();
        this.nowDate();
      } else {
        console.error('currentUser not found in sessionStorage.');
      }
    });
  } 

  nowDate(){
    const now = new Date();
    this.now = now.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
  }

  toggleActive(buttonId: string) {
    this.activeItem = buttonId;
  }

  getInquiries() {
    this.authService.getInquiries().subscribe(inquiries => {
      this.inquiries = inquiries;
      this.filteredInquiries = inquiries.filter((inquiry: { ID: { toString: () => string; }; }) => inquiry.ID && inquiry.ID.toString() === this.inquiryId);
    });
  } 

  getComments(){
    this.authService.getComments().subscribe(comments =>{
      this.comments = comments;
      console.log(comments);
    });
  }

  addComment() {
    if (this.form.valid) {
      const newComment: AppComment = {
        ID:uuidv4(),
        user_id: this.id,
        request_id: this.inquiryId,
        name: this.userName,
        title: this.form.value.title,
        text: this.form.value.text
      };

      console.log("New Comment:", newComment);

      this.authService.addComment(newComment).subscribe(
        (comment: AppComment) => {
          this.comments.unshift(comment); 
          this.form.reset(); 
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    } else{
      console.log("Form not valid");
    }
  }
}
