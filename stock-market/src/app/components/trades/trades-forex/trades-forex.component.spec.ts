import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesForexComponent } from './trades-forex.component';

describe('TradesForexComponent', () => {
  let component: TradesForexComponent;
  let fixture: ComponentFixture<TradesForexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesForexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
