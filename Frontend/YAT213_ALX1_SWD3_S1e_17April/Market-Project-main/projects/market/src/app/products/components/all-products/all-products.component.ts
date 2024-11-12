import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../../models/product';
import { cartProducts } from '../../../models/cartProducts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products!: product[];
  allCategories!: string[];
  loading: boolean = false;
  cartProducts: cartProducts[] = [];
  constructor(private _service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  // getProducts() {
  //   this.loading = true;
  //   this._service.getAllProducts().subscribe(
  //     (res: any) => {
  //       this.loading = false;
  //       this.products = res;
  //     },
  //     (error) => {
  //       this.loading = false;
  //       alert(error);
  //     }
  //   );
  //   console.log(this.products);
  // }
  getProducts() {
    this.loading = true;
    this._service.getAllProducts().subscribe(
      (res: any) => {
        this.loading = false;
        this.products = res;
      },
    );
    console.log(this.products);
  }
  getCategories() {
    this.loading = true;
    this._service.getAllCategories().subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res), (this.allCategories = res);
      }
    );
  }
  filterCategory(event: any) {
    this.loading = true;
    let value = event.target.value;
    console.log(value);
    if (value == 'All') {
      this.loading = false;
      this.getProducts();
    } else {
      this.loading = false;
      this._service.getProductsByCategory(value).subscribe((res: any) => {
        console.log(res);
        this.products = res;
      });
    }
  }
  // cart function
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (exist) {
        Swal.fire({
          title: "The Product is existed in Cart",
          icon: "error",
          timer: 1500
        })
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        Swal.fire({
          title: "The Product Added Successfully",
          icon: "success",
          timer: 1500
        })
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
