import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './pages/campaign-create/campaign-create.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'campaign-list', pathMatch: 'full' },
      { path: 'campaign-list', component: CampaignListComponent },
      { path: 'create', component: CampaignCreateComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
