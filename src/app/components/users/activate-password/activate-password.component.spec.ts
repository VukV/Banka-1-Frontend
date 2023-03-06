import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatePasswordComponent } from './activate-password.component';

describe('ActivatePasswordComponent', () => {
  let component: ActivatePasswordComponent;
  let fixture: ComponentFixture<ActivatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
