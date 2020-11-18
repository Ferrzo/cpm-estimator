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

  constructor(public dataService: DataService) { }

  public ngOnInit(): void {
    this.dataService.fetchProducts();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  public selectNewProduct(product: IProduct): void {
    this.dataService.fetchSeries(product.product);
  }
}
