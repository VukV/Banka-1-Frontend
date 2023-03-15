import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalMarginComponent } from './capital-margin.component';

describe('CapitalMarginComponent', () => {
  let component: CapitalMarginComponent;
  let fixture: ComponentFixture<CapitalMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalMarginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitalMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
