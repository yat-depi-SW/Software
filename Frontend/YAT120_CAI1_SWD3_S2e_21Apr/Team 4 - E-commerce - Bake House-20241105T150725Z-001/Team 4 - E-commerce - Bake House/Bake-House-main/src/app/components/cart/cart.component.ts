import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to current cart items
    this.cartService.currentCart.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  calcTotalPerItem(quantity: number, price: number): number {
    return quantity * price;
  }

  removeOne(product: Product): void {
    this.cartService.removeOne(product);
  }

  removeProduct(product: Product): void {
    this.cartService.removeProduct(product);
  }

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += this.calcTotalPerItem(
        item.quantity ?? 0,
        item.discount > 0
          ? this.calcDiscount(item.price, item.discount)
          : item.price
      );
    }
    return total;
  }

  proceedToPayment() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['user/payment']); // Navigate to 'user/payment' instead of just 'payment'
    } else {
      alert('Your cart is empty. Please add items before proceeding to payment.');
    }
  }
}
