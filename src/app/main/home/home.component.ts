import { Component, OnInit } from '@angular/core';
import { InquiriesInfo } from '../../models/inquiries-info';
import { InfoService } from '../../services/info/info.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public cards: InquiriesInfo[]=[]
  public status!: Status[] ;
  public selectedStatus: any | null = null;
  filteredInquiries: InquiriesInfo[] = [];
  constructor(public infoService:InfoService){}
  ngOnInit(): void {
    this.getAllInfo()
    this.getAllStatus()
  }
  getAllInfo(){
    this.infoService.getInfo().subscribe((data)=>{
      this.cards=data
      this.filteredInquiries = data
    })
  }
  getAllStatus(){
    this.infoService.getStatus().subscribe((data)=>this.status=data)
  }
  getStatusCount(status:string){
     return this.cards.filter(card=>card.Status===status)
    }
    changeStatus(status: any) {
      this.selectedStatus = status;
      console.log('Selected Status:', status);
      if (!status) {
        this.filteredInquiries = this.cards;
      } else {
        this.filteredInquiries = this.cards.filter(c => c.Status === status);
      }
      console.log('Filtered Inquiries:', this.filteredInquiries);
    }
    
  }
  
