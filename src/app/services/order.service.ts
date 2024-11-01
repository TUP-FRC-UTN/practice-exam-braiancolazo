import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url = 'http://localhost:3000/orders';

  constructor() { }

  getAll(): Observable<Order[]> {
    const observable = this.http.get<Order[]>(this.url);
    return observable;
  }

  add(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.url, order
    )
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(
      `${this.url}/${id}`
    );
  }
}
