import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingPopupComponent } from './checking-popup.component';

describe('CheckingPopupComponent', () => {
  let component: CheckingPopupComponent;
  let fixture: ComponentFixture<CheckingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
