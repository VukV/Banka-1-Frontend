import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalCheckingComponent } from './capital-checking.component';

describe('CapitalCheckingComponent', () => {
  let component: CapitalCheckingComponent;
  let fixture: ComponentFixture<CapitalCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalCheckingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitalCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
