import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  selectedInvoice: Invoice;
  invoices: Invoice[] = [];
  readonly API = '/invoices';

  constructor(private http: HttpClient) {
    this.selectedInvoice = new Invoice;
   }

   findAll() {
    return this.http.get(environment.URL_API + this.API);
  }

  postInvoice(Invoice: Invoice) {
    return this.http.post(environment.URL_API + this.API, Invoice);
  }

  putInvoice(invoice: Invoice) {
    return this.http.put(environment.URL_API + this.API + `/${invoice._id}`, invoice);
  }

  deleteInvoice(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }
}
