import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isUserLoggedIn: boolean = false;
  currentNavItem: string = '';

  constructor(private router: Router, public authService: AuthService, public branchService: BranchService){

  }

  ngOnInit(){
    this.loggedInSubscription();
    this.navItemSubscription();
  }

  loggedInSubscription(){
    this.authService.isUserLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
    });
  }

  navItemSubscription(){
    this.branchService.currentNavItem.subscribe(data => {
      this.currentNavItem = data;
    });
  }

  loginPage(){
    this.router.navigate(['/login']);
  }

  getFullName(){
    if(localStorage.getItem('token')){
      const firstName = localStorage.getItem('firstName');
      const lastName = localStorage.getItem('lastName');
      return firstName+' '+lastName;
    }
    return '';
  }

  logout(){
    this.router.navigate(['']);
    localStorage.clear();
    this.authService.isUserLoggedIn.next(false);
  }

  openBookings(){
    this.branchService.currentNavItem.next('bookings');
    this.router.navigate(['/bookings'])
  }

  bookNow(){
    this.branchService.currentNavItem.next('book-now');
    this.router.navigate(['/booking']);
  }
}
