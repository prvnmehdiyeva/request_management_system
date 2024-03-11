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

  now: Date = new Date();
  activeItem: string = 'historyButton'; 


  constructor(private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      console.log('Inquiry ID:', this.id);
      this.getInquiries(); 
    });
    this.now = new Date();
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
