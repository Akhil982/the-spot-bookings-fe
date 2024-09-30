import { Component } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { LineController, LineElement, PointElement } from 'chart.js'
import { BookingsService } from '../service/bookings/bookings.service';
import { AdminService } from '../service/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../service/loader/loader.service';

@Component({
  selector: 'app-booking-dashboard',
  templateUrl: './booking-dashboard.component.html',
  styleUrl: './booking-dashboard.component.css'
})
export class BookingDashboardComponent {

  constructor(private adminService: AdminService, private route: ActivatedRoute, private loaderService: LoaderService){

  }

  ngOnInit(): void {
    this.paramsSubscription();
    Chart.register(BarController, LineController,  BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title);
    this.loadBookingsChart();
  }

  paramsSubscription(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loaderService.show();
        this.getRevenueData(id);
      }
    });
  }

  loadRevenueChart(labels: any, data: any): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    });
    this.loaderService.hide();
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

  getRevenueData(branchId: string){
    this.adminService.getRevenueData(branchId).subscribe(response => {
      if(response.data){
        const labels = response.data.map((item: any) => {
          const date = new Date(item.date + "-01");
          return date.toLocaleString('en-US', { month: 'short' });
      });
      const data = response.data.map((item: any) => item.price);
      this.loadRevenueChart(labels, data);
      }
    });
  }

}
