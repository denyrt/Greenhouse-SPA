import { Injectable } from '@angular/core';
import { controllers } from 'chart.js';
import { LightingController } from 'src/models/lighting-controller';
import { LightingService } from '../api/lighting.service';

@Injectable({
  providedIn: 'root'
})
export class LightingRepositoryService {

  private controllers: LightingController[] = [];
  needReload: boolean = true;
  
  constructor() {}

  getAll() {
    return this.controllers;
  }

  get(id: string): LightingController | null {
    let index = this.findIndexById(id);
    if (index == -1) return null;
    return this.controllers[index];
  }

  add(controller: LightingController) {
    this.controllers.push(controller);
  }

  delete(id: string) {
    let index = this.findIndexById(id);
    if (index == -1) return;
    this.controllers.splice(index, 1);
  }

  update(controller: LightingController) { 
    if (controller.id == null) return;
    let index = this.findIndexById(controller.id);
    if (index == -1) return;
    this.controllers[index] = controller;
  }

  private findIndexById(id: string): number {
    for (let i = 0; i < this.controllers.length; ++i) {
      if (this.controllers[i].id == id) return i;
    }
    return -1;
  }
}
