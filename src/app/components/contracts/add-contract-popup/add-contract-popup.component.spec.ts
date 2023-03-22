import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractPopupComponent } from './add-contract-popup.component';

describe('AddContractPopupComponent', () => {
  let component: AddContractPopupComponent;
  let fixture: ComponentFixture<AddContractPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContractPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
