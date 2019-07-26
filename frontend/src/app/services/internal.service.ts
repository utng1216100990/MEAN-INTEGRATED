import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Internal } from '../models/internal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternalService {
  selectedInternal: Internal;
  allInternal: Internal[] = [];
  readonly API = '/internal';

  constructor(private http: HttpClient) {
    this.selectedInternal = new Internal;
  }

  findAll() {
    return this.http.get(environment.URL_API + this.API);
  }

  postInternal(Internal: Internal) {
    return this.http.post(environment.URL_API + this.API, Internal);
  }

  putInternal(internal: Internal) {
    return this.http.put(environment.URL_API + this.API + `/${internal._id}`, internal);
  }

  deleteInternal(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }

}//End class
