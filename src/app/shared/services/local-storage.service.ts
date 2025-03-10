import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  setLoggedIn(value: boolean) {
    this.set('loggedIn', value);
  }

  isLoggedIn(): boolean {
    return this.get<boolean>('loggedIn') || false;
  }

  logout() {
    this.remove('loggedIn');
  }
}
