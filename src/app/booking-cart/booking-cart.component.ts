import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-booking-cart',
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css'
})
export class BookingCartComponent {

  cartItems: Cart[] = [];
  branch: any;

  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.branch = this.cartService.getBranchData();
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }


}
