import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  selectedSupplier: Supplier;
  suppliers: Supplier[] = [];
  readonly API = '/suppliers';

  constructor(private http: HttpClient) {
    this.selectedSupplier = new Supplier();
  }

  getSuppliers() {
    return this.http.get(environment.URL_API + this.API);
  }

  postSupplier(Supplier: Supplier) {
    return this.http.post(environment.URL_API + this.API, Supplier);
  }

  putSupplier(supplier: Supplier) {
    return this.http.put(environment.URL_API + this.API + `/${supplier._id}`, supplier);
  }

  deleteSupplier(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }

}//End class

