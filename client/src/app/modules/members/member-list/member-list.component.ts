import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';
import { PaginatedResult, Pagination } from 'src/app/services/members-data/models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];
  pagination!: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }            
      }     
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMembers();
    } 
  } 
}
