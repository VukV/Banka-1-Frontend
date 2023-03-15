import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesMainComponent } from './trades-main.component';

describe('TradesMainComponent', () => {
  let component: TradesMainComponent;
  let fixture: ComponentFixture<TradesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
