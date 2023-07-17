import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDetailsPopupComponent } from './exchange-details-popup.component';

describe('ExchangeDetailsPopupComponent', () => {
  let component: ExchangeDetailsPopupComponent;
  let fixture: ComponentFixture<ExchangeDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
