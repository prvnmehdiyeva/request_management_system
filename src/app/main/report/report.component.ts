import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InquiriesInfo } from '../../models/inquiries-info';
import { Status } from '../../models/status';
import { CreateNewComponent } from '../create-new/create-new.component';
import { PageEvent } from '@angular/material/paginator';
import { UsersInfo } from '../../models/users-info';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { fadeOpacityAnimation } from '../../animations/fade.animation';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  @Output() menuItemSelected = new EventEmitter<string>();
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
  @Input() id: string = '';

  public inquiries$: Observable<InquiriesInfo[]> | undefined
  public filteredRequests$: Observable<InquiriesInfo[]> | undefined
  public users$: Observable<InquiriesInfo[]> | undefined
  public status$: Observable<Status[]> | undefined ;
  public selectedStatus: any | null = "All";
  statusCounts: any = {};

  constructor(public authService:AuthService, public requestService:RequestsService, private dialog: MatDialog,private route: ActivatedRoute,
    private router:Router){}
    ngOnInit(): void {  
      const currentUserString = sessionStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString)
          this.id=currentUser.id
      }
        console.log('IDHome', this.id);
        this.getUsers();
        this.getInquiries(); 
        this.getStatus();
        this.getStatusCounts()
    } 
    selectMenuItem(menuItem: string) {
      this.menuItemSelected.emit(menuItem);
    }
  getUsers(){
    this.users$ = this.authService.getUsers()
  }
  getInquiries(){
    this.inquiries$ = this.requestService.getRequests();
    this.filteredRequests$ = this.requestService.getRequests();
  }
  getStatus(){
    this.status$= this.authService.getStatus()
  }

  getStatusCounts(): void {
    this.status$?.subscribe(statuses => {
      statuses.forEach(status => {
        this.getStatusCount(status.name);
      });
    });
  }
  getStatusCount(status: string): void {
    this.inquiries$?.pipe(
      switchMap(inquiries => {
        if (status === "All") {
          return of(inquiries.length);
        } else {
          return of(inquiries.filter(inquiry => inquiry.Status === status).length);
        }
      })
    ).subscribe(count => {
      this.statusCounts[status] = count;
    });
  }
  
   
    changeStatus(status: any) {
      this.selectedStatus = status;
      if (status === null || status === 'All') {
        this.selectedStatus = 'All';
        this.filteredRequests$ = this.inquiries$;
      } else {
        this.selectedStatus = status;
        this.filteredRequests$ = this.inquiries$?.pipe(
          map(inquiries => inquiries.filter((c: { Status: any; }) => c.Status === status))
        );

      }

    }
    search(filterData:string, searchData:string) {
      this.filteredRequests$ = this.inquiries$?.pipe(
        map(inquiries => inquiries.filter((i:any) => {
          if (filterData === "ID" || filterData === "Date") {
            return i[filterData].toString().includes(searchData.toString());
          } else {
            return i[filterData].toLowerCase().includes(searchData.toLowerCase());
          }
        }))
      );
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
      this.filteredRequests$ = this.inquiries$?.pipe(
        map(inquiries => inquiries.slice(startIndex, endIndex))
      );
    }
}
