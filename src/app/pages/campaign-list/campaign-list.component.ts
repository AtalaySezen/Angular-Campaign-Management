import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Campaign } from '../../shared/models/model';
import { CampaignEditDialogComponent } from './campaign-edit-dialog/campaign-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-campaign-list',
  imports: [MatTableModule, MatIconModule, DatePipe],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss',
})

export class CampaignListComponent {
  localStorageService = inject(LocalStorageService);
  snackbarService = inject(SnackbarService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'title', 'description', 'points', 'date', 'actions'];
  dataSource: Campaign[] = [];
  storageKey = 'campaigns';

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.dataSource = [...this.getCampaigns()];
  }

  getCampaigns(): Campaign[] {
    const campaigns = this.localStorageService.get<Campaign[]>(this.storageKey);
    return Array.isArray(campaigns) ? campaigns : [];
  }

  changePoints(campaign: Campaign, delta: number): void {
    campaign.points += delta;
    this.updateCampaign(campaign);
  }

  updateCampaign(updatedCampaign: Campaign): void {
    const campaigns = this.getCampaigns().map((campaign) =>
      campaign.id === updatedCampaign.id ? updatedCampaign : campaign
    );
    this.localStorageService.set(this.storageKey, campaigns);
    this.loadCampaigns();
  }

  deleteCampaign(id: number): void {
    const campaigns = this.getCampaigns().filter((campaign) => campaign.id !== id);
    this.localStorageService.set(this.storageKey, campaigns);
    this.loadCampaigns();
  }

  openEditDialog(campaign: Campaign): void {
    const dialogRef = this.dialog.open(CampaignEditDialogComponent, {
      width: '400px',
      data: { ...campaign },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackbarService.success('Başarılı')
        this.updateCampaign(result);
      }
    });
  }

}
