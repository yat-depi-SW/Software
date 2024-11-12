import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CartsService } from '../../services/carts.service';
import { cartProducts } from '../../../models/cartProducts';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',

})
export class CartComponent implements OnInit {
  cartProducts: cartProducts[] = [];
  total!: number;
  newQuantity!: number;
  success: boolean = false;
  isDisabled: boolean = false;
  @ViewChild('decreaseBtn') decreaseBtn!: ElementRef;
  @ViewChild('increaseBtn') increaseBtn!: ElementRef;
  @ViewChild('quantityInputValue') quantityInputValue!: ElementRef;
  constructor(private _cartService: CartsService, private ele: ElementRef,) {

  }
  ngOnInit(): void {
    this.getCartProducts();


  }
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalPrice()
    console.log(this.cartProducts)
  }
  getTotalPrice() {
    this.total = 0;
    for (let i in this.cartProducts) {
      let price = this.cartProducts[i].item.price;
      let quantity = this.cartProducts[i].quantity;
      this.total += Math.floor(+(+price * quantity));
    }
  }
  increaseAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  decreaseAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.getTotalPrice();
    } else {
      this.cartProducts[index].quantity = 1;

    }

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  disableBtn(index: number) {
    if (this.cartProducts[index].quantity == 1) {
      // this.isDisabled = true;
      // this.decreaseBtn.nativeElement.setAttribute("disabled", "!isDisabled");
      console.log("disabled")
    }
  }
  enableBtn(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      // this.isDisabled = false;
      // this.decreaseBtn.nativeElement.removeAttribute("disabled");
      console.log("Nondisabled")
    }
  }
  detectAmount(index: number) {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  }
  clearCart() {
    this.cartProducts.length = 0;
    this.total = 0;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  }
  successFN() {
    this.success = false
  }
  addNewCart() {
    if (this.cartProducts.length !== 0) {
      let products = this.cartProducts.map((item: { item: { id: any; }; quantity: any; }) => {
        return { productId: item.item.id, quantity: item.quantity }
      }
      )
      let model = {
        userId: 5,
        date: new Date(),
        products: products
      }
      console.log(model);
      this._cartService.createNewCart(model);
      // this.success = true
      // setInterval(() => {
      //   this.successFN();
      // }, 3000)
      Swal.fire({
        title: "your order has been succesfully",
        icon: "success",
        timer: 1500
      })
      this.clearCart();
    } else Swal.fire({
      title: "Cart is empty",
      icon: "error",
      timer: 1500
    })

  }
}
