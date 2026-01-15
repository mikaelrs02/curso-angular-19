import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from './brasilapi.models';
@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseUrl: string = 'https://brasilapi.com.br/api';

  constructor( private http: HttpClient ) {

   }
   listarUfs(): Observable<Estado[]>{
    const path = '/ibge/uf/v1';

    return this.http.get<Estado[]>(this.baseUrl + path);
   }
}
