import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { SwiperModule } from 'swiper/types';
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';
import { Product } from '../../interfaces/product';
import { CartService } from '../../Service/cart.service';
import { RouterLink } from '@angular/router';
// import { Swiper } from 'swiper/types';

// @import '~swiper/swiper-bundle.min.css';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products = ProductService.getProducts();
  randomProducts = this.getRandomProducts();

  ngOnInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  getRandomProducts(): Product[] {
    return [...this.products]
      .filter((p, index) => p.amount !== 0 && index % 2 != 0)
      .slice(0,10);
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  constructor(private cartService: CartService) {}

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }
}
