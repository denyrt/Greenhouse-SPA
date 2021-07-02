import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-injections-tokens';
import { LoginResult } from 'src/models/login-result';
import { LoginModel } from 'src/models/loginModel';
import { RegistryModel } from 'src/models/registry-model';

export const ACCESS_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

constructor(private http: HttpClient,
  @Inject(API_URL) private apiUrl: string) { }

  login(loginBody: LoginModel): Observable<LoginResult> {
      return this.http.post<LoginResult>(`${this.apiUrl}/api/identity/login`, loginBody)
      .pipe(tap((value) => {
        localStorage.setItem(ACCESS_TOKEN, value.accessToken);
      }));
  }

  registry(registryBody: RegistryModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/identity/registry`, registryBody);
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  isLoggedIn(): boolean {
    try{
      let token = localStorage.getItem(ACCESS_TOKEN);
      if (token == null) return false;
      let data = jwtDecode(token) as any;
      return new Date(data.exp * 1000) > new Date(Date.now());
    }
    catch {
      return false;
    }
  }
}
