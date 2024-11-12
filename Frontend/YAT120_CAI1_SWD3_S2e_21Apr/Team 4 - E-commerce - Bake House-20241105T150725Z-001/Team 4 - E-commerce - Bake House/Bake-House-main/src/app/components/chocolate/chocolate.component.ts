import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chocolate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chocolate.component.html',
  styleUrls: ['./chocolate.component.scss'],
})
export class ChocolateComponent implements OnInit {
  chocolateProducts: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.chocolateProducts = ProductService.getProducts().filter(
      (p) => p.category === 'chocolate'
    );
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }
}
