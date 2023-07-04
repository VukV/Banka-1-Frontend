import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsPopupComponent } from './listings-popup.component';

describe('ListingsPopupComponent', () => {
  let component: ListingsPopupComponent;
  let fixture: ComponentFixture<ListingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
