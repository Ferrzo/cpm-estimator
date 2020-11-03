import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IEstimatorPortfolio, IEstimatorRequest, IEtdPortfolio, IProductData, ISeries, ISeriesData } from '../core/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products$: BehaviorSubject<IProductData> = new BehaviorSubject<IProductData>(null);
  private series$: BehaviorSubject<ISeriesData> = new BehaviorSubject<ISeriesData>(null);

  constructor(private apiService: ApiService) { }

  public getProducts(): Observable<IProductData> {
    return this.products$.asObservable();
  }

  public getSeries(): Observable<ISeriesData> {
    return this.series$.asObservable();
  }

  public fetchProducts(): void {
    this.apiService.getProducts().pipe(take(1))
      .subscribe(data => this.products$.next(data));
  }

  public fetchSeries(productId: string): void {
    this.apiService.getSeries(productId).pipe(take(1))
      .subscribe(data => this.series$.next(data));
  }

  public sendEstimation(series: ISeries[]): Observable<any> {
    const components: IEstimatorPortfolio = {
      type: 'etd_portfolio',
      etd_portfolio: this.getPortfolioModel(series)
    };
    const request: IEstimatorRequest = {
     portfolio_components: components
    };

    return this.apiService.postEstimate(request);
  }

  private getPortfolioModel(series: ISeries[]): IEtdPortfolio[] {
    const model: IEtdPortfolio[] = [];
    series.forEach((item, index) => model.push({iid: item.iid,
                                      line_no: index + 1,
                                      product_id: item.product_id,
                                      net_ls_balance: 1 }));

    return model;
  }
}
