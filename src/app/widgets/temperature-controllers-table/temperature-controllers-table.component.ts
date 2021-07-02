import { Clipboard } from '@angular/cdk/clipboard';
import { AfterViewInit, Component, Input, OnInit, EventEmitter, ViewChild, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TemperatureController } from 'src/models/temperature-controller';
import { TemperatureRepositoryService } from 'src/services/data/temperature-repository.service';

@Component({
  selector: 'app-temperature-controllers-table',
  templateUrl: './temperature-controllers-table.component.html',
  styleUrls: ['./temperature-controllers-table.component.css']
})
export class TemperatureControllersTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  public temperatureDataSource: MatTableDataSource<TemperatureController>;
  public temperatureDisplayedColumns = [
    'name',
    'reportIntervalSeconds',
    'celsiusToStartAeration',
    'celsiusToFinishAeration',
    'celsiusToStartHeating',
    'celsiusToFinishHeating',
    'bottomEdgeToAlert',
    'upperEdgeToAlert',
    'actions'
  ];


  @Input() updateDataViewEmitter = new EventEmitter();

  @Output() updateClickEM = new EventEmitter<string>();
  @Output() deleteClickEM = new EventEmitter<string>();

  private viewUpdaterSubscriber: any;

  constructor(public dialog: MatDialog,
    private clipboard: Clipboard,
    private repository: TemperatureRepositoryService) {
    this.temperatureDataSource = new MatTableDataSource(repository.getAll());
  }

  ngOnInit() {
    this.viewUpdaterSubscriber = this.updateDataViewEmitter.subscribe(() => {
      this.updateView();
    })
  }

  ngOnDestroy(): void {
    this.viewUpdaterSubscriber.unsubscribe()
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.temperatureDataSource.paginator = this.paginator;
    }
  }

  remove(id: string): void {
    this.deleteClickEM.emit(id);
  }

  edit(id: string): void {
    this.updateClickEM.emit(id);
  }

  updateView(): void {
    this.temperatureDataSource.data = this.repository.getAll();
  }

  copy(id: string) {
    this.clipboard.copy(id);
  }
}
