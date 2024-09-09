import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //readonly apiUrl:string = process.env.API_URL+"/auth/";

  constructor(
    private readonly http:HttpClient
  ){

  }

  /* login(contrasena:string,nombre?:string,correo?:string):Observable<any>{
    if(!nombre && !correo) return {success:false,message:"Ingresa un usuario válido"};

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`,
      {Nombre:nombre,Correo:correo,Contrasena:contrasena},
      {headers}
    )
  } */

}
