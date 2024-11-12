import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { product } from '../../models/product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Error occured, please try again')
    )
  }
  // getAllProducts() {
  //   // return this.http.get(environment.baseApi + 'products');
  //   // return this.http.get(`${environment.baseApi}products`);
  //   return this.http.get("https://fakestoreapi.com/products");
  // }

  getAllProducts(): Observable<any> {
    return this._http.get(`https://fakestoreapi.com/products`).pipe(
      retry(2),
      catchError(this.handleError)
    )

  }
  getAllCategories(): Observable<any> {
    // return this.http.get(environment.baseApi + 'products');
    // return this.http.get(`${environment.baseApi}products`);
    // return this.http.get("https://fakestoreapi.com/products/category/electronics");
    return this._http.get("https://fakestoreapi.com/products/categories/").pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductsByCategory(keyword: string) {
    return this._http.get(`https://fakestoreapi.com/products/category/${keyword}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductsById(id: string) {
    return this._http.get(`https://fakestoreapi.com/products/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  addProduct(model: any) {
    this._http.post('https://fakestoreapi.com/products', model).subscribe(res => {
      Swal.fire({
        title: "The Product Added Successfully",
        icon: "success",
        timer: 1500
      })
    })
  }
  updateProduct(model: any, id: any) {
    this._http.put(`https://fakestoreapi.com/products/${id}`, model).subscribe(res => {
      Swal.fire({
        title: "The Product Updated Successfully",
        icon: "success",
        timer: 1500
      })
    })
  }
}
