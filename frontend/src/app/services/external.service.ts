import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { External } from '../models/external';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  selectedExternal: External;
  allExternal: External[] = [];
  readonly API = '/external';

  constructor(private http: HttpClient) {
    this.selectedExternal = new External
   }

   findAll() {
    return this.http.get(environment.URL_API + this.API);
  }

  postExternal(External: External) {
    return this.http.post(environment.URL_API + this.API, External);
  }

  putExternal(external: External) {
    return this.http.put(environment.URL_API + this.API + `/${external._id}`, external);
  }

  deleteExternal(_id: string) {
    return this.http.delete(environment.URL_API + this.API + `/${_id}`);
  }
}
