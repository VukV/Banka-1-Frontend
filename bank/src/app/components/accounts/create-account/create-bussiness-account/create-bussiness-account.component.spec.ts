import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBussinessAccountComponent } from './create-bussiness-account.component';

describe('CreateBussinessAccountComponent', () => {
  let component: CreateBussinessAccountComponent;
  let fixture: ComponentFixture<CreateBussinessAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBussinessAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBussinessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
