import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsPopupComponent } from './contact-details-popup.component';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsPopupComponent;
  let fixture: ComponentFixture<ContactDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
