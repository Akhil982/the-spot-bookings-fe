import { Component } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { LineController, LineElement, PointElement } from 'chart.js'

@Component({
  selector: 'app-booking-dashboard',
  templateUrl: './booking-dashboard.component.html',
  styleUrl: './booking-dashboard.component.css'
})
export class BookingDashboardComponent {

  ngOnInit(): void {
    Chart.register(BarController, LineController,  BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title);
    this.loadRevenueChart();
    this.loadBookingsChart();
  }

  loadRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [1200, 1900, 3000, 5000, 2000, 3000],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    });
  }

  loadBookingsChart(): void {
    const ctx = document.getElementById('bookingsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Bookings',
          data: [10, 15, 22, 17, 25, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }
    });
  }

}
