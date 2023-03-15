import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksDetailComponent } from './stocks-detail.component';

describe('StocksDetailComponent', () => {
  let component: StocksDetailComponent;
  let fixture: ComponentFixture<StocksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
