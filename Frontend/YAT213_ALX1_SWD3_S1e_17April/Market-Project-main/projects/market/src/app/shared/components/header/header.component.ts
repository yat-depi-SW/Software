import { Component } from '@angular/core';
import { CartsService } from '../../../carts/services/carts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(private cartAmount:CartsService){

}
}
