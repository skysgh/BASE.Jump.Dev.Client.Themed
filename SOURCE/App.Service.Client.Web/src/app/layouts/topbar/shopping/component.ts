import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SystemService } from "../../../../_BASE/shared/services/system.service";
import { System } from "../../../../_BASE/shared/constants/contracts/system";
import { CartModel } from "../topbar.model";

//Shit tmp data
import { cartData } from '../data';


@Component({
  selector: 'app-frame-context-shopping',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class ContextShoppingComponent implements OnInit {

  system: System;

  // Shopping
  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;

  constructor(
    systemService: SystemService,
    public translate: TranslateService) {

    // Can be either via service, or injecting the constats/settings object:
    this.system = systemService.system;
  }

  ngOnInit(): void {
    this.initCart();
}

  private initCart() {
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price
      this.total += item_price
    });
  }

  // Delete Item
  deleteItem(event: any, id: any) {
    var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
    var Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;
    this.total > 1 ? (document.getElementById("empty-cart") as HTMLElement).style.display = "none" : (document.getElementById("empty-cart") as HTMLElement).style.display = "block";
    document.getElementById('item_' + id)?.remove();
  }

}