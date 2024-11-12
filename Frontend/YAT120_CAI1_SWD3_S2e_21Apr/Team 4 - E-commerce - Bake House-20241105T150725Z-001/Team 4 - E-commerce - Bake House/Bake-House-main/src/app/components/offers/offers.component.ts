import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  offerProducts: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.offerProducts = ProductService.getProducts().filter(
      (p) => p.discount > 0
    );
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  addOne(product: Product): void {
    this.cartService.addToCart(product); // Add product to cart
  }
}
