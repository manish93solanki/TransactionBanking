import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  
  getAllTransactions(): Observable<any[]> {

    return this.http.get<any[]>('http://localhost:4000/api/transactions');
  }

  getFilteredTransactions(filters: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/transactions/filter', filters);
  }

}
