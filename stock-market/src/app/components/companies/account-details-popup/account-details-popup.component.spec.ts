import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsPopupComponent } from './account-details-popup.component';

describe('AccountDetailsPopupComponent', () => {
  let component: AccountDetailsPopupComponent;
  let fixture: ComponentFixture<AccountDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
