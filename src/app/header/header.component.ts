import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(){
    this.loggedInSubscription();
  }

  loggedInSubscription(){
    this.authService.isUserLoggedIn.subscribe(data => {
      this.isUserLoggedIn = data;
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
}
