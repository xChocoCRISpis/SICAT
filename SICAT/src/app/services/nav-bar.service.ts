import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private router:Router) { }
  public pageEmitter = new EventEmitter<Pages>();

  loadComponent(componentName:Pages):void{
    this.pageEmitter.emit(componentName);
  }


  
}

export type Pages = 'init'|'dep'|'cul'|'profile'|'alumnos';