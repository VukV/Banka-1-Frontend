import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaliseContractPopupComponent } from './finalise-contract-popup.component';

describe('FinaliseContractPopupComponent', () => {
  let component: FinaliseContractPopupComponent;
  let fixture: ComponentFixture<FinaliseContractPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinaliseContractPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinaliseContractPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
