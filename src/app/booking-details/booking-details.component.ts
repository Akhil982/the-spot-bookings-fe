import { Component } from '@angular/core';
import { BranchService } from '../service/branch/branch.service';
import { LoaderService } from '../service/loader/loader.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {

  constructor(private branchService: BranchService, private loaderService: LoaderService, private route: ActivatedRoute, private authService: AuthService, private router: Router){}

  branch: any;
  isUserLoggedIn: boolean = false;

  ngOnInit(){
    //this.expandedBranchIdSubscription();
    this.paramsSubscription();
    this.loggedInSubscription();
  }

  loggedInSubscription(){
    this.authService.isUserLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
    });
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

  bookNow(){
    if(!this.isUserLoggedIn){
      this.router.navigate(['/login', this.branchService.expandedBranchId.value]);
    }
  }


}
