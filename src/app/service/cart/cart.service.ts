import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private branchdata: any;

  setBranchData(data: any) {
      this.branchdata = data;
  }

  getBranchData() {
      return this.branchdata;
  }

}
