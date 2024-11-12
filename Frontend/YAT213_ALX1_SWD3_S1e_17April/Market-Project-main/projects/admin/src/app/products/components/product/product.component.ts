import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() data: product = {};
  @Output() item = new EventEmitter();
  apearAddBtn: boolean = true;
  amount: number = 0;
  constructor() { }
  add() {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
  disAppear() {
    this.apearAddBtn = false;
  }
}
