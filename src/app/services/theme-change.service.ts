import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangeService {
  private theme = new BehaviorSubject<string>('vs-dark');

  setTheme(value) {
    this.theme.next(value);
  }

  getTheme() {
    return this.theme.asObservable();
  }
}
