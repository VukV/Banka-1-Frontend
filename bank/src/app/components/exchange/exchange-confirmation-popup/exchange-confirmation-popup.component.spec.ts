import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeConfirmationPopupComponent } from './exchange-confirmation-popup.component';

describe('ExchangeConfirmationPopupComponent', () => {
  let component: ExchangeConfirmationPopupComponent;
  let fixture: ComponentFixture<ExchangeConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeConfirmationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
