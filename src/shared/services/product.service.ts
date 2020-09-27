import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestOption } from './../models/request-option';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

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
