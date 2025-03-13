import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  storage = inject(LocalStorageService);
  snackbar = inject(SnackbarService);
  loginForm = inject(FormBuilder).group({
    username: ['admin', [Validators.required, Validators.minLength(3)]],
    password: ['123456', [Validators.required, Validators.minLength(3)]]
  });
  mockUser = {
    username: 'admin',
    password: '123456'
  };

  ngOnInit(): void {
    if (this.storage.isLoggedIn()) {
      this.router.navigate(['/campaign-list']);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackbar.error('Lütfen bilgilerinizi kontrol edin.');
      return;
    }
    const { username, password } = this.loginForm.value;

    if (username === this.mockUser.username && password === this.mockUser.password) {
      localStorage.setItem('loggedIn', 'true');
      this.snackbar.success('Başarılı');
      this.router.navigate(['/campaign-list']);
    } else {
      this.snackbar.error('Kullanıcı adı veya şifre yanlış!');
    }
  }

}
