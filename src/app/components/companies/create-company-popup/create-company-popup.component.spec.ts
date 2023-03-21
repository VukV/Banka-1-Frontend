import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyPopupComponent } from './create-company-popup.component';

describe('CreateCompanyPopupComponent', () => {
  let component: CreateCompanyPopupComponent;
  let fixture: ComponentFixture<CreateCompanyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompanyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
