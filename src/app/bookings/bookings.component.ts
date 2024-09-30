import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../service/authentication/auth.service';
import { Booking } from '../models/booking';
import { LoaderService } from '../service/loader/loader.service';
import { BookingsService } from '../service/bookings/bookings.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

  bookings: Booking[] = [];

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private bookingsService: BookingsService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private router: Router
  )
  { }

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

  openPopup(templateRef: TemplateRef<any>, booking: Booking){
    this.dialog.open(templateRef, { width: '670px', data: booking});
  }

  cancelBooking(id: string){
    this.loaderService.show();
    this.bookingsService.deleteBooking(id).subscribe(response => {
      if(response.data.id){
        this.toastrService.success('Booking for ' + response.data.branchName + response.data.branchArea + ' cancelled successfully')
      }
      const userId = localStorage.getItem('userId')
      if(userId){
        this.getBookingsByUserId(userId);
      }
    });
  }

  generatePDF(bookingDetails: HTMLElement) {
    html2canvas(bookingDetails, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('THE SPOT-invoice.pdf');
    }).catch(err => {
      console.error("Error generating PDF: ", err);
    });
  }

  viewBookingDetails(booking: any): void {
    console.log(booking);
  }


}
