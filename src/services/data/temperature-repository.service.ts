import { Injectable } from '@angular/core';
import { TemperatureController } from 'src/models/temperature-controller';
import { TemperatureService } from '../api/temperature.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureRepositoryService {

  private controller: TemperatureController[] = [];
  needReload: boolean = true;
  
  constructor() {}

  getAll() {
    return this.controller;
  }

  get(id: string): TemperatureController | null {
    let index = this.findIndexById(id);
    if (index == -1) return null;
    return this.controller[index];
  }

  add(controller: TemperatureController) {
    this.controller.push(controller);
  }

  delete(id: string) {
    let index = this.findIndexById(id);
    if (index == -1) return;
    this.controller.splice(index, 1);
  }

  update(controller: TemperatureController) { 
    if (controller.id == null) return;
    let index = this.findIndexById(controller.id);
    if (index == -1) return;
    this.controller[index] = controller;
  }

  private findIndexById(id: string): number {
    for (let i = 0; i < this.controller.length; ++i) {
      if (this.controller[i].id == id) return i;
    }
    return -1;
  }
}
