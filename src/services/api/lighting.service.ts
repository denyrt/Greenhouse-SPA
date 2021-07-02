import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app-injections-tokens';
import { LightReportModelView } from 'src/models/light-report-model-view';
import { LightingController } from 'src/models/lighting-controller';
import { PutToGreenhouseModel } from 'src/models/put-to-greenhouse-model';
import { ReportsFilter } from 'src/models/reports-filter';

@Injectable({
  providedIn: 'root'
})
export class LightingService {

constructor(private http: HttpClient,
  @Inject(API_URL) private apiUrl: string) { }

  create(light: LightingController): Observable<LightingController> {
    return this.http.post<LightingController>(`${this.apiUrl}/api/lights`, light);
  }

  getAll(availableForAdding?: boolean): Observable<LightingController[]> {
    let url = `${this.apiUrl}/api/lights?`; 
    if (availableForAdding === true) url += 'AvailableForAdding=true';
    return this.http.get<LightingController[]>(url);
  }

  getById(id: string): Observable<LightingController> {
    return this.http.get<LightingController>(`${this.apiUrl}/api/lights/${id}`);
  }

  update(light: LightingController): Observable<LightingController> {
    return this.http.put<LightingController>(`${this.apiUrl}/api/lights`, light);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/lights/${id}`);
  }

  putToGreenhouse(putToGreenhouseModel: PutToGreenhouseModel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/lights/put-to-greenhouse`, putToGreenhouseModel);
  }

  getAllReports(filter: ReportsFilter): Observable<LightReportModelView[]> {
    let query = `GreenhouseId=${filter.greenhouseId}&StartDate${filter.startDate}=&EndDate=${filter.endDate}`;
    return this.http.get<LightReportModelView[]>(`${this.apiUrl}/api/lights/reports?${query}`);
  }
}
