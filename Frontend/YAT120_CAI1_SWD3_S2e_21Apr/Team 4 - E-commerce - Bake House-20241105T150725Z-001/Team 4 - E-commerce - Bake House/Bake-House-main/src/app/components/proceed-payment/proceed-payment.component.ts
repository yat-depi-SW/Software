import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// تعريف واجهة CartItem
interface CartItem {
  name: string;
  quantity: number;
  price: number;
  discount?: number; // خصم اختياري
  image?: string; // لإضافة صورة المنتج
}

// تعريف واجهة PaymentInfo
interface PaymentInfo {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

@Component({
  selector: 'app-proceed-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proceed-payment.component.html',
  styleUrls: ['./proceed-payment.component.scss'],
})
export class ProceedPaymentComponent {
  cartItems: CartItem[] = [];
  payment: PaymentInfo = {
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  constructor(private router: Router) {
    const cartItems = localStorage.getItem('cart');
    this.cartItems = cartItems ? JSON.parse(cartItems) : [];
  }

  formatCvv(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    input.value = value;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const quantity = item.quantity ?? 0;
      const price =
        item.discount && item.discount > 0
          ? this.calcDiscount(item.price, item.discount)
          : item.price;
      return total + this.calcTotalPerItem(quantity, price);
    }, 0);
  }

  calcTotalPerItem(quantity: number, price: number): number {
    return quantity * price;
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  confirmPayment(paymentForm: any) {
    if (paymentForm.valid) {
      alert('Payment confirmed! Thank you for your order.');

      localStorage.removeItem('cart');
      this.cartItems = [];

      this.router.navigate(['user/home']);
    } else {
      alert('Please, fill in all the required fields!');
    }
  }

  formatExpiryDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      const validMonth = Math.min(parseInt(month), 12)
        .toString()
        .padStart(2, '0');
      value = `${validMonth}/${year}`;
    }

    input.value = value;
  }
}
