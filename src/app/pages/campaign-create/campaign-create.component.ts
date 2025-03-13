import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Campaign } from '../../shared/models/model';

@Component({
  selector: 'app-campaign-create',
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss',
})
export class CampaignCreateComponent {
  campaignForm: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  localStorageService = inject(LocalStorageService);
  snackBar = inject(SnackbarService);
  storageKey = 'campaigns';

  constructor() {
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitCampaign(): void {
    if (this.campaignForm.valid) {
      const newCampaign: Campaign = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        title: this.campaignForm.value.title,
        description: this.campaignForm.value.description,
        points: 0,
        date: new Date().toISOString(),
      };

      const campaigns: Campaign[] =
        this.localStorageService.get<Campaign[]>(this.storageKey) || [];
      campaigns.push(newCampaign);
      this.localStorageService.set(this.storageKey, campaigns);
      this.snackBar.success('Kampanya başarıyla oluşturuldu', 2000);
      this.campaignForm.reset();
      this.router.navigate(['campaign-list']);
    }
  }
}
