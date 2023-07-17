import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticPaymentsComponent } from './domestic-payments.component';

describe('DomesticPaymentsComponent', () => {
  let component: DomesticPaymentsComponent;
  let fixture: ComponentFixture<DomesticPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
