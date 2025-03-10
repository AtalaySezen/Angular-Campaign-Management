import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router)
  storage = inject(LocalStorageService);

  logout() {
    this.storage.logout();
    this.router.navigate(['/login']);
  }

}
