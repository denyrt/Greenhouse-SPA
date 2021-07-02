import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app-injections-tokens';
import { CreateGreenhouseModel } from 'src/models/create-greenhouse-model';
import { Greenhouse } from 'src/models/greenhouse';

@Injectable({
  providedIn: 'root'
})
export class GreenhousesService {

  constructor(private http: HttpClient,
    @Inject(API_URL) private apiUrl: string) {}

  create(model: CreateGreenhouseModel): Observable<Greenhouse> {
    return this.http.post<Greenhouse>(`${this.apiUrl}/api/greenhouses`, model);
  }

  getAll(): Observable<Greenhouse[]> {
    return this.http.get<Greenhouse[]>(`${this.apiUrl}/api/greenhouses`);
  }

  getById(id: string): Observable<Greenhouse> {
    return this.http.get<Greenhouse>(`${this.apiUrl}/api/greenhouses/${id}`);
  }

  update(id: string, update: CreateGreenhouseModel): Observable<Greenhouse> {
    return this.http.put<Greenhouse>(`${this.apiUrl}/api/greenhouses/${id}`, update);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/greenhouses/${id}`);
  }

}
