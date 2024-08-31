import { Component } from '@angular/core';
import { BranchService } from '../service/branch/branch.service';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader/loader.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  constructor(private branchService: BranchService, private router: Router, private loaderService: LoaderService){

  }

  branches: any[] = [];

  ngOnInit(){
    this.getSpotBranches();
  }

  getSpotBranches(){
    this.loaderService.show();
    this.branchService.getSpotBranches().subscribe(response => {
      this.branches = response.data;
      this.loaderService.hide();
    });
  }

  expandBranch(id: string){
    this.branchService.expandedBranchId.next(id);
    this.router.navigate(['/bookingDetails']);
  }

}
