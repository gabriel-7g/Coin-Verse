import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiKey = 'c2171924c2c1a7b3feb40adf';
  private baseUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getNomesOficiais(): Observable<any> {
    return this.http.get(`${this.baseUrl}/codes`);
  }
  getTaxas(moedaBase: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/latest/${moedaBase}`);
  }
}