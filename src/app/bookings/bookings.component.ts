import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../service/authentication/auth.service';
import { Booking } from '../models/booking';
import { LoaderService } from '../service/loader/loader.service';
import { BookingsService } from '../service/bookings/bookings.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

  bookings: Booking[] = [];

  constructor(private authService: AuthService, private loaderService: LoaderService, private bookingsService: BookingsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.authService.isUserLoggedIn.next(true);
    }
    const userId = localStorage.getItem('userId')
    if(userId){
      this.getBookingsByUserId(userId);
    }
  }

  getBookingsByUserId(userId: string){
    this.loaderService.show();
    this.bookingsService.getBookingsByUserId(userId).subscribe(response => {
      this.bookings = response.data;
      this.loaderService.hide();
    });
  }
  openPopup(templateRef: TemplateRef<any>){ 
    this.dialog.open(templateRef, { width: '670px' });
  } 
}
