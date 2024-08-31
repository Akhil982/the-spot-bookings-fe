import { Component } from '@angular/core';
import { BranchService } from '../service/branch/branch.service';
import { LoaderService } from '../service/loader/loader.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {

  constructor(private branchService: BranchService, private loaderService: LoaderService){}

  branch: any;

  ngOnInit(){
    this.expandedBranchIdSubscription();
  }

  expandedBranchIdSubscription(){
    this.branchService.expandedBranchId.subscribe(data => {
      this.getSpotBranchById(data);
    });
  }

  getSpotBranchById(id: string){
    this.loaderService.load500ms();
    this.branchService.getSpotBranchById(id).subscribe(response => {
      this.branch = response.data;
    });
  }


}
