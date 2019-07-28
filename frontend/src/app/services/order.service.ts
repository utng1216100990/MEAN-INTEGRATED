import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedOrder: Order;
  orders: Order[] = [];
  readonly API = '/orders';
  readonly API2 = '/menus';

  constructor(private http: HttpClient) {
      this.selectedOrder = new Order;
   }

  findAll() {
    return this.http.get(environment.URL_API + this.API2);
  }

  findAllOrders() {
    return this.http.get(environment.URL_API + this.API);
  }

  postOrder(Order: Order) {
    return this.http.post(environment.URL_API + this.API, Order);
  }

  putOrder(order: Order) {
    return this.http.put(environment.URL_API + this.API + `/${order._id}`, order);
  }

  deleteOrder(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }

}
