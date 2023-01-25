import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFbResponse, IProducts } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http
      .post(`${environment.fbDataBaseUrl}/orders.json`, order)
      .pipe(
        map((res: IFbResponse) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date),
          };
        })
      );
  }

  getAllOrders() {
    return this.http.get(`${environment.fbDataBaseUrl}/orders.json`).pipe(
      map((res) =>
        Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }))
      )
    );
  }

  removeOrder(id: string) {
    return this.http.delete(`${environment.fbDataBaseUrl}/orders/${id}.json`);
  }
}
