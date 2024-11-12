import { Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { adminCartsService } from '../../services/adminCarts.service';
import { cartProducts } from '../../../models/cartProducts';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { allCarts } from '../../../models/allCarts';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',

})
export class CartComponent implements OnInit, OnChanges {
  carts: any[] = [];
  viewCartProducts: any = [];
  total: any;
  form!: FormGroup;
  viewDetails: boolean = false
  details: any = [];
  price!: number
  p!: number
  constructor(private _allCartsService: adminCartsService,
    private ele: ElementRef,
    private _build: FormBuilder,
    private _productService: ProductsService,
    private _location: Location) {
  }
  ngOnChanges(): void {

  }
  ngOnInit(): void {
    this.form = this._build.group({
      start: [''],
      end: ['']
    })
    this.getCarts();

  }
  getCarts() {
    this._allCartsService.getAllCarts().subscribe((res: any) => {
      this.carts = res
    })

  }
  applyFilter() {
    let date = this.form.value;
    console.log(date);
    this._allCartsService.getFilteredDate(date).subscribe((res: any) => {
      this.carts = res
    })
  }
  deleteCart(id: any) {
    this._allCartsService.deleteCart(id).subscribe(res => {
      alert("cart's been deleted");
      this.getCarts();
    })
    console.log(this.details.id)
  }
  viewItem(index: number) {
    this.viewDetails = true;
    this.viewCartProducts = [];
    this.details = this.carts[index];
    for (let i in this.details.products) {
      this._productService.getProductsById(this.details.products[i].productId).subscribe(res => {
        this.viewCartProducts.push({ item: res, quantity: this.details.products[i].quantity })
      })
    }
    console.log(this.details)
    console.log(this.viewCartProducts)
  }
  goBack() {
    this.viewDetails = false;
  }
  get totalfn() {
    return this.p = this.viewCartProducts.map((ele: any) => {
      return ele.item.price * ele.quantity
    }).reduce((a: any, b: any) => a + b)
  }
}

