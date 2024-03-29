import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductData } from '../models/product';
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
        shareReplay()
      );
  }

  getProductDetails(productId: string, req?: RequestOption): Observable<ProductData> {
    const params = this.setQueryParams(req);
    const url = `${environment.baseURL}/products/${productId}`;

    return this.http.get<any>(url, { params });
  }
  getProducts(req?: RequestOption): Observable<any> {
    const params = this.setQueryParams(req);
    const url = `${environment.baseURL}/products/`;

    return this.http.get<any>(url, { params });
  }

  setQueryParams(req: RequestOption): HttpParams {
    const option = new HttpParams({
      fromObject: {
        publisherId: req?.publisherId || 'TEST',
        locale: req?.locale || 'en_GB',
        term: req?.term || '',
        categoryId: req?.categoryId || '',
        brandId: req?.brandId || '',
        sellerId: req?.sellerId || '',
        priceRangeId: req?.priceRangeId || '',
        perPage: req?.perPage?.toString() || '30',
        start: req?.start?.toString() || ''
      }
    });

    return option;
  }
}
