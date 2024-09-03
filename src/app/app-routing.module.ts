import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '',component:BookComponent},
  {path: 'login',component:LoginComponent},
  {path: 'login/:id',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  { path: 'booking', component: BookComponent },
  { path: 'spot-details/:id', component: BookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
