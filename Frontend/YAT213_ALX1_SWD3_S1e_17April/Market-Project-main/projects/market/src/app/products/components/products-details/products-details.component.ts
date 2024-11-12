import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit {
  id: string;
  productData: any = {};

  constructor(private _locationService: Location,
    private _productService: ProductsService,
    private _activatedRoute: ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')!;
    console.log(this.id)
  }
  ngOnInit(): void {
    this.bindProductData();
  }
  goBack() {
    this._locationService.back();
  }

  bindProductData() {
    this._productService.getProductsById(this.id).subscribe((res => this.productData = res));
  }
}
