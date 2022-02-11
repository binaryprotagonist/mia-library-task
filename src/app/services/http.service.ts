import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) {}

  baseUrl = 'https://agency-coda.uc.r.appspot.com/'

  list(obj):Observable<any>{
    return this._http.post<any>(this.baseUrl + "client/list", obj);
  }

  create(obj):Observable<any>{
    return this._http.post<any>(this.baseUrl+"client/save", obj);
  }

  update(obj):Observable<any>{
    return this._http.post<any>(this.baseUrl+"client/save", obj);
  }

  fetch(id):Observable<any>{
    return this._http.get<any>(this.baseUrl+"client/fetch/"+id);
  }

  remove(id):Observable<any>{
    return this._http.get<any>(this.baseUrl+"client/remove/"+id);
  }

}
