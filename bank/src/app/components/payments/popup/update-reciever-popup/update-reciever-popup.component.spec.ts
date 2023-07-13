import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecieverPopupComponent } from './update-reciever-popup.component';

describe('UpdateRecieverPopupComponent', () => {
  let component: UpdateRecieverPopupComponent;
  let fixture: ComponentFixture<UpdateRecieverPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecieverPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRecieverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
