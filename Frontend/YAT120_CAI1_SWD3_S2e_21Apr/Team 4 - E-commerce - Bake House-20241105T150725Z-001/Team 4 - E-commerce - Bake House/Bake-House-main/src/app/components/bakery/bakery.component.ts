import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bakery',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './bakery.component.html',
  styleUrls: ['./bakery.component.scss'],
})
export class BakeryComponent implements OnInit {
  bakeryProducts: Product[] = [];

  ngOnInit() {
    this.bakeryProducts = ProductService.getProducts().filter(
      (p) => p.category === 'bakery'
    );
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  constructor(private cartService: CartService) {}

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }
}
