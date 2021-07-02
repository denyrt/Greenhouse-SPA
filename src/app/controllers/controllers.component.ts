import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WetController } from 'src/models/wet-controller';
import { LightingService } from 'src/services/api/lighting.service';
import { TemperatureService } from 'src/services/api/temperature.service';
import { WetsService } from 'src/services/api/wets.service';
import { LightingRepositoryService } from 'src/services/data/lighting-repository.service';
import { TemperatureRepositoryService } from 'src/services/data/temperature-repository.service';
import { WetRepositoryService } from 'src/services/data/wet-repository.service';
import { LightDialogComponent } from '../dialogs/light-dialog/light-dialog.component';
import { TemperatureDialogComponent } from '../dialogs/temperature-dialog/temperature-dialog.component';
import { WetDialogComponent } from '../dialogs/wet-dialog/wet-dialog.component';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css']
})
export class ControllersComponent implements OnInit {
  public controllersTypes = ['Temperature', 'Light', 'Wet']
  public selectedType = 'Temperature';

  constructor(public dialog: MatDialog,
    private temperatures: TemperatureService,
    private lightings: LightingService,
    private wets: WetsService,
    private tempRepository: TemperatureRepositoryService,
    private lightRepository: LightingRepositoryService,
    private wetRepository: WetRepositoryService) {}

  public updateDataViewEmmiter = new EventEmitter();

  ngOnInit() {
    if (this.tempRepository.needReload) {
      this.temperatures.getAll().subscribe((data) => {
        data.forEach(entry => this.tempRepository.add(entry));
        this.tempRepository.needReload = false;
        this.updateDataViewEmmiter.emit();
      })
    }

    if (this.lightRepository.needReload) {
      this.lightings.getAll().subscribe((data) => {
        data.forEach(entry => this.lightRepository.add(entry));
        this.lightRepository.needReload = false;
        this.updateDataViewEmmiter.emit();
      })
    }

    if (this.wetRepository.needReload) {
      this.wets.getAll().subscribe((data) => {
        data.forEach(entry => this.wetRepository.add(entry));
        this.wetRepository.needReload = false;
        this.updateDataViewEmmiter.emit();
      })
    }
  }

  typeChanged($event: any) {}

  log($e: any) {
    console.log($e);
  }

  add() {
    switch (this.selectedType) {
      case 'Temperature': {
        this.createTemperature();
        break;
      }
      case 'Light': {
        this.createLight();
        break;
      }
      case 'Wet': {
        this.createWet();
        break;
      }
    }

    this.updateDataViewEmmiter.emit();
  }

  createTemperature(): void {
    let dialogRef = this.dialog.open(TemperatureDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Create Temperature Controller';
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((temperature) => {
      instance.loading = true;
      
      this.temperatures.create(temperature).subscribe((created) => {
        this.tempRepository.add(created);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });

    var subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    });
  }

  deleteTemperature(id: string): void {
    this.temperatures.delete(id).subscribe(() => {
      this.tempRepository.delete(id);
      this.updateDataViewEmmiter.emit();
    })
  }

  updateTemperature(id: string): void {
    let model = this.tempRepository.get(id);
    if (model == null) return;

    let dialogRef = this.dialog.open(TemperatureDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Update Temperature Controller';
    instance.temperature = model;
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((temperature) => {
      instance.loading = true;
      this.temperatures.update(temperature).subscribe((updated) => {
        this.tempRepository.update(updated);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });
    
    let subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    })
  }
  


  createLight(): void {
    let dialogRef = this.dialog.open(LightDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Create Light Controller';
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((light) => {
      instance.loading = true;
      
      this.lightings.create(light).subscribe((created) => {
        this.lightRepository.add(created);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });

    var subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    });
  }

  deleteLight(id: string): void {
    this.lightings.delete(id).subscribe(() => {
      this.lightRepository.delete(id);
      this.updateDataViewEmmiter.emit();
    })
  }

  updateLight(id: string): void {
    let model = this.lightRepository.get(id);
    if (model == null) return;
    
    let dialogRef = this.dialog.open(LightDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Update Light Controller';
    instance.light = model;
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((light) => {
      instance.loading = true;
      this.lightings.update(light).subscribe((updated) => {
        this.lightRepository.update(updated);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });
    
    let subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    })
  }

  createWet(): void {
    let dialogRef = this.dialog.open(WetDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Create Wet Controller';
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((wet) => {
      instance.loading = true;
      
      this.wets.create(wet).subscribe((created) => {
        this.wetRepository.add(created);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });

    var subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    });
  }

  deleteWet(id: string): void {
    this.wets.delete(id).subscribe(() => {
      this.wetRepository.delete(id);
      this.updateDataViewEmmiter.emit();
    })
  }

  updateWet(id: string): void {
    let model = this.wetRepository.get(id);
    if (model == null) return;
    
    let dialogRef = this.dialog.open(WetDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogTitle = 'Update Wet Controller';
    instance.wet = model;
        
    let cancelSubscribe = instance.cancelButtonEM.subscribe(() => {
      dialogRef.close();
    });

    let submitSubscribe = instance.submitButtonEM.subscribe((wet) => {
      instance.loading = true;
      this.wets.update(wet).subscribe((updated) => {
        this.wetRepository.update(updated);
        this.updateDataViewEmmiter.emit();
        dialogRef.close();
      })
      .add(() => {
        instance.loading = false;
      })
    });
    
    let subscribe = dialogRef.afterClosed().subscribe(() => {
      cancelSubscribe.unsubscribe();
      submitSubscribe.unsubscribe();
      subscribe.unsubscribe();
    })
  }
}