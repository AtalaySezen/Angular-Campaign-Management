import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEditDialogComponent } from './campaign-edit-dialog.component';

describe('CampaignEditDialogComponent', () => {
  let component: CampaignEditDialogComponent;
  let fixture: ComponentFixture<CampaignEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
