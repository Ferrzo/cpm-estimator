import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ISeries } from 'src/app/core/models';
import { DataService } from 'src/app/services/data.service';
import { EstimateDialogComponent } from '../estimate-dialog/estimate-dialog.component';

@Component({
  selector: 'app-series-table',
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss']
})
export class SeriesTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'iid', 'version_number', 'product_id', 'contract_maturity', 'expiry_maturity'];
  dataSource = new MatTableDataSource<ISeries>([]);
  selection = new SelectionModel<ISeries>(true, []);

  private ngDestroy$ = new Subject();

  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.dataService.getSeries()
      .pipe(
        takeUntil(this.ngDestroy$),
      )
      .subscribe(data => this.dataSource = new MatTableDataSource<ISeries>(data?.list_series));
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  estimateResults(): void {
    this.dataService.sendEstimation(this.selection.selected)
      .pipe(take(1))
      .subscribe(response => {
        this.dialog.open(EstimateDialogComponent, {
          data: {
            data: response
          }
        });
      }, (error) => this.dialog.open(EstimateDialogComponent, {
        data: {
          data: error.error
        }
      }));
  }
}
