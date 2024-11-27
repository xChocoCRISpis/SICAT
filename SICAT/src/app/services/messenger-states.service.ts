import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerStatesService {
  // Crear BehaviorSubject privado
  private menuStateSubject = new BehaviorSubject<boolean>(true);
  
  // Observable público para los subscriptores
  menuState$: Observable<boolean> = this.menuStateSubject.asObservable();

  setMenuState(state: boolean) {
    this.menuStateSubject.next(state);
    console.log(this.menuStateSubject.value);
  }

  // Método opcional para obtener el valor actual
  getMenuState(): boolean {
    return this.menuStateSubject.value;
  }
}
