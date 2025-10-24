import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.css']
})
export class Calculator {
  display: string = '0';
  previewDisplay: string = '';
  operand1: string | null = null;
  operator: string | null = null;
  waitingForOperand: boolean = false;
  errorState: boolean = false;
  justCalculated: boolean = false;

  private apiUrl = 'http://localhost:8080/api/calc';

  constructor(private http: HttpClient) {}

  onCellClick(value: string): void {
    if (!value) return;

    if (this.errorState) {
      if (value === 'C' || value === 'CE') this.clearAll();
      return;
    }

    if (!isNaN(Number(value)) || value === '.') {
      if (this.justCalculated) {
        this.display = value;
        this.justCalculated = false;
        return;
      }

      if (this.waitingForOperand) {
        this.display = value;
        this.waitingForOperand = false;
      } else {
        this.display = this.display === '0' && value !== '.' ? value : this.display + value;
      }

      if (this.operator && this.operand1 != null) {
        this.updatePreview(this.operator, this.operand1, this.display);
      } else {
        this.previewDisplay = '';
      }
      return;
    }

    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.justCalculated = false;
        if (this.operator && this.operand1 != null && !this.waitingForOperand) {
          this.performOperation(this.operator, this.operand1, this.display, true);
        } else {
          this.operand1 = this.display;
        }
        this.operator = value;
        this.waitingForOperand = true;
        this.previewDisplay = '';
        break;

      case '=':
        if (this.operator && this.operand1 != null) {
          this.performOperation(this.operator, this.operand1, this.display, false);
          this.operator = null;
          this.previewDisplay = '';
          this.justCalculated = true;
        }
        break;

      case '%':
        if (this.operator && this.operand1 != null) {
          const percentValue = (parseFloat(this.operand1) * parseFloat(this.display)) / 100;
          this.display = String(percentValue);
          this.updatePreview(this.operator, this.operand1, this.display);
        } else {
          this.display = String(parseFloat(this.display) / 100);
        }
        this.justCalculated = true;
        break;

      case 'sqrt':
      case 'square':
      case 'reciprocal':
      case 'negate':
        this.performUnary(value, this.display);
        this.justCalculated = true;
        break;

      case 'CE':
      case 'C':
        this.clearAll();
        break;

      case 'backspace':
        if (this.justCalculated) return;
        if (!this.waitingForOperand && this.display.length > 1) {
          this.display = this.display.slice(0, -1);
        } else {
          this.display = '0';
        }
        if (this.operator && this.operand1 != null) {
          this.updatePreview(this.operator, this.operand1, this.display);
        } else {
          this.previewDisplay = '';
        }
        break;

      default:
        console.warn('Unhandled key:', value);
    }
  }

  private performOperation(op: string, op1: string, op2: string, keepChaining: boolean): void {
    const request = { operator: op, operand1: op1, operand2: op2 };

    this.http.post<any>(this.apiUrl, request).subscribe({
      next: res => {
        if (res.error) {
          this.display = 'Error';
          this.errorState = true;
        } else {
          this.display = res.result;
          if (keepChaining) {
            this.operand1 = String(res.result);
            this.waitingForOperand = true;
            this.justCalculated = false;
          } else {
            this.operand1 = null;
            this.waitingForOperand = false;
            this.justCalculated = true;
          }
        }
        this.previewDisplay = '';
      },
      error: err => {
        console.error('Backend error:', err);
        this.display = 'Error';
        this.errorState = true;
      }
    });
  }

  private performUnary(op: string, operand: string): void {
    const request = { operator: op, operand1: operand };

    this.http.post<any>(this.apiUrl, request).subscribe({
      next: res => {
        if (res.error) {
          this.display = 'Error';
          this.errorState = true;
        } else {
          this.display = res.result;
          this.operand1 = null;
          this.waitingForOperand = false;
          this.justCalculated = true;
        }
        this.previewDisplay = '';
      },
      error: err => {
        console.error('Backend error (unary):', err);
        this.display = 'Error';
        this.errorState = true;
      }
    });
  }

  private updatePreview(op: string, op1: string, op2: string): void {
    const request = { operator: op, operand1: op1, operand2: op2 };

    this.http.post<any>(this.apiUrl, request).subscribe({
      next: res => {
        if (res.error) this.previewDisplay = '';
        else this.previewDisplay = res.result;
      },
      error: () => {
        this.previewDisplay = '';
      }
    });
  }

  private clearAll(): void {
    this.display = '0';
    this.previewDisplay = '';
    this.operand1 = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.errorState = false;
    this.justCalculated = false;
  }
}
