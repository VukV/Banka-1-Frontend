import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingTransactionsPopupComponent } from './checking-transactions-popup.component';

describe('CheckingTransactionsPopupComponent', () => {
  let component: CheckingTransactionsPopupComponent;
  let fixture: ComponentFixture<CheckingTransactionsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingTransactionsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckingTransactionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
