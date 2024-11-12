import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  product: Product | undefined;
  allProducts = ProductService.getProducts();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.allProducts.find((prod) => prod.id === id);
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }
}
