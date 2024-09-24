import { Component } from '@angular/core';
import { BranchService } from '../service/branch/branch.service';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader/loader.service';
import { AuthService } from '../service/authentication/auth.service';
import { AdminService } from '../service/admin/admin.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  userPage: boolean = true;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private loaderService: LoaderService,
    private authService: AuthService,
    private adminService: AdminService
  ){ }

  branches: any[] = [];
  adminBranches: any[] = [];

  ngOnInit(){
    this.userPage = true;
    if(localStorage.getItem('token')){
      this.authService.isUserLoggedIn.next(true);
    }
    if(localStorage.getItem('role') && localStorage.getItem('role') === 'SUPER_ADMIN'){
      this.userPage = false;
      this.getAdminBranches();
    } else {
      this.userPage = true;
      this.getSpotBranches();
    }
  }

  getSpotBranches(){
    this.loaderService.show();
    this.branchService.getSpotBranches().subscribe(response => {
      this.branches = response.data;
      this.loaderService.hide();
    });
  }

  getAdminBranches(){
    this.loaderService.show();
    this.adminService.getAdminBranches().subscribe(response => {
      this.adminBranches = response.data;
      this.loaderService.hide();
    });
  }

  expandBranch(id: string){
    this.branchService.expandedBranchId.next(id);
    this.router.navigate(['/spot-details', id]);
  }

}
