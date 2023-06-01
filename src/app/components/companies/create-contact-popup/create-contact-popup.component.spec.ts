import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactPopupComponent } from './create-contact-popup.component';

describe('CreateContactPopupComponent', () => {
  let component: CreateContactPopupComponent;
  let fixture: ComponentFixture<CreateContactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContactPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
