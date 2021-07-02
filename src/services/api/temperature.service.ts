import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app-injections-tokens';
import { PutToGreenhouseModel } from 'src/models/put-to-greenhouse-model';
import { ReportsFilter } from 'src/models/reports-filter';
import { TemperatureController } from 'src/models/temperature-controller';
import { TemperatureReportModelView } from 'src/models/temperature-report-model-view';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient,
  @Inject(API_URL) private apiUrl: string) { }

  create(temperature: TemperatureController): Observable<TemperatureController> {
    return this.http.post<TemperatureController>(`${this.apiUrl}/api/temperatures`, temperature);
  }

  getAll(availableForAdding?: boolean): Observable<TemperatureController[]> {
    let url = `${this.apiUrl}/api/temperatures?`;
    if (availableForAdding === true) url += 'AvailableForAdding=true';
    return this.http.get<TemperatureController[]>(url);
  }

  getById(id: string): Observable<TemperatureController> {
    return this.http.get<TemperatureController>(`${this.apiUrl}/api/temperatures/${id}`);
  }

  update(temperature: TemperatureController): Observable<TemperatureController> {
    return this.http.put<TemperatureController>(`${this.apiUrl}/api/temperatures`, temperature);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/temperatures/${id}`);
  }

  putToGreenhouse(putToGreenhouseModel: PutToGreenhouseModel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/temperatures/put-to-greenhouse`, putToGreenhouseModel);
  }

  getAllReports(filter: ReportsFilter): Observable<TemperatureReportModelView[]> {
    let query = `GreenhouseId=${filter.greenhouseId}&StartDate${filter.startDate}=&EndDate=${filter.endDate}`;
    return this.http.get<TemperatureReportModelView[]>(`${this.apiUrl}/api/temperatures/reports?${query}`);
  }
}
