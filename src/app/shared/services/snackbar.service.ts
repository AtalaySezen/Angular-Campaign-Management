import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  success(message: string, duration = 2000) {
    this.snackBar.open(message, 'Ok', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  error(message: string, duration = 2000) {
    this.snackBar.open(message, 'Ok', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  info(message: string, duration = 2000) {
    this.snackBar.open(message, 'Ok', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
