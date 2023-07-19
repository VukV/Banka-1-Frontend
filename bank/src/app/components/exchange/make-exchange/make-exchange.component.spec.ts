import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeExchangeComponent } from './make-exchange.component';

describe('ExchangeComponent', () => {
  let component: MakeExchangeComponent;
  let fixture: ComponentFixture<MakeExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeExchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
