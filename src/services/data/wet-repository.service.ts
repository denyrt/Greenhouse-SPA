import { Injectable } from '@angular/core';
import { controllers } from 'chart.js';
import { WetController } from 'src/models/wet-controller';
import { GreenhousesRepositoryService } from './greenhouses-repository.service';

@Injectable({
  providedIn: 'root'
})
export class WetRepositoryService {

  private controllers: WetController[] = [];
  needReload: boolean = true;
  
  constructor(private greenhousesRepository: GreenhousesRepositoryService) 
  { }

  getAll() {
    return this.controllers;
  }

  get(id: string): WetController | null {
    let index = this.findIndexById(id);
    if (index == -1) return null;
    return this.controllers[index];
  }

  add(controller: WetController) {
    this.controllers.push(controller);
  }

  delete(id: string) {
    let index = this.findIndexById(id);
    if (index == -1) return;
    this.controllers.splice(index, 1);
  }

  update(controller: WetController) { 
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
