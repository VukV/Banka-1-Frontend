import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRecieversComponent } from './payment-recievers.component';

describe('PaymentRecieversComponent', () => {
  let component: PaymentRecieversComponent;
  let fixture: ComponentFixture<PaymentRecieversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRecieversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentRecieversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
