import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CartService } from '../../Service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  allProducts: Product[] = [];

  ngOnInit() {
    this.allProducts = ProductService.getProducts();
    if (localStorage.getItem('cart')) {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

      this.allProducts.forEach((myItem) => {
        currentCart.find((item: Product) => {
          if (item.id === myItem.id) {
            myItem.amount = item.amount;
            myItem.quantity = item.quantity;
          }
        });
      });
    }
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  constructor(private cartService: CartService) {}

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }
}
