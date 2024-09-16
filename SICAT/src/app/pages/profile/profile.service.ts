import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http:HttpClient,
  ){
    
  }

  public profile(year:string,semestre:string):Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('auth_token')}`})
    const response = this.http.get(`${environment.server}/user/profile?year=${year}&semestre=${semestre}`, {headers:headers}
    )

    return response;
  }
}
