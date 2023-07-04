import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalMainComponent } from './capital-main.component';

describe('CapitalMainComponent', () => {
  let component: CapitalMainComponent;
  let fixture: ComponentFixture<CapitalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
