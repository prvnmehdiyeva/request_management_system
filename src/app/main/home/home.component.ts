import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InquiriesInfo } from '../../models/inquiries-info';
import { InfoService } from '../../services/info/info.service';
import { Status } from '../../models/status';
import { FormControl } from '@angular/forms';
import { CreateNewComponent } from '../create-new/create-new.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
  constructor(public infoService:InfoService, public dialog: MatDialog
    ){}
  ngOnInit(): void {
    this.getAllInfo()
    this.getAllStatus()
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.position = {
      top: '50%',
      left: '50%',
    };
  
    const dialogRef = this.dialog.open(CreateNewComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
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
  }
  
