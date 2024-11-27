import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentNavBarService {
  private contentSubject = new BehaviorSubject<any>(null);
  content$ = this.contentSubject.asObservable();

  setContent(content: any) {
    this.contentSubject.next(content);
  }

  clearContent() {
    this.contentSubject.next(null);
  }
} 