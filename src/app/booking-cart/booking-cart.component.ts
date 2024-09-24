import { Component, TemplateRef } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../service/cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../service/loader/loader.service';
import { BookingsService } from '../service/bookings/bookings.service';
import { Booking } from '../models/booking';
import { AuthService } from '../service/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-booking-cart',
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css'
})
export class BookingCartComponent {

  cartItems: Cart[] = [];
  branch: any;
  branchForm!: FormGroup;
  isButtonDisabled = true;

  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private bookingsService: BookingsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private branchService: BranchService,
    private router: Router,
    private dialog: MatDialog,
  ){ }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.authService.isUserLoggedIn.next(true);
    }
    if(!this.branch){
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.loaderService.show();
          this.getSpotBranchById(id);
        }
      });
    }
    this.createForm();
    this.branchForm.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.branchForm.valid;
    });
  }

  getSpotBranchById(id: string){
    this.loaderService.show();
    this.branchService.getSpotBranchById(id).subscribe(response => {
      this.branch = response.data;
      this.loaderService.hide();
    });
  }

  createForm() {
    this.branchForm = this.fb.group({
      sports: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['1 Hr', Validators.required],
      court: ['', Validators.required],
    });
  }

  adjustDuration(isIncrement: boolean) {
    const currentDuration = parseInt(this.branchForm.get('duration')?.value || '1');
    const newDuration = isIncrement ? currentDuration + 1 : Math.max(1, currentDuration - 1);
    this.branchForm.get('duration')?.setValue(`${newDuration} Hr`);
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  get isFormValid() {
    return this.branchForm.valid;
  }

  addToCart(){
    if(this.branchForm.valid){
      let newCartItem = new Cart();
      newCartItem.courtName = this.branchForm.controls['court'].value;
      newCartItem.date = this.branchForm.controls['date'].value;
      newCartItem.startTime = this.branchForm.controls['startTime'].value;
      newCartItem.endTime = this.calculateEndTime();
      newCartItem.price = this.calculatePrice();
      newCartItem.sport = this.branchForm.controls['sports'].value;
      this.cartItems.push(newCartItem);
      this.branchForm.reset();
    }
    else{
      this.toastr.error('Enter all booking details')
    }
  }

  calculateEndTime() {
    const startTime: string = this.branchForm.controls['startTime'].value;
    const duration: string = this.branchForm.controls['duration'].value;
    const durationHours: number = parseInt(duration.split(' ')[0], 10);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(startHour, startMinute);
    date.setHours(date.getHours() + durationHours);
    const endHour = date.getHours().toString().padStart(2, '0');
    const endMinute = date.getMinutes().toString().padStart(2, '0');
    const endTime = `${endHour}:${endMinute}`;
    return endTime;
  }

  calculatePrice() {
    const durationString = this.branchForm.controls['duration'].value;
    const durationHours = parseInt(durationString.split(' ')[0], 10);
    const price = durationHours * 600;
    return price;
  }

  confirmBooking(){
    let booking = new Booking();
    booking.courtName = this.cartItems[0].courtName;
    booking.sport = this.cartItems[0].sport;
    booking.startTime = this.cartItems[0].startTime;
    booking.endTime = this.cartItems[0].endTime;
    booking.date = this.cartItems[0].date;
    booking.price = this.cartItems[0].price;
    const userId = localStorage.getItem('userId');
    if(userId)
      booking.userId = userId;
    booking.branchId = this.branch.id;
    booking.branchName = this.branch.name;
    booking.branchArea = this.branch.area;
    this.loaderService.show();
    this.bookingsService.addBookings(booking).subscribe(response => {
      if(response.status === 200){
        this.toastr.success('Your booking is successful');
        this.router.navigate(['/bookings']);
      }
      this.loaderService.hide();
    });
  }

  openPopup(templateRef: TemplateRef<any>){
    this.dialog.open(templateRef, { width: '670px' });
  }

}
