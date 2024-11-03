import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../service/loader/loader.service';
import { AuthService } from '../service/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm!: FormGroup;

  constructor(private loaderService: LoaderService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private branchService: BranchService){

  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.email]),
      lastName: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    let signUpData = this.signUpForm.value;
    signUpData['role'] = 'USER';
    this.signUpSpotUser(signUpData);
  }

  signUpSpotUser(signUpData: any){
    this.loaderService.show();
    this.authService.signupSpotUser(signUpData).subscribe(response => {
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', response.data.role);
        this.loaderService.hide();
        this.authService.isUserLoggedIn.next(true);
        if(this.authService.isUserLoggedIn){
          this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
              this.router.navigate(['/cart', this.branchService.expandedBranchId.value]);
            } else{
              this.branchService.currentNavItem.next('book-now');
              this.router.navigate(['/booking']);
            }
          });

        } else{
          this.router.navigate(['/booking']);
        }
      }
    });
  }

  signUpClicked(): void {
    console.log('Sign Up button clicked');
  }


}
