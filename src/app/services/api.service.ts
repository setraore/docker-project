import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  birthDate: string; // yyyy-MM-dd
  password: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private cfg: AppConfigService) {}

  register(payload: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.cfg.apiBaseUrl}/register`, payload);
  }
}
