import { KeyValue } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Greenhouse } from 'src/models/greenhouse';
import { LightingController } from 'src/models/lighting-controller';
import { PutToGreenhouseModel } from 'src/models/put-to-greenhouse-model';
import { TemperatureController } from 'src/models/temperature-controller';
import { WetController } from 'src/models/wet-controller';
import { LightingService } from 'src/services/api/lighting.service';
import { TemperatureService } from 'src/services/api/temperature.service';
import { WetsService } from 'src/services/api/wets.service';
import { LightingRepositoryService } from 'src/services/data/lighting-repository.service';
import { TemperatureRepositoryService } from 'src/services/data/temperature-repository.service';
import { WetRepositoryService } from 'src/services/data/wet-repository.service';

@Component({
  selector: 'app-greenhouse-controllers-dialog',
  templateUrl: './greenhouse-controllers-dialog.component.html',
  styleUrls: ['./greenhouse-controllers-dialog.component.css']
})
export class GreenhouseControllersDialogComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() submitButtonLabel: string = 'Submit';
  
  form: FormGroup;

  currentTemperatures: Map<TemperatureController, boolean> = new Map<TemperatureController, boolean>();
  currentLights: Map<LightingController, boolean> = new Map<LightingController, boolean>();
  currentWets: Map<WetController, boolean> = new Map<WetController, boolean>();

  constructor(public dialogRef: MatDialogRef<GreenhouseControllersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageGreenhouseControllerDialogData,
    private wetsService: WetsService,
    private tempService: TemperatureService,
    private lightService: LightingService) 
  { 
    this.form = this.createForm();
  }

  ngOnInit() {
    this.loadLights();
    this.loadTemperatures();
    this.loadWets();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private createForm(): FormGroup {
    return new FormGroup({

    });
  }

  private loadLights(): void {
    this.data.greenhouse.lightingControllers.forEach(entry => {
      this.currentLights.set(entry, true);
    });

    this.lightService.getAll(true).subscribe((result) => {
      result.forEach(entry => {
        this.currentLights.set(entry, false);
      });
    });
  }

  private loadTemperatures(): void {
    this.data.greenhouse.temperatureControllers.forEach(entry => {
      this.currentTemperatures.set(entry, true);
    });

    this.tempService.getAll(true).subscribe((result) => {
      result.forEach(entry => {
        this.currentTemperatures.set(entry, false);
      });
    });
  }

  private loadWets(): void {
    this.data.greenhouse.wetControllers.forEach(entry => {
      this.currentWets.set(entry, true);
    });

    this.wetsService.getAll(true).subscribe((result) => {
      result.forEach(entry => {  
        this.currentWets.set(entry, false);
      });
    });
  }

  addTemp($pair: KeyValue<TemperatureController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.removedTemperaturesControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.removedTemperaturesControllersIds.splice(index, 1);
      }
      else {
        this.data.addedTemperaturesControllersIds.push($pair.key.id);
      }
    }
    
    this.currentTemperatures.set($pair.key, true);
  }

  removeTemp($pair: KeyValue<TemperatureController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.addedTemperaturesControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.addedTemperaturesControllersIds.splice(index, 1);
      }
      else {
        this.data.removedTemperaturesControllersIds.push($pair.key.id);
      }
    }

    this.currentTemperatures.set($pair.key, false);
  }

  addLight($pair: KeyValue<LightingController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.removedLightsControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.removedLightsControllersIds.splice(index, 1);
      }
      else {
        this.data.addedLightsControllersIds.push($pair.key.id);
      }
    }
    
    this.currentLights.set($pair.key, true);
  }

  removeLight($pair: KeyValue<LightingController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.addedLightsControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.addedLightsControllersIds.splice(index, 1);
      }
      else {
        this.data.removedLightsControllersIds.push($pair.key.id);
      }
    }

    this.currentLights.set($pair.key, false);
  }

  addWet($pair: KeyValue<WetController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.removedWetsControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.removedWetsControllersIds.splice(index, 1);
      }
      else {
        this.data.addedWetsControllersIds.push($pair.key.id);
      }
    }
    
    this.currentWets.set($pair.key, true);
  }

  removeWet($pair: KeyValue<WetController, boolean>): void {
    if ($pair.key.id) {
      let index = this.data.addedWetsControllersIds.indexOf($pair.key.id)
      
      if (index != -1) {
        this.data.addedWetsControllersIds.splice(index, 1);
      }
      else {
        this.data.removedWetsControllersIds.push($pair.key.id);
      }
    }

    this.currentWets.set($pair.key, false);
  }
}

export class ManageGreenhouseControllerDialogData {
  greenhouse: Greenhouse = new Greenhouse();

  addedLightsControllersIds: string[] = [];
  removedLightsControllersIds: string[] = [];

  addedTemperaturesControllersIds: string[] = [];
  removedTemperaturesControllersIds: string[] = [];

  addedWetsControllersIds: string[] = [];
  removedWetsControllersIds: string[] = [];

  get putTemps() {
    let models: PutToGreenhouseModel[] = [];
    this.addedTemperaturesControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id, this.greenhouse.id)));
    this.removedTemperaturesControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id)));
    return models;
  }

  get putWets() {
    let models: PutToGreenhouseModel[] = [];
    this.addedWetsControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id, this.greenhouse.id)));
    this.removedWetsControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id)));
    return models;
  }

  get putLights() {
    let models: PutToGreenhouseModel[] = [];
    this.addedLightsControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id, this.greenhouse.id)));
    this.removedLightsControllersIds.forEach(id => models.push(new PutToGreenhouseModel(id)));
    return models;
  }
}

@Pipe({name: 'mapValueFilter'})
export class MapValueFilterPipe implements PipeTransform {
  transform(value: Array<KeyValue<any, boolean>>, state: boolean) {
    return value.filter((entry) => entry.value == state);
  }  
}