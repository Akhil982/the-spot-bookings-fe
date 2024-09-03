import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/authentication/auth.service';
import { LoaderService } from '../service/loader/loader.service';
import { Router } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInForm!: FormGroup;

  constructor(private loaderService: LoaderService, private authService: AuthService, private router: Router, private branchService: BranchService){

  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    this.signInSpotUser();
  }

  signInSpotUser(){
    this.loaderService.show();
    this.authService.signInSpotUser(this.signInForm.value).subscribe(response => {
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        this.loaderService.hide();
        this.authService.isUserLoggedIn.next(true);
        if(this.authService.isUserLoggedIn){
          this.router.navigate(['/spot-details', this.branchService.expandedBranchId.value]);
        } else{
          this.router.navigate(['/booking']);
        }
      }
    });
  }

  signInClicked(): void {
    console.log('Sign Up button clicked');
  }

}
