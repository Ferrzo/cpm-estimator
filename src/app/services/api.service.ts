import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEstimatorRequest, IProductData, ISeriesData } from '../core/models';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<IProductData> {
    return this.httpClient.get<IProductData>(`api/products`);
  }

  getSeries(productId: string): Observable<ISeriesData> {
    return this.httpClient.get<ISeriesData>(`api/series?products=${productId}`);
  }

  postEstimate(request: IEstimatorRequest): Observable<any> {
    return this.httpClient.post<IEstimatorRequest>(`api/estimator`, request);
  }
}
