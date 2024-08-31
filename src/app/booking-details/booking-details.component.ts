import { Component } from '@angular/core';
import { BranchService } from '../service/branch/branch.service';
import { LoaderService } from '../service/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {

  constructor(private branchService: BranchService, private loaderService: LoaderService, private route: ActivatedRoute){}

  branch: any;

  ngOnInit(){
    //this.expandedBranchIdSubscription();
    this.paramsSubscription();
  }

  paramsSubscription(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loaderService.show();
        this.getSpotBranchById(id);
      }
    });
  }

  expandedBranchIdSubscription(){
    this.branchService.expandedBranchId.subscribe(data => {
      this.getSpotBranchById(data);
    });
  }

  getSpotBranchById(id: string){
    this.loaderService.show();
    this.branchService.getSpotBranchById(id).subscribe(response => {
      this.branch = response.data;
      this.loaderService.hide();
    });
  }


}
