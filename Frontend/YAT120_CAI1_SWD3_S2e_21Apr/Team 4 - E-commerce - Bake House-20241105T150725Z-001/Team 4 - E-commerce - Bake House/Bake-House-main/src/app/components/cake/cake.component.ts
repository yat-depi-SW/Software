import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.scss'],
})
export class CakeComponent implements OnInit {
  cakeProducts: Product[] = [];

  ngOnInit() {
    this.cakeProducts = ProductService.getProducts().filter(
      (p) => p.category === 'cake'
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
