import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InquiriesInfo } from '../../../models/inquiries-info';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  @Input() id: string = '';
  public filteredInquiries: InquiriesInfo[] = [];
  public inquiries: InquiriesInfo[] = [];
  now:string=''
  activeItem: string = 'requestButton'; 


  constructor(private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      console.log('Inquiry ID:', this.id);
      this.getInquiries(); 
      this.nowDate()
    });

    
  }
  nowDate(){
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    return formattedDate
  }
  toggleActive(buttonId: string) {
    this.activeItem = buttonId;
  }
  getInquiries() {
    this.authService.getInquiries().subscribe(inquiries => {
    this.inquiries = inquiries;
    this.filteredInquiries = inquiries.filter((inquiry: { ID: { toString: () => string; }; }) => inquiry.ID.toString() === this.id);
    console.log(this.filteredInquiries);
    });
  } 
}
