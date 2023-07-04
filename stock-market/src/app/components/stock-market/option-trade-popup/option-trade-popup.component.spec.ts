import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTradePopupComponent } from './option-trade-popup.component';

describe('OptionTradePopupComponent', () => {
  let component: OptionTradePopupComponent;
  let fixture: ComponentFixture<OptionTradePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionTradePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionTradePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
