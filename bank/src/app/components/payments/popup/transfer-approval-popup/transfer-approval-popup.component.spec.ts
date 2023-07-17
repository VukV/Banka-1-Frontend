import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferApprovalPopupComponent } from './transfer-approval-popup.component';

describe('TransferApprovalPopupComponent', () => {
  let component: TransferApprovalPopupComponent;
  let fixture: ComponentFixture<TransferApprovalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferApprovalPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferApprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
