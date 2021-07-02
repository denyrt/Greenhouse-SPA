import { Component, OnInit } from '@angular/core';
import { MatHeaderRowDef } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Greenhouse } from 'src/models/greenhouse';
import { ReportsFilter } from 'src/models/reports-filter';
import { GreenhousesService } from 'src/services/api/greenhouses.service';
import { LightingService } from 'src/services/api/lighting.service';
import { TemperatureService } from 'src/services/api/temperature.service';
import { WetsService } from 'src/services/api/wets.service';
import { GreenhousesRepositoryService } from 'src/services/data/greenhouses-repository.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  greenhouses: Greenhouse[] = [];

  constructor(private greenhousesService: GreenhousesService,
    private greenhousesRepository: GreenhousesRepositoryService,
    private temperaturesService: TemperatureService,
    private wetsService: WetsService,
    private lightsService: LightingService) { }

  ngOnInit() {
    this.greenhousesService.getAll().subscribe((data) => {
      this.greenhousesRepository.setAll(data);
      this.greenhouses = data;
    });
  }

  public temperaturesIsLoading: boolean = false;
  public temperaturesChartType: string = 'line';
  public temperaturesDatasets: Array<any> = [
    {
      data: [],
      label: 'Показатели температуры (Celsius)'
    }
  ];
  public temperaturesChartLabels: Array<any> = [];
  public temperaturesChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 0, 0, .3)',
      borderColor: 'rgba(127, 0, 0, .9)',
      borderWidth: 2,
    }
  ];
  public temperaturesChartOptions: any = {
    responsive: true
  };

  public lightsIsLoading: boolean = false;
  public lightsChartType: string = 'line';
  public lightsDatasets: Array<any> = [
    {
      data: [],
      label: 'Показатели освещения (Lumens)'
    }
  ];
  public lightsChartLabels: Array<any> = [];
  public lightsChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 255, 0, .3)',
      borderColor: 'rgba(0, 127, 0, .9)',
      borderWidth: 2,
    }
  ];
  public lightsChartOptions: any = {
    responsive: true
  };

  public wetsIsLoading: boolean = false;
  public wetsChartType: string = 'line';
  public wetsDatasets: Array<any> = [
    {
      data: [],
      label: 'Показатели влажности (%)'
    }
  ];
  public wetsChartLabels: Array<any> = [];
  public wetsChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 0, 255, .3)',
      borderColor: 'rgba(0, 0, 127, .9)',
      borderWidth: 2,
    }
  ];
  public wetsChartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { 
    
  }

  public chartHovered(e: any): void {
    
  } 

  public loadTemperatureChart(filter:  ReportsFilter): void {
    this.temperaturesIsLoading = true;
    this.temperaturesService.getAllReports(filter)
    .subscribe((result) => {
      this.temperaturesDatasets[0].data = result.map(entry => entry.celsius);
      
      let last = result.length - 1;
      let middle = Math.round(result.length.valueOf() / 2) - 1;

      this.temperaturesChartLabels = new Array(length);
      
      if (result.length > 1) {
        this.temperaturesChartLabels[0] = toDateTimeString(result[0].createDate);
        this.temperaturesChartLabels[last] = toDateTimeString(result[last].createDate);
      }
      
      if (result.length > 2) {
        this.temperaturesChartLabels[middle] = toDateTimeString(result[middle].createDate);
      }
    })
    .add(() => {
      this.temperaturesIsLoading = false;
    });
  }

  public loadLightsChart(filter:  ReportsFilter): void {
    this.lightsIsLoading = true;
    this.lightsService.getAllReports(filter)
    .subscribe((result) => {
      this.lightsDatasets[0].data = result.map(entry => entry.lumens);
      
      let last = result.length - 1;
      let middle = Math.round(result.length.valueOf() / 2);
      this.lightsChartLabels = new Array(length);
      
      if (result.length > 1) {
        this.lightsChartLabels[0] = toDateTimeString(result[0].createDate);
        this.lightsChartLabels[last] = toDateTimeString(result[last].createDate);
      }
      
      if (result.length > 2) {
        this.lightsChartLabels[middle] = toDateTimeString(result[middle].createDate);
      }
    })
    .add(() => {
      this.lightsIsLoading = false;
    });
  }

  public loadWetsChart(filter:  ReportsFilter): void {
    this.wetsIsLoading = true;
    this.wetsService.getAllReports(filter)
    .subscribe((result) => {
      this.wetsDatasets[0].data = result.map(entry => entry.wetPercent);
      
      let last = result.length - 1;
      let middle = Math.round(result.length.valueOf() / 2);
      this.wetsChartLabels = new Array(length);
      
      if (result.length > 1) {
        this.wetsChartLabels[0] = toDateTimeString(result[0].createDate);
        this.wetsChartLabels[last] = toDateTimeString(result[last].createDate);
      }
      
      if (result.length > 2) {        
        this.wetsChartLabels[middle] = toDateTimeString(result[middle].createDate);
      }
    })
    .add(() => {
      this.wetsIsLoading = false;
    });
  }
}

function toDateTimeString(date: Date) {
  let d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}