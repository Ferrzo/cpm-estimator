import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { IProduct } from 'src/app/core/models';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];

  private ngDestroy$ = new Subject();

  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.dataService.fetchProducts();
    this.dataService.getProducts()
      .pipe(
        takeUntil(this.ngDestroy$),
      )
      .subscribe(data => this.products = data?.products);
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  public selectNewProduct(product: IProduct): void {
    this.dataService.fetchSeries(product.product);
  }
}
