import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestOption } from './../models/request-option';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getCategories(req?: RequestOption): Observable<any> {
    const params = this.setQueryParams(req);
    const url = `${environment.baseURL}/categories/`;
    return this.http.get<any>(url, { params })
      .pipe(
        map(res => res.categories),
        tap(data => console.log({ data })
        ), shareReplay());
  }

  getProducts(req?: RequestOption): Observable<any> {
    const params = this.setQueryParams(req);
    const url = `${environment.baseURL}/products/`;
    return this.http.get<any>(url, { params });
  }

  setQueryParams(req: RequestOption): HttpParams {
    let option = new HttpParams({
      fromObject: {
        publisherId: req?.publisherId || 'TEST',
        locale: req?.locale || 'en_GB'
      }
    })

    return option;
  }
}
