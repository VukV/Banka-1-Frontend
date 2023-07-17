import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticPaymentDetailsPopupComponent } from './domestic-payment-details-popup.component';

describe('DomesticPaymentDetailsPopupComponent', () => {
  let component: DomesticPaymentDetailsPopupComponent;
  let fixture: ComponentFixture<DomesticPaymentDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticPaymentDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticPaymentDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
