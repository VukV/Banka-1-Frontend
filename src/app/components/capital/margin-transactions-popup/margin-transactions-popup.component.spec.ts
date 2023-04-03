import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginTransactionsPopupComponent } from './margin-transactions-popup.component';

describe('MarginTransactionsPopupComponent', () => {
  let component: MarginTransactionsPopupComponent;
  let fixture: ComponentFixture<MarginTransactionsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarginTransactionsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarginTransactionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
