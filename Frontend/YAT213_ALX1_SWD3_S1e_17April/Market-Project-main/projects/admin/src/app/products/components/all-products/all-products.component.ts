import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../../models/product';
import { cartProducts } from '../../../models/cartProducts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  updateBase64: any = '';
  addForm!: FormGroup
  updateForm!: FormGroup
  addBase64: any = '';
  cartId:any;
  appear:boolean = true
  @ViewChild('imageInput') imgInput: any;
  constructor(
    private _service: ProductsService,
    private _build: FormBuilder,
    private _productService: ProductsService,
    private _http: HttpClient
  ) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.addForm = this._build.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    })
    this.updateForm = this._build.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      id: ['']
    })
  }
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
        alert('product is exist in Cart')
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
  getCategoryName(event: any) {
    this.addForm.get('category')?.setValue(event.target.value)
    console.log(this.addForm)
  }
  getAddImagePath (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addBase64 = reader.result;
      this.addForm.get('image')?.setValue(this.addBase64)
    }
  }
  getUpdateImagePath (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.updateBase64 = reader.result;
      this.updateForm.get('image')?.setValue(this.updateBase64)
    }
  }
  addProduct() {
    const model = this.addForm.value
    this._productService.addProduct(model)
    console.log(model);
    this.addForm.patchValue({
      title: "",
      price: "",
      description: "",
      image: this.addBase64 = "",
      category: '',
      id: ''
    })
    // this.addForm.get("image")?.reset()
    this.imgInput.nativeElement.value = '';
    console.log(this.addForm.value)
// this.appear = true
  }
  updateProduct() {
    const model = this.updateForm.value
    this._productService.updateProduct(model,model.id)
    console.log(model)
  }
  getCartData(item: any,id:any) {
    console.log(item)
    this.cartId = id
    this.updateForm.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: this.updateBase64 = item.image,
      category: item.category,
      id: item.id
    })
  }
}
