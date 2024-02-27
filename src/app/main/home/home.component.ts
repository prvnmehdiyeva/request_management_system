import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InquiriesInfo } from '../../models/inquiries-info';
import { InfoService } from '../../services/info/info.service';
import { Status } from '../../models/status';
import { CreateNewComponent } from '../create-new/create-new.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {
  currentPage=0
  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  searchByID: string = '';
  searchBySender: string = '';
  searchByText: string = '';
  searchByTitle: string = '';
  searchByCategory: string = '';
  searchByExecutor: string = '';
  searchByDate: string = '';
  public cards: InquiriesInfo[]=[]
  public status!: Status[] ;
  public selectedStatus: any | null = "All";
  filteredInquiries: InquiriesInfo[] = [];
  constructor(public infoService:InfoService, private dialog: MatDialog
    ){}
  ngOnInit(): void {
    this.getAllInfo()
    this.getAllStatus()
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateNewComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(`Dialog result: ${res}`);
      }
    });
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

  getStatusCount(status:any){
    let count =0
    if(status==="All"){
      count = this.cards.length;
    } else{
      count = this.cards.filter(inquiry => inquiry.Status === status).length;
    }
    return count
    }


    changeStatus(status: any) {
      this.selectedStatus = status;
      console.log('Selected Status:', status);
      if (status === null || status === 'All') {
        this.selectedStatus = 'All';
        this.filteredInquiries = this.cards;
      } else {
        this.selectedStatus = status;
        this.filteredInquiries = this.cards.filter(c => c.Status === status);
      }
      console.log('Filtered Inquiries:', this.filteredInquiries);
    }
    
    searchID(searchByID:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.ID.toString().includes(searchByID.toString())
      })
    }
    searchSender(searchBySender:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Sender.toLowerCase().includes(searchBySender.toLowerCase())
      })
    }
    searchTitle(searchByTitle:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Title.toLowerCase().includes(searchByTitle.toLowerCase())
      })
    }
    searchText(searchByText:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Text.toLowerCase().includes(searchByText.toLowerCase())
      })
    }
    searchCategory(searchByCategory:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Category.toLowerCase().includes(searchByCategory.toLowerCase())
      })
    }
    searchExecutor(searchByExecutor:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Executor.toLowerCase().includes(searchByExecutor.toLowerCase())
      })
    }
    searchDate(searchByDate:string){
      this.filteredInquiries = this.cards.filter((i)=>{
      return i.Date.toString().includes(searchByDate.toString())
      })
    }

    handlePageEvent(pageEvent:PageEvent){
      console.log('handlePageEvent',pageEvent);
      this.pageSize = pageEvent.pageSize;
      this.currentPage=pageEvent.pageIndex
      this.filterData()
    }
    filterData(): void {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.filteredInquiries = this.cards.slice(startIndex, endIndex);
    }
  }
  
