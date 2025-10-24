import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalculationRequest {
  operator: string;
  operand1: string;
  operand2?: string;
}

export interface CalculationResponse {
  result?: number;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'http://localhost:8080/api/calculate';

  constructor(private http: HttpClient) {}

  calculate(request: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(this.apiUrl, request);
  }
}
