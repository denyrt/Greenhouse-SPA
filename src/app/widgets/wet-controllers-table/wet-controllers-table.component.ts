import { Clipboard } from '@angular/cdk/clipboard';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WetController } from 'src/models/wet-controller';
import { WetRepositoryService } from 'src/services/data/wet-repository.service';

@Component({
  selector: 'app-wet-controllers-table',
  templateUrl: './wet-controllers-table.component.html',
  styleUrls: ['./wet-controllers-table.component.css']
})
export class WetControllersTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  public wetDataSource: MatTableDataSource<WetController>;
  public wetDisplayedColumns = [
    'name',
    'reportIntervalSeconds',
    'bottomWetEdge',
    'upperWetEdge',
    'actions'
  ];

  @Input() updateDataViewEmitter = new EventEmitter();

  @Output() updateClickEM = new EventEmitter<string>();
  @Output() deleteClickEM = new EventEmitter<string>();

  private viewUpdaterSubscriber: any;

  constructor(private repository: WetRepositoryService,
    private clipboard: Clipboard) { 
    this.wetDataSource = new MatTableDataSource(repository.getAll());
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.wetDataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.viewUpdaterSubscriber = this.updateDataViewEmitter.subscribe(() => {
      this.wetDataSource.data = this.repository.getAll();
    })
  }

  ngOnDestroy(): void {
    this.viewUpdaterSubscriber.unsubscribe()
  }

  remove(id: string): void {
    this.deleteClickEM.emit(id);
  }

  update(id: string): void {
    this.updateClickEM.emit(id);
  }

  copy(id: string) {
    this.clipboard.copy(id);
  }
}
