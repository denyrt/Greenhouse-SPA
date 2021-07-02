import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app-injections-tokens';
import { PutToGreenhouseModel } from 'src/models/put-to-greenhouse-model';
import { ReportsFilter } from 'src/models/reports-filter';
import { WetController } from 'src/models/wet-controller';
import { WetReportModelView } from 'src/models/wet-report-model-view';

@Injectable({
  providedIn: 'root'
})
export class WetsService {

  constructor(private http: HttpClient,
    @Inject(API_URL) private apiUrl: string) { }
  
    create(temperature: WetController): Observable<WetController> {
      return this.http.post<WetController>(`${this.apiUrl}/api/wets`, temperature);
    }
  
    getAll(availableForAdding?: boolean): Observable<WetController[]> {
      let url = `${this.apiUrl}/api/wets?`;
      if (availableForAdding === true) url += 'AvailableForAdding=true';
      return this.http.get<WetController[]>(url);
    }
  
    getById(id: string): Observable<WetController> {
      return this.http.get<WetController>(`${this.apiUrl}/api/wets/${id}`);
    }
  
    update(temperature: WetController): Observable<WetController> {
      return this.http.put<WetController>(`${this.apiUrl}/api/wets`, temperature);
    }
  
    delete(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/wets/${id}`);
    }
  
    putToGreenhouse(putToGreenhouseModel: PutToGreenhouseModel): Observable<any> {
      return this.http.patch(`${this.apiUrl}/api/wets/put-to-greenhouse`, putToGreenhouseModel);
    }

    getAllReports(filter: ReportsFilter): Observable<WetReportModelView[]> {
      let query = `GreenhouseId=${filter.greenhouseId}&StartDate${filter.startDate}=&EndDate=${filter.endDate}`;
      return this.http.get<WetReportModelView[]>(`${this.apiUrl}/api/wets/reports?${query}`);
    }
}
