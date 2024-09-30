import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookingCartComponent } from './booking-cart/booking-cart.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingDashboardComponent } from './booking-dashboard/booking-dashboard.component';

const routes: Routes = [
  {path: '',component:BookComponent},
  {path: 'login',component:LoginComponent},
  {path: 'login/:id',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  { path: 'booking-dashboard/:id', component: BookingDashboardComponent },
  { path: 'booking', component: BookComponent },
  { path: 'spot-details/:id', component: BookingDetailsComponent },
  { path: 'cart/:id', component: BookingCartComponent },
  { path: 'bookings', component: BookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
