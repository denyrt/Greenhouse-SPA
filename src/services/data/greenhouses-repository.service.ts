import { Injectable } from '@angular/core';
import { Greenhouse } from 'src/models/greenhouse';

@Injectable({
  providedIn: 'root'
})
export class GreenhousesRepositoryService {

  private greenhouses: Greenhouse[] = []
  needReload: boolean = true;

  constructor() { }

  getAll() {
    return this.greenhouses;
  }

  setAll(data: Greenhouse[]) {
    this.greenhouses = data;
  }

  get(id: string): Greenhouse | null {
    let index = this.findIndexById(id);
    if (index == -1) return null;
    return this.greenhouses[index];
  }

  add(greenhouse: Greenhouse) {
    this.greenhouses.push(greenhouse);
  }

  delete(id: string) {
    let index = this.findIndexById(id);
    if (index == -1) return;
    this.greenhouses.splice(index, 1);
  }

  update(greenhouse: Greenhouse) {
    let index = this.findIndexById(greenhouse.id);
    if (index == -1) return;
    this.greenhouses[index] = greenhouse;
  }

  findByTemperatureControllerId(id: string): Greenhouse | null {
    for (let i = 0; i < this.greenhouses.length; ++i) {
      for(let j = 0; j < this.greenhouses[i].temperatureControllers.length; ++j) {
        if (this.greenhouses[i].temperatureControllers[j].id == id) {
          return this.greenhouses[i];
        }
      }
    }

    return null;
  }

  findByWetControllerId(id: string) {  
    for (let i = 0; i < this.greenhouses.length; ++i) {
      for(let j = 0; j < this.greenhouses[i].wetControllers.length; ++j) {
        if (this.greenhouses[i].wetControllers[j].id == id) {
          return this.greenhouses[i];
        }
      }
    }

    return null;
  }

  findByLightControllerId(id: string) {
    for (let i = 0; i < this.greenhouses.length; ++i) {
      for(let j = 0; j < this.greenhouses[i].lightingControllers.length; ++j) {
        if (this.greenhouses[i].lightingControllers[j].id == id) {
          return this.greenhouses[i];
        }
      }
    }

    return null;
  }

  private findIndexById(id: string): number {
    for (let i = 0; i < this.greenhouses.length; ++i) {
      if (this.greenhouses[i].id == id) return i;
    }
    return -1;
  }
}
