import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);

  getRegions(): Observable<any> {
    return this.http.get<any>('https://api.first.org/data/v1/countries');
  }
}
