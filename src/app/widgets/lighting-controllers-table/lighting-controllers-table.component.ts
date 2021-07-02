import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LightingController } from 'src/models/lighting-controller';
import { LightingRepositoryService } from 'src/services/data/lighting-repository.service';

@Component({
  selector: 'app-lighting-controllers-table',
  templateUrl: './lighting-controllers-table.component.html',
  styleUrls: ['./lighting-controllers-table.component.css']
})
export class LightingControllersTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  public lightingDataSource: MatTableDataSource<LightingController>;
  public lightingDisplayedColumns = [
    'name',
    'reportIntervalSeconds',
    'permissibleLightValue',
    'lightingSeconds',
    'actions'
  ];

  @Input() updateDataViewEmitter = new EventEmitter();

  @Output() deleteClickEM = new EventEmitter<string>();
  @Output() updateClickEM = new EventEmitter<string>();

  private viewUpdaterSubscriber: any;

  constructor(private repository: LightingRepositoryService,
    private clipboard: Clipboard) { 
    this.lightingDataSource = new MatTableDataSource(repository.getAll());
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.lightingDataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.viewUpdaterSubscriber = this.updateDataViewEmitter.subscribe(() => {
      this.lightingDataSource.data = this.repository.getAll();
    });
  }

  ngOnDestroy(): void {
    this.viewUpdaterSubscriber.unsubscribe()
  }

  update(id: string): void {
    this.updateClickEM.emit(id);
  }

  remove(id: string): void {
    this.deleteClickEM.emit(id);
  }

  copy(id: string): void {
    this.clipboard.copy(id);
  }
}
