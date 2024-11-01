import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url = 'http://localhost:3000/products';

  constructor() { }

  getAll(): Observable<Product[]> {
    const observable = this.http.get<Product[]>(this.url);
    return observable;
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.url, product
    )
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.url}/${id}`
    );
  }
}
