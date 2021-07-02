import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Greenhouse } from 'src/models/greenhouse';
import { GreenhousesService } from 'src/services/api/greenhouses.service';
import { CreateGreenhouseDialogComponent } from '../dialogs/create-greenhouse-dialog/createGreenhouseDialog.component';
import { GreenhousesRepositoryService } from 'src/services/data/greenhouses-repository.service';
import { UpdateGreenhouseDialogComponent } from '../dialogs/update-greenhouse-dialog/update-greenhouse-dialog.component';
import { GreenhouseControllersDialogComponent, ManageGreenhouseControllerDialogData } from '../dialogs/greenhouse-controllers-dialog/greenhouse-controllers-dialog.component';
import { WetsService } from 'src/services/api/wets.service';
import { TemperatureService } from 'src/services/api/temperature.service';
import { LightingService } from 'src/services/api/lighting.service';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map, mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrls: ['./greenhouses.component.css']
})
export class GreenhousesComponent implements OnInit, AfterViewInit   {
  loading: boolean = false;
  displayedColumns: string[] = ['name', 'controllersCount', 'actions'];
  elements: Greenhouse[] = [];

  dataSource: MatTableDataSource<Greenhouse> = new MatTableDataSource<Greenhouse>(this.elements);

  constructor(public dialog: MatDialog,
    private greenhouses: GreenhousesService,
    private wetsService: WetsService,
    private tempService: TemperatureService,
    private lightService: LightingService,
    private repository: GreenhousesRepositoryService) {  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit() {
    this.greenhouses.getAll().subscribe((data) => {
      this.repository.setAll(data);
    })
    .add(() => {
      this.refreshDataView();
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public add(): void {
    let dialogRef = this.dialog.open(CreateGreenhouseDialogComponent);
    dialogRef.afterClosed().subscribe(() => {      
      if (dialogRef.componentInstance.isCancelled) return;
      this.refreshDataView();
    });
  }

  public update(id: string): void {
    let dialogRef = this.dialog.open(UpdateGreenhouseDialogComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {      
      if (dialogRef.componentInstance.isCancelled) return;
      this.refreshDataView();
    });
  }

  public manageControllers(id: string): void {
    let data = new ManageGreenhouseControllerDialogData();
    let greenhouse = this.repository.get(id);
    if (greenhouse != null) data.greenhouse = greenhouse;
    let dialogRef = this.dialog.open(GreenhouseControllersDialogComponent, {
      data: data
    });
    dialogRef.componentInstance.dialogTitle = 'Manage Controllers';

    dialogRef.afterClosed().pipe(
      map<ManageGreenhouseControllerDialogData, ManageGreenhouseControllerDialogData>(result => {
        if (result == undefined) throw ('Cancelled emitted.');
        this.loading = true;
        return result;
      }),
      mergeMap(result => {
        var observers = result.putTemps.map(model => this.tempService.putToGreenhouse(model))
        .concat(result.putLights.map(model => this.lightService.putToGreenhouse(model))
        .concat(result.putWets.map(model => this.wetsService.putToGreenhouse(model))));
        return forkJoin(observers);
      }),
      catchError(error => {
        return of();
      }))
      .subscribe(() => {
        this.greenhouses.getById(data.greenhouse.id).subscribe((value) => {
          this.repository.update(value);
          this.refreshDataView();
        })
      }).add(() => {
        this.loading = false;
      });
  }

  public remove(id: string): void {
    this.greenhouses.delete(id)
      .subscribe(() => {
        console.log('delete');
        this.repository.delete(id);
        this.refreshDataView();
      });
  }

  public refreshDataView() {
      this.dataSource.data = this.repository.getAll();
  }
}
