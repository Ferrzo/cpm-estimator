import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:4200/';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(`api/products`);
  }

  getSeries(productId): Observable<any> {
    return this.httpClient.get(`api/series?products=${productId}`);
  }
}
