import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  // { path: 'bookingDetails', component: BookingDetailsComponent }
  { path: 'spot-details/:id', component: BookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
