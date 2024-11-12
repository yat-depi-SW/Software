import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class adminCartsService {
  success: boolean = false;
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
  getAllCarts(date?: any): Observable<any> {
    return this._http.get('https://fakestoreapi.com/carts').pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getFilteredDate(date?: any): Observable<any> {
    let params = new HttpParams().append("startdate", date?.start).append("enddate", date?.end)
    return this._http.get('https://fakestoreapi.com/carts', { params })
  }
  deleteCart(id: any): Observable<any> {
    return this._http.delete(`https://fakestoreapi.com/carts/${id}`);
  }
}
