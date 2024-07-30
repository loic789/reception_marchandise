import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BcService {
  private apiUrl = 'http://192.168.1.217:3001';
  constructor(private http: HttpClient) { }

  getBcByCOBC(COBC : string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bc/getByParams/?COBC=` + COBC);
  }
  getDetailBcByLBCLEUNIK(LBCLEUNIK : string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detailbc/getByParams/?LBCLEUNIK=` + LBCLEUNIK);
  }
  postRecpt(body : any): Observable<any> {    
    return  this.http.post<any>(`${this.apiUrl}/detailbc/receptBc`, body);
  }
}
