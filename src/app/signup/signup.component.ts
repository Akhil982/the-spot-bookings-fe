import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../service/loader/loader.service';
import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm!: FormGroup;

  constructor(private loaderService: LoaderService, private authService: AuthService){

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
      this.loaderService.hide();
    });
  }

  signUpClicked(): void {
    console.log('Sign Up button clicked');
  }


}
