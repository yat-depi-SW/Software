import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { BakeryComponent } from './components/bakery/bakery.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ChocolateComponent } from './components/chocolate/chocolate.component';
import { OffersComponent } from './components/offers/offers.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CakeComponent } from './components/cake/cake.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-details/product-details.component';
import { ProceedPaymentComponent } from './components/proceed-payment/proceed-payment.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'allProduct',
        component: AllProductsComponent,
        title: 'All Products',
      },
      { path: 'cake', component: CakeComponent, title: 'Cakes' },
      { path: 'bakery', component: BakeryComponent, title: 'Bakery' },
      { path: 'chocolate', component: ChocolateComponent, title: 'Chocolates' },
      { path: 'offers', component: OffersComponent, title: 'Offers' },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'contact', component: ContactComponent, title: 'Contact Us' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
        title: 'Product Details',
      },
      { path: 'payment', component: ProceedPaymentComponent, title: 'Payment' },
    ],
  },

  {
    path: '**',
    component: NotfoundComponent,
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutes {}
