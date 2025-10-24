import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appConfig } from '../app.config';

export interface CalculationRequest {
  operator: string;
  operand1: string;
  operand2?: string | null;
}

export interface CalculationResponse {
  result?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private url = 'http://localhost:8080/api/calc';

  constructor(private http: HttpClient) {}

  calculate(req: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(this.url, req);
  }
}
