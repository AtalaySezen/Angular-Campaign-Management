import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() menuClicked = new EventEmitter<void>();
  authService = inject(AuthService);
  router = inject(Router);

  onMenuClick() {
    this.menuClicked.emit();
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
    this.menuClicked.emit();
  }

}
