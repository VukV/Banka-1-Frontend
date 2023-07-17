import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecieverPopupComponent } from './add-reciever-popup.component';

describe('AddRecieverPopupComponent', () => {
  let component: AddRecieverPopupComponent;
  let fixture: ComponentFixture<AddRecieverPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecieverPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecieverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
