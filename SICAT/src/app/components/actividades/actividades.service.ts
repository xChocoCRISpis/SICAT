import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:HttpClient) { }
  getActividades():Observable<any>{
    const authorization:string= `Bearer ${localStorage.getItem("auth_token")}`;

    const request = this.http.get(`${environment.server}/actividades`,
      {headers:{
        "Authorization" : authorization ,
      }
    });
    return request;
  }
  
}
