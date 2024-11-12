import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
// import { FaIconComponent } from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    FontAwesomeModule,
    FaIconComponent,
    FormsModule
  ],
  exports: []
})
export class CartsModule {
  // faXmark = faXmark
}
